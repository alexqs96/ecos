import { MISSING_FIELDS, SERVER_ERROR } from "@/lib/consts";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const {searchParams} = new URL(req.url)
    const filterOption = searchParams.get('view') || "friends"

    const session = await getServerSession(AuthOptions)

    if (!session.user) {
      return NextResponse.json(
        [],
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const data = await Chat.find({
      owner: session.user._id,
      type: filterOption
    }).populate('profile', "username name surname photo").sort({ updatedAt: -1 });

    return NextResponse.json(data, {
      status: 200,
      statusText: "Chats Encontrados",
    });
  } catch (error) {
    console.log("/chats error: " + error);
    return NextResponse.json(
      [],
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}