"use client";
import CommentForm from "./Posts.comments.form";
import ImagesLayout from "../ImagesLayout";
import Comments from "./Posts.comments";

export function PostCard({ data }) {
  if (!data) {
    return null;
  }

  return (
    <section className="border dark:border-white/20 p-4 rounded-xl flex flex-col gap-2">
      <span>@{data.creator.username}</span>
      {data.content ? <p>{data.content}</p> : null}
      {
        data?.images?.length > 0 ?
        <ImagesLayout images={data.images} creator={data.creator.username} />
        :
        null
      }
      <Comments data={data.comments}/>
      <CommentForm id={data._id}/>
    </section>
  );
}
