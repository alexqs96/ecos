'use client'

import { Posts } from '@/components/Posts/Posts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import ProfileHead from './profileComponents/ProfileHead';
import ProfileBody from './profileComponents/ProfileBody';

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
    <main className='border-2 border-blue-500 bg-white text-black h-screen flex flex-col'>
      <section className='h-1/2 flex flex-col'>
        <ProfileHead data={data} />

        <div className='w-8/12 h-full border'>
          <ProfileBody data={data} />
          {session?.user?.username === username ? (
            <p>Es tu perfil. Bienvenido {data.username}</p>
          ) : null}
          {data.username ? JSON.stringify(data, null, 2) : <p>usuario no existe</p>}
        </div>
      </section>

      <section className='flex flex-col gap-5 w-8/12 bg-white text-black'>
        {username ? <Posts query={`username=${username}`} /> : null}
      </section>
    </main>
  );
}