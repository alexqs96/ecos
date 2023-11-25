import React from 'react';
import Image from 'next/image';

function ProfileBody({ data }) {
    return (
        <div className=''>
            <div className="relative w-full h-64">
                <Image
                    src={"/img/BannerDefault.png"}
                    layout="fill"
                    objectFit="cover"
                    alt="Default Banner"
                    unoptimized
                />
            </div>
        </div>
    )
}

export default ProfileBody;
