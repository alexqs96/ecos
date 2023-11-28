import { formatDate } from "@/utils/utils";
import ImagesLayout from "../ImagesLayout";
import Link from "next/link";
import Image from "next/image";

export default function PostShare({photo, username, createdAt, content, images}){
  return (
    <>
    <div className="border dark:border-white/20 p-3 max-sm:py-2 rounded-xl flex flex-col gap-4 my-2">
      <div className="flex flex-col">
      <Link
        href={"/"+username}
        className="flex items-center gap-2 mb-2"
      >
        <Image
          className="object-cover rounded-full h-fit"
          width={38}
          height={38}
          src={photo || "/img/profile_default.webp"}
          unoptimized
          alt={"Foto de perfil de @"+username}
        />
        <div className="flex flex-col w-full relative">
          <span className="hover:underline">@{username}</span>
          <small className="block font-medium opacity-80 group cursor-pointer transition duration-200 hover:underline w-full">
            {formatDate(createdAt).short}
            <small className="py-1 px-1.5 rounded-md bg-black dark:bg-white text-white dark:text-black hidden group-hover:block absolute -bottom-6 left-0 w-fit whitespace-pre">{formatDate(createdAt).long}</small>
          </small>
        </div>

      </Link>
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