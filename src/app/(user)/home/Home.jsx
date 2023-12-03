'use client'

import { PostForm } from '@/components/Posts/Posts.form'
import { Toaster } from 'react-hot-toast'
import { Posts } from '@/components/Posts/Posts'
import ContactsSidebar from '@/components/ContactsSidebar'
import { PiHouseFill, PiSignIn } from 'react-icons/pi'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { CommunityIcon } from '@/components/Icons'

export default function HomePage() {
  const { data: session, status } = useSession()
  
  return (
    <>
      <Toaster />
      <section className='grid gap-5 w-full mb-10 p-5'>
        {
          session?.user ?
            <>
              <h1 className="max-sm:hidden text-3xl font-semibold flex items-center gap-2 text-[#27b53C]">
                <PiHouseFill size={"1.2em"} className={"fill-[#27b53C]"} />
                Comunidad
              </h1>
              <PostForm />
              {
                status === "loading"?
                null
                :
                <Posts endpoint={"/api/posts"} />
              }
            </>
            :
            <>
              <Link
                href="/signin"
                className="group bg-green-500 w-fit mx-auto flex gap-3 items-center text-left px-6 py-4 rounded-full font-semibold text-white text-lg transition duration-150"
              >
                <PiSignIn size={28} />
                <span className="w-[8ch]">Ingresar</span>
              </Link>
              <Link
                href="/signup"
                className="group bg-green-500 w-fit mx-auto flex gap-3 items-center text-left px-6 py-4 rounded-full font-semibold text-white text-lg transition duration-150"
              >
                <CommunityIcon className="fill-current" size={28} />
                <span className="w-[8ch]">Unirme</span>
              </Link>
            </>
        }
      </section>
      <ContactsSidebar />
    </>
  )
}