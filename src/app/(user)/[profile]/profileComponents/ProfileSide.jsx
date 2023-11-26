import React from 'react';
import Image from 'next/image';

function ProfileSide() {
    return (
        <div className='p-5 gap-6 border-l flex flex-col content-center h-screen'>
            <div className='bg-green-300 rounded-2xl py-1 flex'>
                <Image
                src={"/img/magnify.png"}
                width={25}
                height={25}
                alt="Magnify Icon"
                unoptimized
                />
                <input
                type="text"
                placeholder="Buscar algo..."
                className="ml-2 outline-none border-none bg-transparent"
                />
            </div>

            <div className='border-t text-xl font-bold text-green-500 text-center h-4/5 flex flex-col'>
                <p className='p-5'>Medallas</p>
                <div className='bg-green-100 rounded-2xl h-4/5'>
                {/* Contenido de Medallas */}
                </div>
            </div>
        </div>
    );
}

export default ProfileSide;
