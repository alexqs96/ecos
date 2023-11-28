'use client'
import { FiSearch } from "react-icons/fi";
import { TbMessage2 } from "react-icons/tb";
import { useEffect, useRef, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import ChatSkeleton from "./ChatSkeleton";
import * as io from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { MailIcon } from "@/components/Icons";

const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function ChatList({searchParams}){
  const { data: session, status } = useSession();
  const search = useRef(null)
  const queryClient = useQueryClient();
  const {data: chats, isLoading} = useQuery({
    queryKey: ['chats', searchParams.view],
    queryFn: async () => {
      return await fetch(`/api/chats?view=${searchParams.view || "friends"}`).then(res => res.json())
    }
  })

  useEffect(() => {
    if (session && session.user) {
      socket.emit("connectToChat", session.user.username); 
    }
    
    socket.on("newMessage", () => {
      queryClient.invalidateQueries('chats');
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, socket])

  return (
    <main className="flex flex-col gap-2 w-full p-5">
      <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3"><MailIcon size={"1.2em"} className={"fill-[#27b53C]"} /> Mensajes</h1>

      <section className="grid h-fit place-items-center w-full gap-5 border-b pb-3">
        <div className="text-xl flex items-center w-full max-w-xs overflow-hidden border-2 rounded-2xl bg-white/5 focus-within:border-green-600">
          <button type="button" className="px-2">
          <FiSearch size={"1.2em"} />
          </button>
          <input ref={search} type="text" className="py-1 pr-3 outline-none w-full" />
        </div>

        <div className="grid grid-cols-2 items-center text-center w-full text-xl">
          <Link href="?view=friends" className="block group" onClick={() => {
            queryClient.invalidateQueries('chats')
          }}>
            <span className={"border-b-4 pb-2.5 transition duration-150 group-hover:border-b-green-600"+(searchParams.view === "friends" || !searchParams.view? " border-b-green-600 font-medium" : " border-transparent")}>
              Amigos
            </span>
          </Link>
          <Link href="?view=trades" className="block group" onClick={() => {
            queryClient.invalidateQueries('chats')
          }}>
            <span className={"border-b-4 pb-2.5 transition duration-150 group-hover:border-b-green-600"+(searchParams.view === "trades"? " border-b-green-600 font-medium" : " border-transparent")}>
              Intercambios
            </span>
          </Link>
        </div>
      </section>

      {
        isLoading?
        <>
          <ChatSkeleton />
          <ChatSkeleton />
          <ChatSkeleton />
        </>
        :
        !chats?
        <span className="text-3xl font-semibold mx-auto w-fit block my-20">!Aca apareceran tus mensajes!</span>
        :
        chats?.map(e => (
          <Link href={"/chats/"+e.profile.username+(searchParams.view === "trades"? "?view=trades" : "")} key={e._id} className="flex text-left items-center gap-3 duration-150 transition hover:bg-green-500/10 px-4 py-2 rounded-2xl">
            <Image
              className="block w-[48px] mb-auto aspect-square object-cover rounded-full overflow-hidden"
              width={48.1}
              height={48.1}
              onError={e => {
                e.target.src = "/img/profile_default.webp"
              }}
              src={e?.profile.photo || "/img/profile_default.webp"}
              alt={"Foto de "+e.profile.username}
              unoptimized
            />
            <div className="w-full max-w-[65%] sm:max-w-[85%]">
              <span className="flex items-center capitalize font-semibold w-full">
                <span className="block w-fit max-w-[70%] truncate">{e.profile.name}</span>
                <small className="ml-1 w-[30%] lowercase text-gray-700">@{e.profile.username}</small>
                </span>
              <p>{e.you? <small className="mr-1 opacity-80">(vos)</small> : null}{e.lastMessage}</p>
            </div>
          </Link>
        ))
      }

    </main>
  )
}