'use client'

import { useQuery } from '@tanstack/react-query'
import { PostCard } from "./Posts.card"
import { AiOutlineLoading } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

export function Posts(){
  const { data: session } = useSession();
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await fetch("/api/posts").then(res => res.json())
  })

  if (isError) {
    console.error(error);
    return (
      <section className="grid place-content-center py-10">
        <b>Hubo un error al cargar los posts.</b>
      </section>
    )
  }

  if (isPending) {
    return (
      <section className="grid place-content-center py-10">
        <AiOutlineLoading size={24} className="animate-spin" />
      </section>
    )
  }

  return (
    <>
    {
      data.map(e => (
        <PostCard key={e._id} data={e} session={session?.user} />
      ))
    }
    </>
  )
}