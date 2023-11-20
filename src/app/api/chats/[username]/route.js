import Chat from "@/lib/models/Chat";
import Message from "@/lib/models/Message";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { MISSING_FIELDS, SERVER_ERROR } from "@/lib/consts";
import { UploadImages } from "@/lib/cloudinaryUpload";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(AuthOptions)
    const { username } = params;

    if (!session?.user || !username) {
      return NextResponse.json(
        [],
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const chatId = await Chat.findOne({
      participants: {
        $all: [session.user.username, username]
      }
    }).select('_id');

    if (chatId?._id) {
      const data = await Message.find({chatId: chatId._id}).populate('sender').lean()

      return NextResponse.json(data, {
        status: 200,
        statusText: "Mensajes encontrados",
      });
    }

    return NextResponse.json([], {
      status: 200,
      statusText: "No se encontraron mensajes",
    });
  } catch (error) {
    console.log("/messages error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(AuthOptions)
    const { message, images } = await req.json();
    const { username } = params
    let imagesUploaded = []
    let chatUpdated = null
    if (!session?.user || !username || (!images && !message)) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    imagesUploaded = await UploadImages(images)

    const chatExist = await Chat.findOne({
      participants: {
        $all: [session.user.username, username]
      }
    })

    if (!chatExist) {
      chatUpdated = new Chat({
        sender: session.user._id,
        lastMessage: message,
        participants: [
          session.user.username,
          username
        ]
      })

      await chatUpdated.save()
    }
    else
    {
      chatUpdated = await Chat.findOneAndUpdate({
        participants: {
          $all: [session.user.username, username]
        }
      },{
        sender: session.user._id,
        lastMessage: message,
        seen: false,
        $pull: { hide: username }
      },{
        new: true
      })
    }

    const newMessage = new Message({
      chatId: chatUpdated._id,
      sender: session.user._id,
      message,
      images: imagesUploaded
    })

    const savedMessage = await newMessage.save()

    return NextResponse.json(savedMessage, {
      status: 200,
      statusText: "Mensaje Guardado",
    });

  } catch (error) {
    console.log("/chats error: " + error);
    return NextResponse.json(
      {},
      {
        status: 500,
        statusText: SERVER_ERROR,
      },
    );
  }
}