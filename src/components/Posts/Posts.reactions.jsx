import { SERVER_ERROR } from "@/lib/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike, AiOutlineLoading } from "react-icons/ai";
import { Modal } from "../Modal";
import { handleResizeInput } from "@/utils/utils";
import PostShare from "./Posts.share";

export default function Reactions({ post, data, you, share}) {
  const [show, setShow] = useState(false)
  const queryClient = useQueryClient();
  const sendLike = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts/likes', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        queryClient.invalidateQueries('posts');
        toast.success(res.message + (res.status ? " 👍" : " 👎"));
      }
      else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error(SERVER_ERROR);
    }
  })
  const sharePost = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts/share', {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        queryClient.invalidateQueries('posts');
        setShow(false)
        toast.success(res.message);
      }
      else {
        toast.error(res.message);
      }
    },
    onError: () => {
      toast.error(SERVER_ERROR);
    }
  })

  const handleLike = () => {
    if (!you) {
      return location.replace("/signin")
    }
    sendLike.mutateAsync({
      post
    })
  }

  const handleShare = (e) => {
    e.preventDefault()
    if (!you) {
      return location.replace("/signin")
    }
    sharePost.mutateAsync({
      postId: post,
      content: e.target.content.value
    })
  }

  return (
    <>
      <Modal show={show} setShow={setShow}>
        <div className="bg-white p-6 rounded-2xl flex flex-col gap-3">
          <form
            onSubmit={e => handleShare(e)}
            className="flex flex-col w-full"
          >
            <textarea
              name="content"
              onChange={(e) => handleResizeInput(e, 70, 120)}
              className="not-sr-only bg-transparent resize-none outline-none w-full transition-[height] duration-200 pb-2"
              placeholder="Comparti lo que quieras aqui."
            />

            <button
              disabled={sharePost.status === "pending"}
              className="py-1 px-3 rounded-md bg-black text-white dark:bg-white dark:text-black pressable"
              type="submit"
            >
              {sharePost.status === "pending" ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading size={16} className="animate-spin" />{" "}
                  Compartiendo
                </span>
              ) : (
                "Compartir"
              )}
            </button>
          </form>

          <PostShare username={share.creator.username} createdAt={share.createdAt} content={share.content} images={share.images}/>
        </div>
      </Modal>
      <nav className="flex justify-between items-center max-sm:text-sm">
        <button onClick={handleLike} className={"flex py-1.5 items-center justify-center gap-2 w-full rounded-md hover:dark:bg-white/20 hover:bg-black/5 duration-150 transition " + (data.includes(you) ? "text-green-400 font-semibold" : "")}>
          {data.includes(you) ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          {sendLike.isPending ? <AiOutlineLoading size={20} className="animate-spin" /> : "Me Gusta"}
        </button>
        <button className="flex justify-center w-full">Comentar</button>
        <button onClick={() => setShow(!show)} className="flex justify-center w-full">Compartir</button>
      </nav>
    </>
  )
} 