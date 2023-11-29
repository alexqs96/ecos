'use client'

import { useQuery } from '@tanstack/react-query';

import ProfileHead from './profileComponents/ProfileHead';
import ProfileBody from './profileComponents/ProfileBody';
import SeccionesAlternas from './profileComponents/SeccionesAlternas';
import ContactsSidebar from '@/components/ContactsSidebar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Profile({ username }) {
  const { data: session } = useSession()

  const { data, isFetching, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await fetch(`/api/users/${username}`).then(res => res.json())
  })

  return (
    <>
      {
        error ?
          <p>Hubo un error al cargar el perfil</p>
          :
          isFetching ?
            <div className='w-full animate-pulse bg-slate-50'>
            </div>
            :
            !data.username ?
              <div className='w-full grid place-content-center place-items-center items-center text-3xl font-semibold h-[40dvh] gap-5'>
                <h1>Este usuario no existe</h1>

                <Link
                  className="block shadow-transparent hover:shadow-2xl hover:shadow-green-700/20 font-medium py-1.5 px-3.5 rounded-lg bg-[#27b53C] text-white text-lg transition-all duration-200 active:scale-95"
                  href="/home"
                >
                  Volver al Inicio
                </Link>
              </div>
              :
              <main className='bg-white text-black h-full w-full flex'>
                <div className='h-full w-full flex flex-col'>
                  <section className='h-4/5 flex flex-col'>
                    <ProfileHead data={data} />

                    <div className='h-full'>
                      <ProfileBody data={data} username={session?.user?.username || null} />

                    </div>
                  </section>

                  <SeccionesAlternas username={username} />

                </div>

                <ContactsSidebar />

              </main>
      }
    </>
  );
}