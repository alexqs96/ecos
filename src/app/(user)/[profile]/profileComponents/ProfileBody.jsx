import React from 'react';
import Image from 'next/image';
import { CalendarIcon } from '@/components/Icons';
import Link from 'next/link';

function ProfileBody({ data, username }) {

    const addFriend = async () => {
        
    }

    return (
        <div className='relative'>
            <div className="w-full flex flex-col">
                <Image
                    width={1024}
                    height={256}
                    className='h-64 w-full object-cover'
                    src={data.banner || "/img/BannerDefault.webp"}
                    alt={data.banner ? "User Banner" : "Default Banner"}
                    unoptimized
                />

                <div className='w-full -mt-[4rem] flex flex-wrap gap-5 px-5 justify-between'>
                    <Image
                        src={data.photo || "/img/profile_default.webp"}
                        width={125}
                        height={125}
                        alt={data.photo ? "User photo" : "Default photo"}
                        className='border-4 border-white rounded-full'
                        unoptimized
                    />

                    <div className='flex items-center gap-3'>
                        {
                            data.username !== username ?
                            <>
                            <button
                                onClick={() => addFriend()}
                                type='button'
                                className='border h-fit mt-auto border-[#27b53C] rounded-2xl text-[#27b53C] font-semibold px-3.5 py-2 w-fit ml-auto'
                            >
                                Agregar a amigos
                            </button>
                            
                            <Link href={"/trade/"+data.username}  className='border h-fit mt-auto border-[#27b53C] bg-[#27b53C] text-white rounded-2xl  font-semibold px-3.5 py-2 w-fit ml-auto'>
                                Intercambiar
                            </Link>

                            <Link href={"/chats/"+data.username}  className='border h-fit mt-auto border-[#27b53C] bg-[#27b53C] text-white rounded-2xl  font-semibold px-3.5 py-2 w-fit ml-auto'>
                                Chatear
                            </Link>
                            </>
                            :
                            null
                        }
                        {
                            data.username === username ?
                            <Link href="/edit" className='border h-fit mt-auto border-[#27b53C] rounded-2xl text-[#27b53C] font-semibold px-3.5 py-2 w-fit ml-auto'>
                                Editar perfil
                            </Link>
                            :
                            null
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-col p-5 gap-6'>
                <div className='flex justify-between gap-5 w-full'>
                    <div className='truncate w-full'>
                        <p className='text-xl font-bold text-green-500 truncate w-full max-w-[95%]'>{data.name} {data.surname}</p>
                        <p className='text-gray-500'>@{data.username}</p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <CalendarIcon />
                    <small className='font-medium'>Se unio el {new Date(data.createdAt)?.toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}</small>
                </div>
            </div>
        </div>
    );
}

export default ProfileBody;