"use client";

import { useState } from "react";
import { handleResizeInput, imagesToBase64 } from "@/utils/utils";
import Image from "next/image";
import toast from "react-hot-toast";
import { BsImage } from "react-icons/bs";
import { AiOutlineClose, AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { SERVER_ERROR } from "@/lib/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentForm({id, creator, session}) {
  const [image, setImage] = useState(null);
  const [createComment, setCreateComment] = useState(false)
  const queryClient = useQueryClient();
  const sendComment = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts/comments', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        setImage(null)
        queryClient.invalidateQueries('posts');
        toast.success(res.message+" 🥳");
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

  const loadImages = async (e) => {
    const previewImages = await imagesToBase64(e.target.files);
    setImage(previewImages);
    e.target.value = null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await sendComment.mutateAsync({
      post: id,
      content: e.target.content.value,
      image,
    })

    if (res.status === 201) {
      e.target.reset()
    }
  };

  return (
    <>
      {session? (
        <>
        <form
          onSubmit={e => onSubmit(e)}
          className="flex items-center w-full overflow-hidden"
        >
          <Image
            className="block w-[32px] md:w-[48px] mb-auto aspect-square object-cover rounded-full overflow-hidden"
            width={48.1}
            height={48.1}
            onError={e => {
              e.target.src = "/img/profile_default.webp"
            }}
            src={session?.user?.photo || "/img/profile_default.webp"}
            alt={"Foto de "+session?.username}
            unoptimized
          />
          <div className="flex flex-col w-full h-fit pl-3">
            <textarea
              name="content"
              onClick={() => setCreateComment(true)}
              onChange={(e) => handleResizeInput(e, 70, 180)}
              className={(createComment? "pb-2" : "h-8")+" not-sr-only bg-transparent resize-none outline-none w-full transition-[height] duration-200"}
              placeholder="Aa"
            />
            <div className={(createComment? "flex" : "hidden")+ " justify-between pt-2"}>
              <label className="cursor-pointer" htmlFor={"uploadImageComment"+id} aria-labelledby={"Subir una imagen para la publicación de @"+creator}>
                <input
                  onChange={(e) => loadImages(e)}
                  className="hidden"
                  id={"uploadImageComment"+id}
                  type="file"
                />
                  <span
                    tabIndex="0"
                    role="button"
                    >
                    <BsImage size={24} />
                  </span>
              </label>

              <button
                disabled={sendComment.isPending}
                className="pressable"
                type="submit"
                aria-label="Publicar Comentario"
              >
                {sendComment.isPending ? (
                  <AiOutlineLoading size={24} className="animate-spin" />
                ) : (
                  <AiOutlineSend size={24} />
                )}
              </button>
            </div>
            {
              image?
              <div className="relative w-full max-w-[64px] mt-4">
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute -right-3 -top-2 bg-white dark:bg-white p-1 rounded-full border z-10"
                >
                  <AiOutlineClose size={16} className="fill-black" />
                </button>
                <Image
                  className="bg-blue-500 w-full h-full aspect-square object-cover border-2 border-blue-500 rounded-md overflow-hidden cursor-pointer"
                  width={128.1}
                  height={128.1}
                  src={image}
                  alt={"Foto de "+session?.username}
                  unoptimized
                />
              </div>
              :
              null
            }
            
          </div>
        </form>
        </>
      ) : null}
    </>
  );
}
