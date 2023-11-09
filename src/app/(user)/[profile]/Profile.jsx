'use client'

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function Profile({username}) {
  const { data: session, status } = useSession();
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await fetch(`/api/users/${username}`).then(res => res.json())
  })

  if (status === "loading" || isPending) {
    return <p>Cargando...</p>
  }

  return (
    <>
      <section>
        {
          data.username?
          JSON.stringify(data)
          :
          <p>usuario no existe</p>
        }
      </section>
    </>
  )
}