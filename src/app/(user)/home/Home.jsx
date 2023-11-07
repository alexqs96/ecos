'use client'

import { LeftSidebar, RightSidebar } from './Home.sidebars'
import { PostForm } from '@/components/Posts/Posts.form'
import { Toaster } from 'react-hot-toast'
import { Posts } from '@/components/Posts/Posts'

export default function HomePage() {
  return (
    <>
    <Toaster />
    <section className="flex justify-between gap-5 w-full max-sm:w-[95%] max-sm:mx-auto">
      <LeftSidebar />
      <section className='grid gap-2 w-full mb-10'>
      <PostForm />
      <Posts />
      </section>
      <RightSidebar />
    </section>
    </>
  )
}