'use client'

import { Posts } from '@/components/Posts/Posts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function Profile({username}) {
  const { data: session, status } = useSession();
  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await fetch(`/api/users/${username}`).then(res => res.json())
  })

  if (status === "loading" || isPending) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>Hubo un Error al cargar el perfil</p>
  }

  return (
    <main>
      <section>
        {
          session?.user?.username === username?
          <p>Es tu perfil</p>
          :
          null
        }
        {
          data.username?
          JSON.stringify(data,null,2)
          :
          <p>usuario no existe</p>
        }
      </section>
      <section className='flex flex-col gap-5'>
        {
          username?
          <Posts query={`username=${username}`} />
          :
          null
        }
      </section>
    </main>
  )
}