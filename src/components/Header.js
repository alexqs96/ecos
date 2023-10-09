'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { DarkMode } from "./DarkMode"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between">
      {
        pathname === '/home'?
        <span>Ecos</span>
        :
        <Link href='/home'>Ecos</Link>
      }
      <DarkMode />
    </header>
  )
}