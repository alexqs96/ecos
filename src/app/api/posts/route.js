import Post from "@/lib/models/Post";
import { CloudinaryUpload } from "@/lib/cloudinaryUpload";
import { connectMongo } from "@/lib/connectMongo";
import { MISSING_FIELDS, POST_ADDED, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";

export async function GET(){
  try {
    await connectMongo()

    const posts = await Post.find()
    .populate("creator", "username photo -_id")
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "username name surname photo -_id",
      },
    })
    .sort({ createdAt: -1 });

    return NextResponse.json(posts, {
      status: 200,
      statusText: "Posts publicados"
    })
  } catch (error) {
    console.log("/posts error: "+error);
    return NextResponse.json({},{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(AuthOptions)
    const { content, category, images } = await req.json();
    const categoryValue = category? category !== "news" || category !== "post"? "post" : category : "post"
    const imagesUploaded = await CloudinaryUpload(images)

    if (!session) {
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

    if (!content && !images.length > 0) {
      return NextResponse.json(
        {
          message: MISSING_FIELDS
        },
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    await connectMongo();

    const newPost = new Post({
      creator: session.user._id,
      content,
      images: imagesUploaded,
      category: categoryValue
    });

    await newPost.save();

    return NextResponse.json(
      {
        message: POST_ADDED
      },
      {
        status: 201,
        statusText: "Post Creado",
      },
    );
  } catch (error) {
    console.log("/posts error: "+error);
    return NextResponse.json({
      message: SERVER_ERROR
    },{
      status: 500,
      statusText: SERVER_ERROR
    })
  }
}