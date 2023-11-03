import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import { CloudinaryUpload } from "@/lib/cloudinaryUpload";
import { connectMongo } from "@/lib/connectMongo";
import { SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    await connectMongo();

    const posts = await Post.find()
      .populate("creator", "username photo -_id")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          select: "username photo -_id",
        },
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(posts, {
      status: 200,
      statusText: "Posts publicados",
    });
  } catch (error) {
    console.log("/posts error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const { content, image, post } = await req.json();
    const imagesUploaded = await CloudinaryUpload([image]);

    if (!session) {
      return NextResponse.json(
        {},
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN,
        },
      );
    }

    if (!content && !image > 0) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    await connectMongo();

    const newComment = new Comment({
      post,
      creator: session.user._id,
      content,
      image: imagesUploaded[0],
    });

    const commentSaved = await newComment.save();

    await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: commentSaved._id },
      },
      { new: true },
    );

    return NextResponse.json(
      {},
      {
        status: 201,
        statusText: "Comentario Agregado",
      },
    );
  } catch (error) {
    console.log("/posts/comments error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}
