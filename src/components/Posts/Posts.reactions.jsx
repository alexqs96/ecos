import { SERVER_ERROR } from "@/lib/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike, AiOutlineLoading } from "react-icons/ai";

export default function Reactions({post, data, you}){
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
        toast.success(res.message+(res.status? " 👍" : " 👎"));
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

  const handleLike = () => {
    if (!you) {
      return location.replace("/signin")
    }
    sendLike.mutateAsync({
      post
    })
  }

  return (
    <>
      <nav className="flex justify-between items-center">
        <button onClick={handleLike} className={"flex py-1.5 items-center justify-center gap-2 w-full rounded-md hover:dark:bg-white/20 hover:bg-black/5 duration-150 transition " + (data.includes(you)? "text-green-400 font-semibold" : "")}>
          { data.includes(you)? <AiFillLike size={20} /> : <AiOutlineLike size={20} /> }
          { sendLike.isPending? <AiOutlineLoading size={20} className="animate-spin" /> : "Me Gusta"}
        </button>
        <button className="flex justify-center w-full">Comentar</button>
        <button className="flex justify-center w-full">Compartir</button>
      </nav>
    </>
  )
}