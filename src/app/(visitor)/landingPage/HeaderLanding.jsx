import React from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AiOutlineLoading } from 'react-icons/ai';
import { EcosLogo } from '@/components/Icons';
import MenuLanding from './MenuLanding';

export default function HeaderLanding() {
    const { data: session, status } = useSession();

    return (
        <header className="bg-green-500 h-10vh w-full flex justify-center py-2">
        <div className="flex w-10/12 justify-between">
            <div className="md:hidden">
            <MenuLanding />
            </div>

            <div className="text-white text-2xl font-bold flex items-center gap-x-3">
            <EcosLogo className="" />
            Ecos
            </div>

            <div className="hidden md:flex space-x-4">
            {status === 'loading' ? (
                <AiOutlineLoading size={24} className="animate-spin" />
            ) : status === 'authenticated' ? (
                <Link href="/home" className="border p-2 rounded-md">
                Ir al inicio @{session?.user?.username}
                </Link>
            ) : (
                <>
                <button className="flex flex-col justify-center items-center gap-8 flex-shrink-0 rounded-full bg-fuchsia-400 px-10 py-3">
                    <Link href="/signup" className="text-white font-bold">
                    Registrarse
                    </Link>
                </button>
                <button className="flex items-center justify-center flex-shrink-0 flex-col gap-8 rounded-full border border-fuchsia-800 bg-white px-10 py-3">
                    <Link href="/signin" className="text-fuchsia-400 font-bold">
                    Iniciar Sesión
                    </Link>
                </button>
                </>
            )}
            </div>
        </div>
        </header>
    );
}