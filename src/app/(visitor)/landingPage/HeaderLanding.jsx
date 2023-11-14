import React from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";
import { EcosLogo } from '@/components/Icons';

export default function HeaderLanding() {

    const { data: session, status } = useSession();

    return (
        <header className="bg-green-500 h-10vh w-screen flex items-center justify-evenly p-2">
            <div className="text-white text-lg font-bold">
                <EcosLogo className=""/>
                Ecos
                </div>
            <div className="flex space-x-4">
                {
                    status === "loading"?
                    <AiOutlineLoading size={24} className="animate-spin" />
                    :
                    status === "authenticated"?
                    <Link href="/home" className="border p-2 rounded-md">Ir al inicio @{session?.user?.username}</Link>
                    :
                    <>
                    <button className="flex flex-col justify-center items-center gap-8 flex-shrink-0 rounded-full bg-purple-500">
                        <Link href="/signup" className="text-white m-4">Registrarse</Link>
                    </button>
                    <button className="flex items-center justify-center flex-shrink-0 flex-col gap-8 rounded-full border border-purple-600 bg-white">
                        <Link href="/signin" className="text-black m-4">Iniciar Sesión</Link>
                    </button>
                    </>
                }
            </div>
        </header>
    );
}
