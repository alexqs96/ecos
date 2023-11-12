import {
  MISSING_FIELDS,
  SERVER_ERROR,
  USER_NOT_FOUND,
  USER_FOUND,
} from "@/lib/consts";
import Post from "@/lib/models/Post";
import Comment from "@/lib/models/Comment";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        {},
        {
          status: 409,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const user = await User.findOne(
      {
        username,
      },
      "-password -_id -email -updatedAt -__v",
    )
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "creator",
            select: "username photo -_id",
          },
          options: { sort: { createdAt: -1 } },
        },
      })
      .lean();

    if (!user) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: USER_NOT_FOUND,
        },
      );
    }

    return NextResponse.json(user, {
      status: 200,
      statusText: USER_FOUND,
    });
  } catch (error) {
    console.log("/users error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}
