'use client'

import { useSession } from "next-auth/react"

export default function ContactsSidebar() {
  const { data: session, status } = useSession()

  return (
    <aside className="max-xl:hidden max-w-xs w-full">
      <div className="fixed w-full max-w-xs h-[100dvh] p-5 top-0">
      {
        !session?.user?
        null
        :
        <>
          <h2 className="text-2xl font-semibold text-[#27b53C]">Mis Contactos</h2>
        </>
      }
      </div>
    </aside>
  )
}
