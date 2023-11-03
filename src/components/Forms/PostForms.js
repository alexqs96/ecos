"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineClose, AiOutlineLoading } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { PiUserCircleFill } from "react-icons/pi";
import { PostFormSchema } from "@/lib/schemas";
import { useSession } from "next-auth/react";
import { Children, useState } from "react";
import { handleResizeInput, imagesToBase64 } from "@/utils/utils";
import Image from "next/image";
import ImageModal from "../ImageModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function PostForm() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const [images, setImages] = useState([]);
  const [viewImage, setViewImage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(PostFormSchema),
  });

  const removeImages = (file) => {
    const bucket = images.filter((e) => e !== file);
    setImages(bucket);
  };

  const loadImages = async (files) => {
    const previewImages = await imagesToBase64(files, 5);
    setImages([...images, ...previewImages]);
    document.querySelector("#uploadImage").value = null;
  };

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/posts', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({
          content: data.content,
          images,
          category: 'post'
        })
      })

      console.dir(res);

      if (res.status === 201) {
        reset()
        setImages([])
        toast.success("Post Publicado 🥳");
        router.refresh()
      }
      else
      {
        toast.error(res.statusText);  
      }

      document.querySelector("#uploadImage").value = null 
    } catch (error) {
      toast.error("Hubo un error al publicar.");
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
        <section className="flex gap-5 mt-1 h-fit p-4 border dark:border-white/20 rounded-md">
          <PiUserCircleFill size={48} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full"
          >
            <textarea
              {...register("content")}
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
                        priority
                      />
                    </div>
                  )),
                )}
              </section>
            ) : null}

            <div className="flex items-center justify-between mt-2">
              <label className="cursor-pointer" htmlFor="uploadImage">
                <input
                  onChange={(e) => loadImages(e.target.files)}
                  className="hidden"
                  id="uploadImage"
                  type="file"
                  multiple
                />
                <BsImage size={20} />
              </label>

              <button
                disabled={isSubmitting}
                className="py-1 px-3 rounded-md bg-black text-white dark:bg-white dark:text-black pressable"
                type="submit"
              >
                {isSubmitting ? (
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
