import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';
import { EcosLogo } from '@/components/Icons';

export default function HeaderLanding() {
    const { status } = useSession();

    return (
        <header className="bg-gradient-to-t from-green-500 to-[#2bb95f] backdrop-blur-lg w-full flex justify-center py-3 sm:py-4 sticky top-0 z-50">
            <div className="flex w-[90%] sm:w-10/12 justify-between">
                <div className="text-white text-3xl sm:text-4xl font-bold flex items-center gap-2">
                    <EcosLogo className="fill-white -mt-0.5" size={"1.2em"} />
                    Ecos
                </div>

                <div className="flex items-center sm:text-xl text-white font-semibold gap-2.5 sm:gap-3">
                    {status === 'loading' ? (
                        <AiOutlineLoading size={24} className="animate-spin" />
                    ) : status === 'authenticated' ? (
                        <Link href="/home" className='text-xl'>
                            Comunidad
                        </Link>
                    ) : (
                        <>
                            <Link href="/signup" className="text-white bg-fuchsia-400 font-bold py-1.5 sm:py-2 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl">
                                Unirme
                            </Link>
                            <Link href="/signin" className="text-fuchsia-400 bg-white font-bold py-1.5 sm:py-2 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl">
                                Ingresar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}