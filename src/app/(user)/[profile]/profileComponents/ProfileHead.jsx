import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileHead({ data }) {

    return (
        <div className='h-15vh flex bg-white text-black border-b p-2'>
                <div className='w-2/12 flex place-items-center'>
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
    )
}