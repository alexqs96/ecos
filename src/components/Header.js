'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DarkMode } from "./DarkMode"
import { EcosLogo } from "./Icons"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white/60 dark:bg-black/60 backdrop-blur-md sticky top-0 z-50  border-b dark:border-white/20">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto py-4 px-[1%] flex-wrap">
      {
        pathname === '/home'?
        <span className="flex items-center gap-1 text-xl font-medium">
          <EcosLogo />
          Ecos
        </span>
        :
        <Link href='/home' className="flex items-center gap-1 text-xl font-medium">
          <EcosLogo />
          Ecos
        </Link>
      }

      <div className="flex items-center flex-wrap gap-5">
        <DarkMode />
        <div className="flex items-center flex-wrap">
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
        </div>
      </div>
      </div>
    </header>
  )
}