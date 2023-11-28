'use client'

import { MailIcon } from "@/components/Icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import * as io from "socket.io-client";

const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function ChatView({params, type}) {
  const { data: session } = useSession();
  const {data: messages, isLoading} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (params?.username) {
        return await fetch(`/api/chats/${params?.username}${type? "?view=trades" : ""}`).then(res => res.json()).catch(() => [])
      }
      return []
    }
  })
  const queryClient = useQueryClient();
  const messageInput = useRef('')

  async function sendMessage(msg, images, username){
    try {
      await fetch(`/api/chats/${username}${type? "?view=trades" : ""}`, {
        method: "POST",
        body: JSON.stringify({
          message: msg,
          images: []
        })
      }).then(res => res.json())

      socket.emit("sendMessage", params.username)
      queryClient.invalidateQueries('messages');
    } catch (error) {
      console.log("Error API Send Message: "+error);
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

  return (
    <div className='w-full p-5'>
      <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3">
        <MailIcon size={"1.2em"} className={"fill-[#27b53C]"} />
        {type? "Intercambios" : "Mensajes"} / @{params?.username}
      </h1>
      <div className='flex flex-col gap-5 w-full p-5 pt-24'>
        {
          isLoading?
          <strong>Cargandooo.....</strong>
          :
          messages?.map(e => (
            <div key={e?._id} className='flex flex-col'>
              <small>{e?.sender?.username}</small>
              <em>{e?.message}</em>
            </div>
          ))
        }
      </div>

      <div className='sticky bottom-0 inset-x-0 flex w-full bg-white mx-auto border'>
        <textarea ref={messageInput} className='h-[64px] w-full outline-none'></textarea>
        <button type='button' onClick={() => {
          sendMessage(messageInput.current.value, [], params?.username)
        }}>
          Enviar
        </button>
      </div>
    </div>
  )
}

export default ChatView