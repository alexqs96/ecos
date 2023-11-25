import React from 'react';
import Image from 'next/image';

function ProfileBody({ data }) {

    return (
        <div className='relative'>
            <div className="relative w-full h-64">
                <Image
                src={data.banner ? data.banner : "/img/BannerDefault.png"}
                layout="fill"
                objectFit="cover"
                alt={data.banner ? "User Banner" : "Default Banner"}
                unoptimized
                />

                <div className='absolute bottom-0 left-5 bg-transparent'>
                    <Image
                    src={data.photo ? data.photo : "/img/profile_default.webp"}
                    width={125}
                    height={125}
                    alt={data.photo ? "User photo" : "Default photo"}
                    className='border-2 border-black rounded-full'
                    unoptimized
                    />
                </div>
            </div>

            <div className='flex flex-col mt-2'>
                <div className='flex justify-between'>
                    <div className='w-2/3 pl-5'>
                        <div>
                        <p className='text-xl font-bold text-green-500'>{data.name} {data.surname}</p>
                        <p className='text-gray-500'>@{data.username}</p>
                        </div>
                    </div>
                    <div className='w-1/3 flex place-content-center'>
                        <button className='border-2 border-green-800 rounded-full'>
                            <p className='text-mg text-green-500 px-4'>Editar perfil</p>
                        </button>
                    </div>
                </div>

                <div className='flex p-4'>
                    <Image
                        src={"/img/calendar-arrow-right.png"}
                        width={25}
                        height={25}
                        alt={"Calendar Icon"}
                        unoptimized
                        />
                    <p>Ingresado en {data.createdAt}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileBody;