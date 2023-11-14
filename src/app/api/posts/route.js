import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import { UploadImages } from "@/lib/cloudinaryUpload";
import { MISSING_FIELDS, POST_ADDED, SERVER_ERROR, USER_NOT_LOGGED_IN } from "@/lib/consts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import User from "@/lib/models/User";

export async function GET(req){
  try {
    const {searchParams} = new URL(req.url)
    const page = searchParams.get('page') || 1
    const username = searchParams.get('username') || ''
    const limit = 5
    
    const user = await User.findOne({username}).lean()

    const posts = await Post.find(user? {creator: user._id} : {})
    .populate("creator", "username photo -_id")
    .populate("likes", "username -_id")
    .populate({
      path: "comments",
      populate: {
        path: "creator",
        select: "username name surname photo -_id",
      },
    })
    .sort({ createdAt: -1 }).skip((+page * limit) - limit).limit(limit).lean();

    for (const post of posts) {
      if (post.likes && post.likes.length > 0) {
        post.likes = post.likes.map(like => like.username);
      }
    }

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
    const imagesUploaded = await UploadImages(images)

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

    const newPost = new Post({
      creator: session.user._id,
      content,
      images: imagesUploaded,
      category: categoryValue
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

export async function DELETE(req) {
  try {
    const session = await getServerSession(AuthOptions);
    const { post } = await req.json();

    if (!session.user) {
      return NextResponse.json(
        {
          message: USER_NOT_LOGGED_IN,
        },
        {
          status: 401,
          statusText: USER_NOT_LOGGED_IN,
        },
      );
    }

    if (!post) {
      return NextResponse.json(
        {
          message: MISSING_FIELDS,
        },
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const validatePost = await Post.findOne({
      creator: session.user._id,
      _id: post,
    });

    if (!validatePost) {
      console.log("El usuario logueado no es el creador de este post");

      return NextResponse.json(
        {
          message: SERVER_ERROR,
        },
        {
          status: 500,
          statusText: SERVER_ERROR,
        },
      );
    }

    await Post.findByIdAndDelete(post);

    await User.findByIdAndUpdate(session.user._id, {
      $pull: { posts: post },
    });

    await Comment.deleteMany({
      post
    })

    return NextResponse.json(
      {
        message: "Post borrado",
      },
      {
        status: 201,
        statusText: "Post borrado",
      },
    );
  } catch (error) {
    console.log("/posts error: " + error);
    return NextResponse.json(
      {
        message: SERVER_ERROR,
      },
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}
