import React, { useState } from 'react';
import { Posts } from '@/components/Posts/Posts';

const Publicaciones = ({ username }) => (
    <section className='flex flex-col gap-5 bg-white text-black'>
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
        <section className='h-4/5 flex flex-col'>
        <div className='border-b-2 text-center text-xl font-bold flex justify-evenly'>
            <p className={seccionActiva === 'Publicaciones' ? 'underline' : ''} onClick={() => setSeccionActiva('Publicaciones')}>
            Publicaciones
            </p>
            <p className={`lg:hidden ${seccionActiva === 'Medallas' ? 'underline' : ''}`} onClick={() => setSeccionActiva('Medallas')}>
            Medallas
            </p>
            <p className={`md:hidden ${seccionActiva === 'Intercambios' ? 'underline' : ''}`} onClick={() => setSeccionActiva('Intercambios')}>
            Intercambios
            </p>
        </div>

        {seccionActiva === 'Publicaciones' && <Publicaciones username={username} />}
        {seccionActiva === 'Medallas' && <Medallas />}
        </section>
    );
};

export default SeccionesAlternas;
