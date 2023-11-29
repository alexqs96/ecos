'use client'

import { MailIcon } from "@/components/Icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";
import { VscSend } from "react-icons/vsc";
import { formatDate } from "@/utils/utils";
import Image from "next/image";

const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function ChatView({ params, type }) {
  const lastMessage = useRef(null);
  const { data: session } = useSession();
  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (params?.username) {
        return await fetch(`/api/chats/${params?.username}${type ? "?view=trades" : ""}`).then(res => res.json()).catch(() => [])
      }
      return []
    }
  })
  const queryClient = useQueryClient();
  const messageInput = useRef('')

  async function sendMessage(msg, images, username) {
    if (!messageInput.current.value) {
      return null
    }

    try {
      await fetch(`/api/chats/${username}${type ? "?view=trades" : ""}`, {
        method: "POST",
        body: JSON.stringify({
          message: msg,
          images: []
        })
      }).then(res => res.json())

      socket.emit("sendMessage", params.username)
      queryClient.invalidateQueries('messages');
      messageInput.current.value = null
    } catch (error) {
      console.log("Error API Send Message: " + error);
      return null
    }
  }

  useEffect(() => {
    if (session && session.user) {
      socket.emit("connectToChat", session.user.username);
    }

    socket.on("newMessage", () => {
      queryClient.invalidateQueries('messages');
    });

  }, [queryClient, session])

  useEffect(() => {
    if (lastMessage?.current) {
      lastMessage.current.scrollTop = lastMessage.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className='w-full flex flex-col h-[85dvh] sm:h-[100dvh]'>
      <h1 className="text-xl sm:text-3xl p-5 font-semibold flex items-center gap-2 text-[#27b53C] bg-white sticky top-0">
        <MailIcon size={"1.2em"} className={"fill-[#27b53C]"} />
        {type ? "Intercambios" : "Mensajes"} / @{params?.username}
      </h1>

      <div
        ref={lastMessage}
        className='flex flex-col gap-5 p-5 w-full flex-1 h-[90dvh] overflow-y-scroll scroll-smooth'
      >
        {
          isLoading ?
            <strong className="animate-pulse">Cargandooo mensajes...</strong>
            :
            messages?.map(e => (
              <div key={e?._id} className={"flex gap-3"+(e?.sender?.username === session?.user?.username? " flex-row-reverse" : "")}>
                <Image
                  className="object-cover rounded-full h-fit mt-auto"
                  width={40}
                  height={40}
                  src={e.sender.photo || "/img/profile_default.webp"}
                  unoptimized
                  alt={"Foto de "+e.sender.name}
                />
                <div
                  className={'flex flex-col bubble rounded-tr-xl rounded-tl-xl py-2.5 px-3.5 text-white ' +
                    (session?.user?.username === e.sender?.username ?
                      "ml-auto text-right bubble-right bg-green-500 rounded-bl-xl"
                      :
                      "mr-auto bubble-left bg-green-500 rounded-br-xl"
                    )}
                >
                  <small className="font-semibold">@{e?.sender?.username === session?.user?.username ? "Vos" : e?.sender?.username}</small>
                  <em>{e?.message}</em>
                  <small className="text-[.7em]">{formatDate(e.createdAt)?.short}</small>
                </div>
              </div>
            ))
        }
      </div>

      <div className='flex my-2 w-[98%] mx-auto gap-2'>
        <textarea
          ref={messageInput}
          onKeyDownCapture={e => e.key === "Enter" && !e.shiftKey && sendMessage(messageInput.current.value, [], params?.username)}
          placeholder="Aa"
          className='h-[64px] bg-slate-50 p-2.5 w-full outline-none resize-none rounded-2xl border'
        />

        <button
          type='button'
          className="bg-green-500 px-4 text-white rounded-2xl shadow-sm transition-transform active:scale-90 duration-150"
          onClick={() => {
            sendMessage(messageInput.current.value, [], params?.username)
          }}
        >
          <VscSend size={"2em"} />
        </button>
      </div>
    </main>
  )
}

export default ChatView