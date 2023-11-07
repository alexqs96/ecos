import Post from "@/lib/models/Post";
import { connectMongo } from "@/lib/connectMongo";
import { MISSING_FIELDS, LIKE_ADDED, LIKE_REMOVED, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function POST(req){
  try {
    const session = await getServerSession(AuthOptions)
    const { post } = await req.json();

    if (!session.user) {
      return NextResponse.json(
        {
          status: false,
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN
        },
      );
    }

    if (!post) {
      return NextResponse.json(
        {
          status: false,
          message: MISSING_FIELDS
        },
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    await connectMongo();

    const liked = await Post.findOne({ _id: post, likes: session.user._id }).populate(
      "likes",
    );

    if (liked) {
      await Post.findByIdAndUpdate(
        post,
        {
          $pull: { likes: session.user._id },
        },
        { new: true },
      );
    } else {
      await Post.findByIdAndUpdate(
        post,
        {
          $push: { likes: session.user._id },
        },
        { new: true },
      );
    }

    return NextResponse.json(
      {
        status: !liked,
        message: liked? LIKE_REMOVED : LIKE_ADDED
      },
      {
        status: 201,
        statusText: liked? LIKE_REMOVED : LIKE_ADDED,
      },
    );
  } catch (error) {
    console.log("/likes error: "+error);
    return NextResponse.json({
      status: false,
      message: SERVER_ERROR
    },{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}