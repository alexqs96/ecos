"use client";
import CommentForm from "./Posts.comments.form";
import ImagesLayout from "../ImagesLayout";
import Comments from "./Posts.comments";
import { formatDate } from "@/utils/utils";

export function PostCard({ data }) {
  if (!data) {
    return null;
  }

  return (
    <section className="border dark:border-white/20 p-6 max-sm:py-4 rounded-xl flex flex-col gap-5">
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
      <Comments data={data.comments}/>
      <CommentForm id={data._id} creator={data.creator.username}/>
    </section>
  );
}
