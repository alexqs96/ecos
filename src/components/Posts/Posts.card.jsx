"use client";
import CommentForm from "./Posts.comments.form";
import ImagesLayout from "../ImagesLayout";
import Comments from "./Posts.comments";
import { formatDate } from "@/utils/utils";
import Reactions from "./Posts.reactions";
import { AiFillLike } from "react-icons/ai";

export function PostCard({ data, session}) {
  if (!data) {
    return null;
  }

  return (
    <section className="border dark:border-white/20 p-5 max-sm:py-4 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col">
        <span>@{data.creator.username}</span>
        <small className="font-medium opacity-80 group relative cursor-pointer transition duration-200 hover:underline">
          {formatDate(data.createdAt).short}
          <small className="py-1 px-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hidden group-hover:block absolute -bottom-6 left-0">{formatDate(data.createdAt).long}</small>
        </small>
        {data.content ? <p>{data.content}</p> : null}
        {
          data?.images?.length > 0 ?
          <ImagesLayout images={data.images} creator={data.creator.username} />
          :
          null
        }
      </div>
      {
        data.likes.length > 0 || data.comments.length > 0?
        <nav className="flex items-center justify-between">
          <small className="flex items-center gap-2">{data.likes.length > 0? <><AiFillLike size={20} /> {data.likes.length}</> : ''}</small>
        
          <small>{data.comments.length > 0? data.comments.length + " Comentarios" : ''}</small>
        </nav>
        :
        null
      }
      <Reactions data={data.likes} post={data?._id} you={session?.username} />
      <Comments data={data.comments} you={session?.username}/>
      <CommentForm id={data._id} creator={data.creator.username} session={session}/>
    </section>
  );
}
