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
      owner: session?.user?._id,
      receiver: username
    })

    if (chatId?.chatId) {
      const data = await Message.find({chatId: chatId.chatId}).populate('sender', "username name surname photo socketId").lean()

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
    const chatId = crypto.randomUUID();
    let imagesUploaded = []

    if (!session?.user || !username || (!images && !message)) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    const otherId = await User.findOne({username}).select("_id")

    if (!otherId?._id) {
      return NextResponse.json(
        {},
        {
          status: 404,
          statusText: MISSING_FIELDS,
        },
      );
    }

    // Validamos si los chats existen

    let yourChat = await Chat.findOne({
      owner: session?.user?._id,
      receiver: username
    })

    let otherChat = await Chat.findOne({
      owner: otherId._id,
      receiver: session?.user?.username
    })

    // Creamos o Actualizamos segun corresponda

    // Tu Chat

    if (!yourChat) {
      yourChat = new Chat({
        chatId: otherChat?.chatId || chatId,
        owner: session?.user?._id,
        receiver: username,
        profile: otherId._id,
        you: true,
        lastMessage: message || "Nuevo Mensaje"
      })

      await yourChat.save()
    }
    else
    {

      yourChat = await Chat.findOneAndUpdate({
        owner: session?.user?._id,
        receiver: username,
      },{
        hide: false,
        you: true,
        seen: false,
        lastMessage: message
      },{
        new: true
      })
    }

    // Chat de la otra persona

    if (!otherChat) {
      otherChat = new Chat({
        chatId: yourChat?.chatId || chatId,
        owner: otherId._id,
        receiver: session?.user?.username,
        profile: session?.user?._id,
        you: false,
        lastMessage: message || "Nuevo Mensaje"
      })

      await otherChat.save()
    }
    else
    {

      otherChat = await Chat.findOneAndUpdate({
        owner: otherId._id,
        receiver: session?.user?.username,
      },{
        hide: false,
        you: false,
        seen: false,
        lastMessage: message
      },{
        new: true
      })
    }

    // Guardamos Mensaje

    imagesUploaded = await UploadImages(images)

    const newMessage = new Message({
      chatId: otherChat.chatId || yourChat.chatId,
      sender: session.user._id,
      message,
      images: imagesUploaded
    })

    const findMessage = await newMessage.save()

    const savedMessage = await Message.findOne({
      _id: findMessage._id
    }).populate('sender', "username name surname photo socketId")

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