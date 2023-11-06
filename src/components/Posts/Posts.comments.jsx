'use client'

import Image from "next/image"
import ImageModal from "../ImageModal"
import { useState } from "react"
import { PiUserCircleFill } from "react-icons/pi"
import Link from "next/link"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { SERVER_ERROR } from "@/lib/consts"
import { useSession } from "next-auth/react"

export default function Comments({data}){
  const { data: session, status } = useSession();
  const [imageCommented, setimageCommented] = useState(null)
  const queryClient = useQueryClient();
  const deleteComment = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts/comments', {
        method: "DELETE",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        toast.success(res.message+" 🥳");
        queryClient.invalidateQueries('posts');
      }
      else
      {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error(SERVER_ERROR);
    }
  })

  const handleDelete = (postId, commentId) => {
    deleteComment.mutate({
      post: postId,
      id: commentId,
    })
  };

  if (!data.length > 0) {
    return null
  }

  return(
    <section className="flex flex-col gap-5">
    <ImageModal image={imageCommented} close={setimageCommented} />
    {
      data.map(e => (
        <div key={e._id} className="flex gap-2">
          {
            e.creator?.image?
            <Link href={e.creator.username} aria-label={"Ver perfil de @"+e.creator.username}>
              <Image
                className="aspect-square object-cover rounded-full overflow-hidden"
                width={48.1}
                height={48.1}
                onError={e => {
                  e.target.src = "/img/profile_default.webp"
                }}
                src={e.creator?.image || "/img/profile_default.webp"}
                alt={"Foto de "+e.creator.username}
                unoptimized
              />
            </Link>
            :
            <Link href={e.creator.username} aria-label={"Ver perfil de @"+e.creator.username}>
              <PiUserCircleFill size={48.1} />
            </Link>
          }
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <Link className="block w-fit" href={"/"+e.creator.username} aria-describedby={"Ver perfil de @"+e.creator.username}>
                  <small className="font-medium">{e.creator.name} {e.creator.surname} · @{e.creator.username}</small>
                </Link>
                <small className="-mt-1 font-medium opacity-80 group relative cursor-pointer transition duration-200 hover:underline">
                  {formatDate(e.createdAt).short}
                  <small className="py-1 px-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hidden group-hover:block absolute -bottom-6 left-0">{formatDate(e.createdAt).long}</small>
                </small>
              </div>

              {
                session && session.user && status !== "loading"?
                  e.creator.username === session.user.username?
                  <button onClick={() => handleDelete(e.post,e._id)} className="danger text-sm py-1 h-fit px-2.5 rounded-md">
                    Borrar
                  </button>
                  :
                  null
                :
                <span>Cargando..</span>
              }
            </div>
            <p className="whitespace-break-spaces">{e.content}</p>
            {
              e.image?
              <Image
                className="w-full max-w-[128px] h-full aspect-square object-cover rounded-md overflow-hidden cursor-pointer"
                onClick={() => setimageCommented(e.image)}
                width={128.1}
                height={128.1}
                src={e.image}
                alt={"Foto de "+e.creator.username}
                unoptimized
              />
              :
              null
            }
          </div>
        </div>
      ))
    }
    </section>
  )
}