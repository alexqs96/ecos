import User from "@/lib/models/User";
import Post from "@/lib/models/Post";
import { MISSING_FIELDS, POST_ADDED, POST_NOT_FOUND, POST_SHARED, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function POST(req){
  try {
    const session = await getServerSession(AuthOptions)
    const { content, postId } = await req.json();

    if (!session.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN
        },
      );
    }

    if (!postId) {
      return NextResponse.json(
        {
          message: MISSING_FIELDS
        },
        {
          status: 404,
          statusText: MISSING_FIELDS
        },
      );
    }

    const getPost = await Post.findOne({_id: postId}).populate("creator", "username photo name surname").lean()

    if (!getPost) {
      return NextResponse.json(
        {
          message: POST_NOT_FOUND
        },
        {
          status: 404,
          statusText: POST_NOT_FOUND
        },
      );
    }

    const newPost = new Post({
      creator: session.user._id,
      content: content || "",
      images: getPost.images,
      category: getPost.category,
      repost: {
        username: getPost.creator.username,
        name: getPost.creator.name,
        surname: getPost.creator.surname,
        photo: getPost.creator.photo,
        createdAt: getPost.createdAt,
        content: getPost.content,
      }
    });

    const postCreated = await newPost.save();

    await User.findByIdAndUpdate(session.user._id,{
      $push: { posts: postCreated._id },
    },
    { new: true },)

    return NextResponse.json(
      {
        message: POST_ADDED
      },
      {
        status: 201,
        statusText: POST_SHARED,
      },
    );
  } catch (error) {
    console.log("/posts/share error: "+error);
    return NextResponse.json({
      message: SERVER_ERROR
    },{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}