'use client'

import { Posts } from '@/components/Posts/Posts';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import ProfileHead from './profileComponents/ProfileHead';
import ProfileBody from './profileComponents/ProfileBody';
import ProfileSide from './profileComponents/ProfileSide';
import SeccionesAlternas from './profileComponents/SeccionesAlternas';

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
    <main className='bg-white text-black h-full w-full flex'>
      <div className='h-full w-full lg:w-2/3 flex flex-col'>
        <section className='h-4/5 flex flex-col'>
          <ProfileHead data={data} />

          <div className='h-full border'>
            <ProfileBody data={data} />

{/*             {session?.user?.username === username ? (
              <p>Es tu perfil. Bienvenido {data.username}</p>
            ) : null}
            {data.username ? JSON.stringify(data, null, 2) : <p>usuario no existe</p>} */}

          </div>
        </section>

        <SeccionesAlternas username={username} />

      </div>

      <div className='hidden lg:block w-1/3 h-screen sticky top-0'>
        <ProfileSide/>
      </div>

    </main>
  );
}