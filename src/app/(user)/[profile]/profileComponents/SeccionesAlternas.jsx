import React, { useState } from 'react';
import { Posts } from '@/components/Posts/Posts';

const Publicaciones = ({ username }) => (
    <section className='flex flex-col gap-5 p-5 bg-white text-black'>
        {username ? <Posts query={`username=${username}`} /> : null}
    </section>
    );

    const Medallas = () => (
    <div className='border-t text-xl font-bold text-green-500 text-center h-4/5 flex flex-col'>
        <p className='p-5'>Medallas</p>
        <div className='bg-green-100 rounded-2xl h-4/5'>
        {/* Contenido de Medallas */}
        </div>
    </div>
    );

    const SeccionesAlternas = ({ username }) => {
    const [seccionActiva, setSeccionActiva] = useState('Publicaciones');

    return (
        <section className='flex flex-col'>
        <div className='border-b py-2 text-center px-3 flex items-center overflow-x-scroll gap-5 hideScrollbar w-full'>
            <button className='w-full' onClick={() => setSeccionActiva('Publicaciones')}>
                <span className={"w-fit mx-auto border-b-4 py-2 transition duration-150 group-hover:border-b-green-600 "+(seccionActiva === 'Publicaciones' ? 'border-b-green-600 font-bold' : 'border-transparent')}>
                    Publicaciones
                </span>
            </button>
            <button className='w-full' onClick={() => setSeccionActiva('Medallas')}>
                <span className={"w-fit mx-auto border-b-4 py-2 transition duration-150 group-hover:border-b-green-600 "+(seccionActiva === 'Medallas' ? 'border-b-green-600 font-bold' : 'border-transparent')}>
                    Medallas
                </span>
            </button>
            <button className='w-full' onClick={() => setSeccionActiva('Intercambios')}>
                <span className={"w-fit mx-auto border-b-4 py-2 transition duration-150 group-hover:border-b-green-600 "+(seccionActiva === 'Intercambios' ? 'border-b-green-600 font-bold' : 'border-transparent')}>
                    Intercambios
                </span>
            </button>
        </div>

        {seccionActiva === 'Publicaciones' && <Publicaciones username={username} />}
        {seccionActiva === 'Medallas' && <Medallas />}
        </section>
    );
};

export default SeccionesAlternas;
