'use client'

import { PostForm } from '@/components/Posts/Posts.form'
import { Toaster } from 'react-hot-toast'
import { Posts } from '@/components/Posts/Posts'
import ContactsSidebar from '@/components/ContactsSidebar'
import { PiHouseFill } from 'react-icons/pi'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const { data: session, status } = useSession()
  
  return (
    <>
      <Toaster />
      <section className='grid gap-5 w-full mb-10 p-5'>
        {
          session?.user ?
            <>
              <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C]">
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
            null
        }
      </section>
      <ContactsSidebar />
    </>
  )
}