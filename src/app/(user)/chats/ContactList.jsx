'use client'

import Image from "next/image"

export default function ContactList(){

  const data = [
    {
      _id: 132442,
      photo: "",
      username: "alex",
      name: "alexander",
      surname: "mamani",
      message: "holaa"
    },
    {
      _id: 13244233,
      photo: "",
      username: "xander",
      name: "alexandeddddddddddddddr",
      surname: "mamani",
      message: "olaaaa"
    }
  ]

  return (
    <section className="flex flex-col gap-2 w-full max-w-xs py-5">
      <h2 className="text-3xl font-semibold">Contactos</h2>
      {
        data.map(e => (
        <div key={e._id} className="flex items-center gap-2 bg-green-500/10 px-5 py-2 rounded-2xl">
          <Image
            className="block w-[32px] md:w-[48px] mb-auto aspect-square object-cover rounded-full overflow-hidden"
            width={48.1}
            height={48.1}
            onError={e => {
              e.target.src = "/img/profile_default.webp"
            }}
            src={e?.photo || "/img/profile_default.webp"}
            alt={"Foto de "+e.username}
            unoptimized
          />
          <div>
            <span className="flex items-center capitalize font-semibold">
              <span className="block md:max-w-[10ch] truncate">{e.name}</span>
              <small className="ml-1 lowercase text-gray-700">@{e.username}</small>
              </span>
            <p className="-mt-1">{e.message}</p>
          </div>
        </div>
        ))
      }

    </section>
  )
}