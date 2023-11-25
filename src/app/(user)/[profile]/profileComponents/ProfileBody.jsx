import React from 'react';
import Image from 'next/image';

function ProfileBody({ data }) {
    return (
        <div className=''>
            <div className="relative w-full h-64">
                <Image
                    src={data.banner ? data.banner : "/img/BannerDefault.png"}
                    layout="fill"
                    objectFit="cover"
                    alt={data.banner ? "User Banner" : "Default Banner"}
                    unoptimized
                />
            </div>
        </div>
    )
}

export default ProfileBody;
