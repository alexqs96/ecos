import React from 'react';
import Image from 'next/image';

export default function BodyLanding() {
    return (
        <div className="bg-white h-90vh w-screen flex flex-col items-center gap-y-14 pb-10">

            <div className='w-10/12 flex space-around py-10'>
                <div className=" w-7/12 content-items-center">
                    <p className='text-black font-semibold text-5xl m-8'>Entra a la comunidad, intercambia tus cultivos e infórmate para ser el mejor cultivador. </p>
                </div>

                <div className="w-4/12">
                    <Image
                        src={"/img/Landing1.png"}
                        width={400}
                        height={400}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
            </div>

            <div className='w-10/12 flex justify-evenly'>
                <div className='border-2 drop-shadow-lg rounded-lg w-3/12 flex flex-col place-items-center text-center pb-8'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Conecta en comunidad!</p>
                    <Image 
                        src="/img/Landing2.png"
                        width={200}
                        height={200}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
                <div  className='border-2 drop-shadow-lg rounded-lg w-3/12 flex flex-col place-items-center text-center'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Crea tu huerta!</p>
                    <Image
                        src="/img/Landing3.png"
                        width={200}
                        height={200}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
                <div  className='border-2 drop-shadow-xl rounded-lg w-3/12 flex flex-col place-items-center text-center'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Aprende sobre plantas!</p>
                    <Image
                        src="/img/Landing4.png"
                        width={200}
                        height={200}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
            </div>

            <div className='w-10/12 flex space-around'>
                <div className='w-6/12'>
                    <h2 className='text-black m-8 text-4xl font-semibold'>Cultiva e intercambia</h2>
                    <p className='text-black m-8 text-2xl text-gray-500'>¡Convierte tu pasión por la jardinería en conexiones reales! Comparte, intercambia y crece junto a otros amantes de las plantas en nuestra comunidad. Comienza hoy a intercambiar tus plantas, frutas y verduras favoritas.</p>
                    <div className='flex flex-col justify-center items-center '>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>
                <div className='w-6/12 p-4 flex place-items-center'>
                    <Image
                        src="/img/Landing5.png"
                        width={500}
                        height={500}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
            </div>

            <div className='w-10/12 flex space-around'>
                <div className='w-6/12 p-4 flex place-items-center'>
                    <Image
                        src="/img/Landing6.png"
                        width={400}
                        height={400}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>
                <div className='w-6/12'>
                    <h2 className='text-black m-8 text-4xl font-semibold'>Infórmate y diviértete cultivando</h2>
                    <p className='text-black m-8 text-2xl text-gray-500'>Descubre un mundo de diversión y aprendizaje en tu jardín virtual. Sumérgete en la magia de la agricultura, comparte tus experiencias y descubre nuevos trucos. Cultivar nunca fue tan emocionante. ¡Únete a la comunidad hoy!</p>
                    <div className='flex flex-col justify-center items-center '>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
