"use client";

import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { PiUserCircleFill } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { Children, useState } from "react";
import { handleResizeInput, imagesToBase64 } from "@/utils/utils";
import Image from "next/image";
import ImageModal from "../ImageModal";
import toast from "react-hot-toast";
import { SERVER_ERROR } from "@/lib/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function PostForm() {
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [viewImage, setViewImage] = useState(false);
  const queryClient = useQueryClient();
  const sendPost = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        setImages([])
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

  const removeImages = (file) => {
    const bucket = images.filter((e) => e !== file);
    setImages(bucket);
  };

  const loadImages = async (e) => {
    const previewImages = await imagesToBase64(e.target.files, 5);
    setImages([...images, ...previewImages]);
    e.target.value = null;
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await sendPost.mutateAsync({
      content: e.target.content.value,
      images,
      category: 'post'
    })

    if (res.status === 201) {
      e.target.reset()
    }
  };

  return (
    <>
      {status === "loading" ? (
        <section className="grid place-content-center py-10">
          <AiOutlineLoading size={24} className="animate-spin" />
        </section>
      ) : session && session.user ? (
        <section className="flex gap-5 mt-2 h-fit p-6 border dark:border-white/20 rounded-xl">
          {
            session.user?.image?
            <Image
              className="block h-fit w-fit aspect-square object-cover rounded-full overflow-hidden"
              width={48.1}
              height={48.1}
              onError={e => {
                e.target.src = "/img/profile_default.webp"
              }}
              src={session.user?.image || "/img/profile_default.webp"}
              alt={"Foto de "+session.user.username}
              unoptimized
            />
            :
            <PiUserCircleFill size={48.1} className="block w-fit h-fit mb-auto max-w-[48px]" />
          }
          <form
            onSubmit={e => onSubmit(e)}
            className="flex flex-col w-full"
          >
            <textarea
              name="content"
              onChange={(e) => handleResizeInput(e, 70, 180)}
              className="not-sr-only bg-transparent resize-none outline-none w-full transition-[height] duration-200 border-b border-b-transparent focus-within:border-b-black/5 focus-within:dark:border-white/10 pb-2"
              placeholder="Comparti lo que quieras aqui."
            />

            <ImageModal image={viewImage} close={setViewImage} />

            {images.length > 0 ? (
              <section className="flex items-center gap-2 overflow-x-scroll hideScrollbar pt-4">
                {Children.toArray(
                  images.map((e, index) => (
                    <div className="relative w-[20%] max-w-[64px]">
                      <button
                        type="button"
                        onClick={() => removeImages(e)}
                        className="absolute -right-3 -top-2 bg-white dark:bg-white p-1 rounded-full border z-10"
                      >
                        <AiOutlineClose size={16} className="fill-black" />
                      </button>
                      <Image
                        onClick={() => setViewImage(e)}
                        className="bg-blue-500 w-full h-full aspect-square object-cover border-2 border-blue-500 rounded-md overflow-hidden cursor-pointer"
                        width={128.1}
                        height={128.1}
                        src={e}
                        alt={"Preview Image " + index}
                        unoptimized
                      />
                    </div>
                  )),
                )}
              </section>
            ) : null}

            <div className="flex items-center justify-between mt-2">
              <label className="cursor-pointer" htmlFor="uploadImagePost" aria-labelledby="Subir imagenes para tu publicación">
                <input
                  onChange={(e) => loadImages(e)}
                  className="hidden"
                  id="uploadImagePost"
                  type="file"
                  multiple
                />
                <span
                  tabIndex="0"
                  role="button"
                  >
                  <BsImage size={20} />
                </span>
              </label>

              <button
                disabled={sendPost.isPending}
                className="py-1 px-3 rounded-md bg-black text-white dark:bg-white dark:text-black pressable"
                type="submit"
              >
                {sendPost.isPending ? (
                  <span className="flex items-center gap-2">
                    <AiOutlineLoading size={16} className="animate-spin" />{" "}
                    Publicando
                  </span>
                ) : (
                  "Publicar"
                )}
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </>
  );
}
