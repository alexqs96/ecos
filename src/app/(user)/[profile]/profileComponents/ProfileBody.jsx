import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CalendarIcon } from '@/components/Icons';
import Link from 'next/link';
import { TbCameraPlus } from 'react-icons/tb';
import { IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import { imagesToBase64 } from '@/utils/utils';
import toast from 'react-hot-toast';
import { SERVER_ERROR } from '@/lib/consts';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

function ProfileBody({ data, username }) {
    const { data:session, update } = useSession()
    const nameRef = useRef(null)
    const surnameRef = useRef(null)
    const bioRef = useRef(null)
    const cityRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const [profilePic, setProfilePic] = useState(false)
    const [profileBanner, setProfileBanner] = useState(false)
    const queryClient = useQueryClient();
    const addFriend = async () => {

    }

    const loadProfilePic = async (e) => {
        const previewImage = await imagesToBase64(e.target.files);
        setProfilePic(previewImage);
        e.target.value = null;
    };

    const loadBannerPic = async (e) => {
        const previewImage = await imagesToBase64(e.target.files);
        setProfileBanner(previewImage);
        e.target.value = null;
    };

    const updateProfile = async () => {
        setLoading(true)
        console.log({
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            about: bioRef.current.value,
            city: cityRef.current.value,
            photo: profilePic,
            banner: profileBanner,
        });
        try {
            const res = await fetch("/api/users",{
                method: "PATCH",
                body: JSON.stringify({
                    name: nameRef.current.value,
                    surname: surnameRef.current.value,
                    about: bioRef.current.value,
                    city: cityRef.current.value,
                    photo: profilePic,
                    banner: profileBanner,
                })
            })

            if (res.status === 200) {
                const dataUpdated = await res.json()

                const newSession = {
                    ...session,
                    user: {
                        ...session?.user,
                        name: dataUpdated.name,
                        surname: dataUpdated.surname,
                        photo: dataUpdated.photo
                    },
                };
        
                await update(newSession);
                
                toast.success("Perfil Actualizado 🥳")
                setEditProfile(false)
                setProfilePic(null)
                setProfileBanner(null)
                queryClient.invalidateQueries('user');
            }
        } catch (error) {
            console.log(error);
            toast.error(SERVER_ERROR)
        }
        setLoading(false)
    }

    return (
        <div className='relative'>
            <div className="w-full flex flex-col relative">
                {
                    data.username === username  && editProfile?
                        <>
                            {
                                profileBanner?
                                <button onClick={() => setProfileBanner(null)} className="active:scale-90 transition-transform duration-200 cursor-pointer absolute inset-0 bg-white/60 backdrop-blur-md p-2 left-auto top-5 right-5 block w-fit h-fit rounded-full">
                                    <IoCloseOutline size={"2.5em"} />
                                </button>
                                :
                                <>
                                <label htmlFor="bannerPic" className="active:scale-90 transition-transform duration-200 cursor-pointer absolute inset-0 bg-white/60 backdrop-blur-md p-2 left-auto top-5 right-5 block w-fit h-fit rounded-full">
                                    <TbCameraPlus size={"2.5em"} />
                                </label>
                                <input onChange={e => loadBannerPic(e)} type="file" name="banner" id="bannerPic" className="hidden" />
                                </>
                            }
                        </>
                        :
                        null
                }
                <Image
                    width={1024}
                    height={256}
                    className='h-64 w-full object-cover'
                    src={profileBanner? profileBanner : data.banner || "/img/BannerDefault.webp"}
                    alt={data.banner ? "User Banner" : "Default Banner"}
                    unoptimized
                />

                <div className='w-full -mt-[4rem] flex flex-wrap gap-5 px-5 justify-between'>
                    <div className='relative'>
                        {
                            data.username === username && editProfile?
                                <>
                                {
                                    profilePic?
                                    <button onClick={() => setProfilePic(null)} className="active:scale-90 transition-transform duration-200 cursor-pointer absolute inset-0 danger backdrop-blur-md p-2 left-auto top-0 right-0 block w-fit h-fit rounded-full">
                                        <IoCloseOutline size={"1.75em"} />
                                    </button>
                                    :
                                    <>
                                    <label
                                        htmlFor="profilePic"
                                        className="active:scale-90 transition-transform duration-200 cursor-pointer absolute inset-0 border border-white bg-white/60 backdrop-blur-md p-2 left-auto top-0 right-0 block w-fit h-fit rounded-full"
                                    >
                                        <TbCameraPlus size={"1.75em"} />
                                    </label>
                                    <input onChange={e => loadProfilePic(e)} type="file" name="picture" id="profilePic" className="hidden" />
                                    </>
                                }
                                </>
                                :
                                null
                        }
                        <Image
                            src={profilePic? profilePic : data.photo || "/img/profile_default.webp"}
                            width={125}
                            height={125}
                            alt={data.photo ? "User photo" : "Default photo"}
                            className='border-4 border-white rounded-full aspect-square'
                            unoptimized
                        />
                    </div>

                    <div className='flex items-center gap-3 flex-wrap text-sm'>
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

                                    <Link href={"/trade/" + data.username} className='border h-fit mt-auto border-[#27b53C] bg-[#27b53C] text-white rounded-2xl  font-semibold px-3.5 py-2 w-fit ml-auto'>
                                        Intercambiar
                                    </Link>

                                    <Link href={"/chats/" + data.username} className='border h-fit mt-auto border-[#27b53C] bg-[#27b53C] text-white rounded-2xl  font-semibold px-3.5 py-2 w-fit ml-auto'>
                                        Chatear
                                    </Link>
                                </>
                                :
                                null
                        }
                        {
                            data.username === username ?
                                <div className='flex items-center gap-4 mt-auto'>
                                {
                                    editProfile?
                                    <button
                                        onClick={() => updateProfile()}
                                        className='active:scale-90 transition-transform duration-200 border h-fit mt-auto rounded-2xl font-semibold px-3.5 py-2 w-fit ml-auto border-[#27b53C] text-[#27b53C]'
                                    >
                                        {loading? "Guardando" : "Guardar"}
                                    </button>
                                    :
                                    null
                                }
                                <button
                                    onClick={() => {
                                        if (editProfile) {
                                            setEditProfile(false)
                                            setProfilePic(null)
                                            setProfileBanner(null)
                                        }
                                        else
                                        {
                                            setEditProfile(true)
                                        }
                                    }}
                                    className={'active:scale-90 transition-transform duration-200 border h-fit mt-auto rounded-2xl font-semibold px-3.5 py-2 w-fit ml-auto'+(!editProfile? " border-[#27b53C] text-[#27b53C]": " border-red-700 text-red-700")}
                                >
                                    {editProfile? "Cancelar" : "Editar perfil"}
                                </button>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-col px-5 py-2.5 gap-5'>
                {
                    editProfile?
                    <span className='text-xl font-semibold -mb-3'>Información Personal</span>
                    :
                    null
                }
                <div className='flex justify-between gap-5 w-full'>
                    <div className='truncate w-full'>
                        {
                            editProfile?
                            <div className='flex items-center gap-2'>
                                <input
                                    ref={nameRef}
                                    defaultValue={data.name}
                                    type='text'
                                    className='border py-1 px-2 rounded-md'
                                />
                                <input
                                    ref={surnameRef}
                                    defaultValue={data.surname}
                                    type='text'
                                    className='border py-1 px-2 rounded-md'
                                />
                            </div>
                            :
                            <p className='text-xl font-bold text-green-500 truncate w-full max-w-[95%]'>{data.name} {data.surname}</p>
                        }

                        {
                            editProfile?
                            null
                            :
                            <p className='text-gray-500'>@{data.username}</p>
                        }
                        {
                            editProfile?
                            <textarea
                                ref={bioRef}
                                placeholder='Biografía'
                                defaultValue={data.about}
                                className='border mt-2 py-1 px-2 rounded-md resize-none w-full'
                            />
                            :
                            data.about?
                            <p className='text-gray-500 mt-2'>{data.about}</p>
                            :
                            null
                        }
                    </div>
                    
                </div>
                {
                    editProfile?
                    <span className='text-xl font-semibold -mt-3 -mb-5'>Ubicación</span>
                    :
                    null
                }
                <div className='flex items-center gap-2 flex-wrap mb-5'>
                    {
                        editProfile?
                        <input
                            ref={cityRef}
                            placeholder='Ciudad'
                            defaultValue={data.location.city}
                            type='text'
                            className='border mt-2 py-1 px-2 rounded-md'
                        />
                        :
                        data.location.city ?
                            <>
                                <IoLocationOutline size={"1.5em"} />
                                <p className='text-sm font-medium -ml-0.5 mr-2'> {data.location.city}</p>
                            </>
                            :
                            null
                    }
                    {
                        editProfile?
                        null
                        :
                        <>
                        <CalendarIcon />
                        <small className='font-medium'>Se unió en {new Date(data.createdAt)?.toLocaleDateString("es-AR", {
                            month: "long",
                            year: "numeric"
                        })}</small>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileBody;