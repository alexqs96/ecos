import React from 'react';
import Image from 'next/image';
import { Carrousel1, Carrousel2, Carrousel3, Home1 } from '@/components/Images';

export default function BodyLanding() {
    return (
        <div className="bg-white h-90vh w-full flex flex-col items-center gap-y-14 pb-10">

            <div className='w-10/12 flex space-around py-10'>
                <div className="w-full md:w-7/12 content-items-center">
                    <p className='text-black font-semibold text-4xl md:text-5xl md:m-8'>Entra a la comunidad, intercambia tus cultivos e infórmate para ser el mejor cultivador. </p>
                </div>

                <div className="hidden md:block w-4/12">
                    <Home1 size={480}/>
                </div>
            </div>

            <div className='w-10/12 flex justify-evenly'>
                <div className='border-2 shadow-2xl rounded-lg w-10/12 md:w-3/12 flex flex-col place-items-center text-center pb-8'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Conecta en comunidad!</p>
                    <Carrousel1 size={250}/>
                </div>
                <div  className='border-2 shadow-2xl rounded-lg w-10/12 md:w-3/12 flex flex-col place-items-center text-center pb-8'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Crea tu huerta!</p>
                    <Carrousel2 size={250} className=""/>
                </div>
                <div  className='border-2 shadow-2xl rounded-lg w-10/12 md:w-3/12 flex flex-col place-items-center text-center pb-8'>
                    <p className='text-green-800 p-4 text-xl font-semibold'>¡Aprende sobre plantas!</p>
                    <Carrousel3 size={250}/>
                </div>
            </div>

            <div className='w-10/12 flex flex-col md:flex-row space-around'>
                <div className='w-full md:w-6/12 mb-8 md:mb-0 md:flex md:flex-col md:items-center'>
                    <h2 className='text-black m-8 text-4xl font-semibold'>Cultiva e intercambia</h2>
                    <p className=' m-8 text-2xl text-gray-500'>¡Convierte tu pasión por la jardinería en conexiones reales! Comparte, intercambia y crece junto a otros amantes de las plantas en nuestra comunidad. Comienza hoy a intercambiar tus plantas, frutas y verduras favoritas.</p>
                    <div className='hidden md:inline flex flex-col justify-center items-center'>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>
                <div className='md:w-6/12 p-4 flex flex-col place-items-center gap-5'>
                    <Image
                        src="/img/Landing5.png"
                        width={500}
                        height={500}
                        alt="Picture of the plant"
                        unoptimized
                    />
                    <div className='md:hidden flex flex-col justify-center items-center '>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>
            </div>


            <div className='w-10/12 flex flex-col md:flex-row space-around'>

            <div className='hidden md:inline w-6/12 p-4 flex flex-col place-items-center gap-5'>
                    <Image
                        src="/img/Landing6.png"
                        width={400}
                        height={400}
                        alt="Picture of the plant"
                        unoptimized
                    />
                </div>

                <div className='w-full md:w-6/12 mb-8 md:mb-0 md:flex md:flex-col md:items-center'>
                    <h2 className='text-black m-8 text-4xl font-semibold'>Infórmate y diviértete cultivando</h2>
                    <p className='text-black m-8 text-2xl text-gray-500'>Descubre un mundo de diversión y aprendizaje en tu jardín virtual. Sumérgete en la magia de la agricultura, comparte tus experiencias y descubre nuevos trucos. Cultivar nunca fue tan emocionante. ¡Únete a la comunidad hoy!</p>
                    <div className='hidden md:inline flex flex-col justify-center items-center'>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>

                <div className='md:hidden p-4 flex flex-col place-items-center gap-5'>
                    <Image
                        src="/img/Landing6.png"
                        width={400}
                        height={400}
                        alt="Picture of the plant"
                        unoptimized
                    />
                    <div className='md:hidden flex flex-col justify-center items-center '>
                        <button className="gap-8 flex-shrink-0 rounded-full bg-green-500 text-xl p-4">
                            <p>¡Comienza a intercambiar!</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
