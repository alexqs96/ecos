import { formatDate } from "@/utils/utils";
import ImagesLayout from "../ImagesLayout";

export default function PostShare({username, createdAt, content, images}){
  return (
    <>
    <div className="border dark:border-white/20 p-3 max-sm:py-2 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col">
      <span>@{username}</span>
      <small className="font-medium opacity-80 group relative cursor-pointer transition duration-200 hover:underline">
        {formatDate(createdAt).short}
        <small className="py-1 px-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hidden group-hover:block absolute -bottom-6 left-0">{formatDate(createdAt).long}</small>
      </small>
      {content}
      {
        images?.length > 0 ?
        <ImagesLayout images={images} creator={username} />
        :
        null
      }
      </div>
    </div>
    </>
  )
}