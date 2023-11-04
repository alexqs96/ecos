'use client'

import { useQuery } from '@tanstack/react-query'
import { PostCard } from "./Posts.card"

export function Posts(){
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => await fetch("/api/posts").then(res => res.json())
  })

  if (isError) {
    console.error(error);
    return <p>Hubo un error al cargar los posts.</p>
  }

  if (isPending) {
    return <p>Cargando Posts...</p>
  }

  return (
    <>
    {
      data.map(e => (
        <PostCard key={e._id} data={e} />
      ))
    }
    </>
  )
}