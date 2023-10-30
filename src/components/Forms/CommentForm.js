"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { handleResizeInput, imagesToBase64 } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PostFormSchema } from "@/lib/schemas";
import { BsImage } from "react-icons/bs";
import { AiOutlineClose, AiOutlineLoading, AiOutlineSend } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { PiUserCircleFill } from "react-icons/pi";

/**
 * Formulario de comentario
 * @param {string} id de la publicacion
 * @returns {JSX}
 */

export default function CommentForm({id}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(PostFormSchema),
  });

  const loadImages = async (file) => {
    const previewImages = await imagesToBase64(file);

    setImage(previewImages);
    document.querySelector("#uploadImageComment").value = null;
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/posts/comments", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          post: id,
          content: data.content,
          image,
        }),
      });

      console.log(res.statusText);

      if (res.status === 201) {
        reset();
        setImage(null);
        toast.success("Comentario Agregado 🥳");
        router.refresh();
      }

      document.querySelector("#uploadImageComment").value = null;
    } catch (error) {
      toast.error("Hubo un error al comentar.");
      console.log(error);
    }
  };

  return (
    <>
      {status === "loading" ? (
        <section className="grid place-content-center py-10">
          <AiOutlineLoading size={24} className="animate-spin" />
        </section>
      ) : session && session.user ? (
        <>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center w-full overflow-hidden"
        >
          <PiUserCircleFill size={48} className="mb-auto" />
          <div className="flex flex-col w-full h-full pl-3">
            <textarea
              {...register("content")}
              onChange={(e) => handleResizeInput(e, 70, 180)}
              className="not-sr-only bg-transparent resize-none outline-none w-full transition-[height] duration-200 pb-2"
              placeholder="Aa"
            />
            <div className="flex justify-between pt-2">
              <label className="cursor-pointer" htmlFor="uploadImageComment">
                <input
                  onChange={(e) => loadImages(e.target.files)}
                  className="hidden"
                  id="uploadImageComment"
                  type="file"
                />
                <BsImage size={24} />
              </label>

              <button
                disabled={isSubmitting}
                className="pressable"
                type="submit"
              >
                {isSubmitting ? (
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
                  alt={"Foto de "+session.user.username}
                  unoptimized
                  priority
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
