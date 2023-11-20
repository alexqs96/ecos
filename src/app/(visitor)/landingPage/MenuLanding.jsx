import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuLanding() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu} className=" text-white px-4 py-2 rounded">
                <Image
                    src={"/img/MenuLandingOpen.png"}
                    width={50}
                    height={50}
                    alt="Open Menu Icon"
                    unoptimized
                />
            </button>

            {menuOpen && (
                <div className="absolute w-10/12 h-1/6 bg-green-500 border shadow-md rounded-lg">
                    <ul className="list-none p-8 text-white font-bold text-2xl flex flex-col gap-5">
                        <li>
                        <Link href="/signup" className="">Registrarse</Link>
                        </li>
                        <li>
                        <Link href="/signin" className="">Iniciar Sesión</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
