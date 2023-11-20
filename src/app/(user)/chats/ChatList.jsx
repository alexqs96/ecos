'use client'
import { FiSearch } from "react-icons/fi";
import { TbMessage2 } from "react-icons/tb";
import { useEffect, useRef, useState } from "react"
import Link from "next/link";
import Image from "next/image";
import ChatSkeleton from "./ChatSkeleton";
import * as io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";

const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function ChatList({searchParams}){
  const search = useRef(null)
  const loading = false
  const {data: chats, isLoading} = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      return await fetch("/api/chats").then(res => res.json())
    }
  })

  useEffect(() => {
    socket.emit("connectToChat", 'alexqs96');
  }, [])

  return (
    <section className="flex flex-col gap-2 w-full p-5">
      <h1 className="text-3xl font-semibold flex items-center gap-2"><TbMessage2 /> Mensajes</h1>

      <section className="grid h-fit place-items-center w-full gap-5 border-b pb-2">
        <div className="flex items-center w-full max-w-xs overflow-hidden border-2 rounded-2xl bg-white/5 focus-within:border-green-600">
          <button type="button" className="px-2">
          <FiSearch size={20} />
          </button>
          <input ref={search} type="text" className="py-1 pr-3 outline-none w-full" />
        </div>

        <div className="grid grid-cols-2 items-center text-center w-full">
          <Link href="?view=friends" className="block group"><span className={"border-b-4 pb-1.5 transition duration-150 group-hover:border-b-green-600"+(searchParams.view === "friends" || !searchParams.view? " border-b-green-600 font-medium" : " border-transparent")}>Amigos</span></Link>
          <Link href="?view=trades" className="block group"><span className={"border-b-4 pb-1.5 transition duration-150 group-hover:border-b-green-600"+(searchParams.view === "trades"? " border-b-green-600 font-medium" : " border-transparent")}>Intercambios</span></Link>
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
          <Link href={"/chats/"+e.sender.username} key={e._id} className="flex text-left items-center gap-3 duration-150 transition hover:bg-green-500/10 px-4 py-2 rounded-2xl">
            <Image
              className="block w-[48px] mb-auto aspect-square object-cover rounded-full overflow-hidden"
              width={48.1}
              height={48.1}
              onError={e => {
                e.target.src = "/img/profile_default.webp"
              }}
              src={e?.sender.photo || "/img/profile_default.webp"}
              alt={"Foto de "+e.sender.username}
              unoptimized
            />
            <div className="w-full max-w-[65%] sm:max-w-[85%]">
              <span className="flex items-center capitalize font-semibold w-full">
                <span className="block w-fit max-w-[70%] truncate">{e.sender.name}</span>
                <small className="ml-1 w-[30%] lowercase text-gray-700">@{e.sender.username}</small>
                </span>
              <p>{e.lastMessage}</p>
            </div>
          </Link>
        ))
      }

    </section>
  )
}