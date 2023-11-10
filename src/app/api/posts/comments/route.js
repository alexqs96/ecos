import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import { UploadImages } from "@/lib/cloudinaryUpload";
import { connectMongo } from "@/lib/connectMongo";
import { COMMENT_ADDED, COMMENT_REMOVED, MISSING_FIELDS, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
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
    const imagesUploaded = await UploadImages(image, true);

    if (!session.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN,
        },
      );
    }

    if (!content && !image > 0) {
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
      {
        message: COMMENT_ADDED
      },
      {
        status: 201,
        statusText: COMMENT_ADDED,
      },
    );
  } catch (error) {
    console.log("/posts/comments error: " + error);
    return NextResponse.json(
      {
        message: SERVER_ERROR
      },
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const { post, id } = await req.json();

    if (!session.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN,
        },
      );
    }

    if (!post || !id) {
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

    const validateUser = await Comment.findOne({
      creator: session.user._id,
      post,
      _id: id
    })

    if (!validateUser) {
      console.log("El usuario logueado no es el creador de este comentario");

      return NextResponse.json(
        {
          message: SERVER_ERROR
        },
        {
          status: 500,
          statusText: SERVER_ERROR,
        },
      );
    }

    await connectMongo();

    await Comment.findByIdAndRemove(id);

    await Post.findByIdAndUpdate(post, {
      $pull: { comments: id },
    });

    return NextResponse.json(
      {
        message: COMMENT_REMOVED
      },
      {
        status: 201,
        statusText: COMMENT_REMOVED,
      },
    );
  }
  catch(error){
    console.log("/posts/comments error: " + error);
    return NextResponse.json(
      {
        message: SERVER_ERROR
      },
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}