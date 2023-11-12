'use client'

import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";

export default function Landing() {
  const { data: session, status } = useSession();

  return (
    <>
    <div className="flex flex-col justify-center items-center mx-auto w-fit gap-2">
      <p>Aca iria un landing</p>
      {
        status === "loading"?
        <AiOutlineLoading size={24} className="animate-spin" />
        :
        status === "authenticated"?
        <Link href="/home" className="border p-2 rounded-md">Ir al inicio @{session?.user?.username}</Link>
        :
        <>
        <Link href="/signin" className="text-red-500">Ingresar</Link>
        <Link href="/signup" className="text-blue-500">Unirme</Link>
        </>
      }
    </div>
    </>
  )
}
