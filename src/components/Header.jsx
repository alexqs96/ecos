'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DarkMode } from "./DarkMode"
import { EcosLogo } from "./Icons"
import { signOut, useSession } from "next-auth/react";
import { AiOutlineLoading } from 'react-icons/ai'

export default function Header() {
  const pathname = usePathname()
  const { data: session, status } = useSession();

  return (
    <header className="bg-white/60 dark:bg-black/60 backdrop-blur-md sticky top-0 z-50  border-b dark:border-white/20">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto py-4 px-[1%] flex-wrap max-sm:w-[95%]">
      {
        pathname === '/home'?
        <span className="flex items-center gap-1 text-xl font-medium">
          <EcosLogo />
          Ecos
        </span>
        :
        <Link href='/home' className="flex items-center gap-1 text-xl font-medium" scroll={false}>
          <EcosLogo />
          Ecos
        </Link>
      }

      <div className="flex items-center flex-wrap gap-5">
        <DarkMode />
        <div className="flex items-center flex-wrap">
          {
            session && session.user ?
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">@{session.user.username}</span>
              <button onClick={() => signOut()} className="text-sm py-1 px-2.5 rounded-md danger">
                Salir
              </button>
            </div>
            : status === "loading"?
            <AiOutlineLoading size={24} className="animate-spin" />
            :
            <>
            {
              pathname === '/signin'?
              <span
                className="block py-1 px-3"
              >
                Ingresar
              </span>
              :
              <Link
                href='/signin'
                className="py-1 px-3"
              >
                Ingresar
              </Link>
            }
            {
              pathname === '/signup'?
              <span
                className="block py-1 px-3 bg-black text-white dark:bg-white dark:text-black rounded-lg"
              >
                Unirme
              </span>
              :
              <Link
                className="py-1 px-3 bg-black text-white dark:bg-white dark:text-black rounded-lg"
                href='/signup'
              >
                Unirme
              </Link>
            }
            </>
          }
        </div>
      </div>
      </div>
    </header>
  )
}