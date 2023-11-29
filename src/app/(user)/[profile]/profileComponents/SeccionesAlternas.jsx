import React, { useState } from 'react';
import { Posts } from '@/components/Posts/Posts';

const Publicaciones = ({ username }) => (
    <section className='flex flex-col gap-5 p-5 pb-10 bg-white text-black'>
        {username ? <Posts query={`username=${username}`} /> : null}
    </section>
);

const SeccionesAlternas = ({ username }) => {
    const [seccionActiva, setSeccionActiva] = useState('Publicaciones');

    return (
        <section className='flex flex-col'>
            <div className='border-b py-2 text-center px-3 flex items-center overflow-x-scroll gap-5 hideScrollbar w-full'>
                <button className='w-full' onClick={() => setSeccionActiva('Publicaciones')}>
                    <span className={"w-fit mx-auto border-b-4 py-2 transition duration-150 group-hover:border-b-green-600 " + (seccionActiva === 'Publicaciones' ? 'border-b-green-600 font-bold' : 'border-transparent')}>
                        Publicaciones
                    </span>
                </button>

                <button className='w-full' onClick={() => setSeccionActiva('Jardines')}>
                    <span className={"w-fit mx-auto border-b-4 py-2 transition duration-150 group-hover:border-b-green-600 " + (seccionActiva === 'Jardines' ? 'border-b-green-600 font-bold' : 'border-transparent')}>
                        Mis Jardines
                    </span>
                </button>
            </div>

            {seccionActiva === 'Publicaciones' && <Publicaciones username={username} />}

        </section>
    );
};

export default SeccionesAlternas;
