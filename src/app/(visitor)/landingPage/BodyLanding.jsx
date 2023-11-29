'use client'

import { Carrousel1, Carrousel2, Carrousel3, Home1, Home2, Home3 } from '@/components/Images';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function BodyLanding() {
    const { status } = useSession();

    return (
        <div className="bg-white w-full flex flex-col items-center gap-36">

            <div className='grid md:grid-cols-2 py-10 w-10/12 mx-auto items-center gap-10 mt-16'>
                <h1 className='text-black font-semibold text-5xl appear'>Entra a la comunidad, intercambia tus cultivos e infórmate para ser el mejor cultivador. </h1>

                <div className="hidden md:flex items-center justify-center appear">
                    <Home1 size={"85%"} />
                </div>
            </div>

            <div className='w-[85%] sm:w-[95%] lg:w-10/12 flex max-md:flex-col justify-between mx-auto gap-10 sm:gap-5'>
                <div
                    style={{ animationDelay: `${2 * 0.15}s` }}
                    className='border shadow-2xl appear rounded-3xl flex flex-col place-items-center text-center p-10 sm:p-8 gap-5'
                >
                    <p className='text-green-800 text-[2.5em] md:text-3xl font-semibold'>¡Conecta en comunidad!</p>
                    <Carrousel1 size={"100%"} />
                </div>
                <div
                    style={{ animationDelay: `${4 * 0.15}s` }}
                    className='border shadow-2xl appear rounded-3xl flex flex-col place-items-center text-center p-10 sm:p-8 gap-5'
                >
                    <p className='text-green-800 text-[2.5em] md:text-3xl font-semibold'>¡Crea tu huerta!</p>
                    <Carrousel2 size={"100%"} />
                </div>
                <div
                    style={{ animationDelay: `${6 * 0.15}s` }}
                    className='border shadow-2xl appear rounded-3xl flex flex-col place-items-center text-center p-10 sm:p-8 gap-5'
                >
                    <p className='text-green-800 text-[2.5em] md:text-3xl font-semibold'>¡Aprende sobre plantas!</p>
                    <Carrousel3 size={"100%"} />
                </div>
            </div>

            <div className='w-10/12 grid grid-cols-1 md:grid-cols-2 mx-auto items-center gap-20'>
                <div className='w-full flex flex-col gap-5 h-fit my-auto'>
                    <h2 className='text-black text-5xl font-semibold'>Cultiva e intercambia</h2>
                    <p className='text-2xl text-gray-500'>¡Convierte tu pasión por la jardinería en conexiones reales! Comparte, intercambia y crece junto a otros amantes de las plantas en nuestra comunidad. Comienza hoy a intercambiar tus plantas, frutas y verduras favoritas.</p>
                    <Link href={status === "authenticated" ? "/home" : "/signin"} className="rounded-2xl bg-green-500 text-white font-semibold text-xl py-3 px-6 w-fit">
                        ¡Comienza a intercambiar!
                    </Link>
                </div>
                <Home2 size={"100%"} className="max-sm:-order-1" />
            </div>

            <div className='w-10/12 grid grid-cols-1 md:grid-cols-2 mx-auto items-center gap-20'>
                <Home3 size={"100%"} />

                <div className='w-full flex flex-col gap-5 h-fit my-auto'>
                    <h2 className='text-black text-5xl font-semibold'>Infórmate y diviértete cultivando</h2>
                    <p className='text-2xl text-gray-500'>Descubre un mundo de diversión y aprendizaje en tu jardín virtual. Sumérgete en la magia de la agricultura, comparte tus experiencias y descubre nuevos trucos. Cultivar nunca fue tan emocionante. ¡Únete a la comunidad hoy!.</p>
                    <Link href={status === "authenticated" ? "/home" : "/signin"} className="rounded-2xl bg-green-500 text-white font-semibold text-xl py-3 px-6 w-fit">
                        ¡Explora nuestra comunidad!
                    </Link>
                </div>
            </div>

            <footer className='my-10 flex max-sm:flex-col justify-between items-center gap-5 w-10/12 font-medium'>
                <span>© {new Date().getFullYear()} ~ Fundación Pescar</span>

                <div className='flex flex-col gap-1 text-right text-sm'>
                    <em>Creando un sonido que persista en el tiempo.</em>
                </div>
            </footer>
        </div>
    );
}
