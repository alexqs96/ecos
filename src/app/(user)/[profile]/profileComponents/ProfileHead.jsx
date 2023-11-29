import React from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

export default function ProfileHead({ data }) {

    return (
        <div className='flex items-center gap-5 bg-white text-black border-b p-2 sticky top-0 z-50'>
            <Link href="/home">
                <FiChevronLeft size={"2.5em"} className='stroke-green-500' />
            </Link>
            <div className='truncate'>
                <p className='text-2xl font-bold text-green-500 truncate'> {data.name} {data.surname} </p>
                <span>@{data.username}</span>
            </div>
        </div>
    )
}