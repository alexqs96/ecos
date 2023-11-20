"use client";
import CommentForm from "./Posts.comments.form";
import ImagesLayout from "../ImagesLayout";
import Comments from "./Posts.comments";
import { formatDate } from "@/utils/utils";
import Reactions from "./Posts.reactions";
import { AiFillLike } from "react-icons/ai";
import PostShare from "./Posts.share";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER_ERROR } from "@/lib/consts";
import toast from "react-hot-toast";
import {ModalMessage} from "../Modal";
import { useState } from "react";
import {FaTrashAlt} from 'react-icons/fa'

export function PostCard({ data, session}) {

  const [show, setShow] = useState(false)
  const queryClient = useQueryClient();
  const deletePost = useMutation({
    mutationFn: async (data) => {
      return await fetch('/api/posts', {
        method: "DELETE",
        credentials: 'include',
        body: JSON.stringify(data)
      })
    },
    onSuccess: async (result) => {
      const res = await result.json()
      if (result.status === 201) {
        queryClient.invalidateQueries('posts');
        toast.success(res.message);
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

  const handleDelete = () => {
    deletePost.mutateAsync({
      post: data._id
    })
  }

  if (!data) {
    return null;
  }

  return (
    <section className="border dark:border-white/20 p-5 max-sm:py-4 rounded-xl flex flex-col gap-4">
      <ModalMessage show={show} setShow={setShow} text={"¿Estas seguro que queres borrar este Post?"} action={handleDelete} status={deletePost.status === "pending"} />
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <span>@{data.creator.username}</span>
          {
            data.creator.username === session?.username?
            <button
              disabled={deletePost.status === "pending"}
              className="text-red-700"
              onClick={() => setShow(!show)}
            >
              <FaTrashAlt size={20} />
            </button>
            :
            null
          }
        </div>
        <small className="font-medium opacity-80 group relative cursor-pointer transition duration-200 hover:underline">
          {formatDate(data.createdAt).short}
          <small className="py-1 px-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hidden group-hover:block absolute -bottom-6 left-0">{formatDate(data.createdAt).long}</small>
        </small>
        {data.content ? <p>{data.content}</p> : null}
        {
          data.repost?.username?
          <PostShare username={data.repost.username} createdAt={data.repost.createdAt} content={data.repost.content} images={data.images} />
          :
          data?.images?.length > 0 ?
          <ImagesLayout images={data.images} creator={data.creator.username} />
          :
          null
        }
      </div>
      {
        data.likes.length > 0 || data.comments.length > 0?
        <nav className="flex items-center justify-between">
          <small className="flex items-center gap-2" title={data.likes}>{data.likes.length > 0? <><AiFillLike size={20} /> {data.likes.length}</> : ''}</small>
        
          <small>{data.comments.length > 0? data.comments.length + " Comentarios" : ''}</small>
        </nav>
        :
        null
      }
      <Reactions data={data.likes} post={data?._id} you={session?.username} share={data} />
      <Comments data={data.comments} you={session?.username}/>
      <CommentForm id={data._id} creator={data.creator.username} session={session}/>
    </section>
  );
}
