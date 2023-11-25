import React from 'react'
import Image from 'next/image'

function ProfileSide() {
    return (
        <div>
            <div className='border-gray-500 p-5'>
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
            </div>
        </div>
    )
}

export default ProfileSide