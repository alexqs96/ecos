'use client'

import { LeftSidebar, RightSidebar } from '@/components/Sidebars'
import { PostForm } from '@/components/Forms/PostForms'
import { Suspense } from 'react'
import { Posts } from '@/components/Posts/Posts'
import { Toaster } from 'react-hot-toast'

export default function HomePage() {
  return (
    <>
    <Toaster />
    <section className="flex justify-between gap-5 w-full max-sm:w-[95%] max-sm:mx-auto">
      <LeftSidebar />
      <section className='grid gap-2 w-full'>
      <PostForm />
      <Suspense fallback={<p>Cargando posts...</p>}>
        <Posts />
      </Suspense>
      </section>
      <RightSidebar />
    </section>
    </>
  )
}