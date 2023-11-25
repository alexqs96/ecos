import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileHead({ data }) {

    return (
        <div className='h-15vh flex bg-white text-black border border-gray-500'>
            <div className=' p-2 flex'> 
                <div className='w-1/12 flex place-items-center'>
                    <Link href="/home" className="border-none">
                        <Image
                            src={"/img/arrow-left.png"}
                            width={40}
                            height={40}
                            alt="Arrow Icon"
                            unoptimized
                        />
                    </Link>
                </div>
                <div className='pl-8'>
                    <p className='text-2xl font-bold text-green-500'> {data.name} {data.surname} </p>
                    <p className='text-xl'>{data.posts.length} posts </p>
                </div>
            </div>
{/*             <div className='w-4/12 border-gray-500 p-5'>
                <div className='w-10/12 bg-green-300 rounded-2xl px-4 py-1 flex'>
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
            </div> */}
        </div>
    )
}