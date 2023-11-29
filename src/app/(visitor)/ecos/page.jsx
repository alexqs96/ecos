'use client'

import { EcosLogo } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const Ecos = () => {
  const devs = [
    {
      id: 1,
      name: "Luana Martinez",
      image: "https://media.licdn.com/dms/image/D4D35AQEHUaOuPFQ2dg/profile-framedphoto-shrink_800_800/0/1691345631662?e=1701889200&v=beta&t=ywCwZl6jEhB4EwX6UQcGI6AD21frBdYrXeKkGgMzZWU",
      github: null,
      linkedin: "https://www.linkedin.com/in/luanadaianamartinez",
      role: "Frontend"
    },
    {
      id: 2,
      name: "Aylen Pimentel",
      image: "https://media.licdn.com/dms/image/D4D35AQHGWhj4-A2zPw/profile-framedphoto-shrink_400_400/0/1694797704538?e=1701889200&v=beta&t=B8fh-RPFGzuMzzxpOT3MzyamUOPsTF39TySDX1ItonI",
      github: null,
      linkedin: "https://www.linkedin.com/in/aylen-pimentel",
      role: "Frontend"
    },
    {
      id: 3,
      name: "Carolina Juarez",
      image: "https://media.licdn.com/dms/image/D4D35AQER1gwudnH33w/profile-framedphoto-shrink_400_400/0/1691021366891?e=1701889200&v=beta&t=CwAO5yoI-uThHkgQV8vGqp5g4GU49XTXMI1Zr1gNQKY",
      github: null,
      linkedin: "https://www.linkedin.com/in/carolina-beatriz-juarez-590029249",
      role: "Frontend"
    },
    {
      id: 4,
      name: "Alexander Mamani",
      image: "https://avatars.githubusercontent.com/u/72415956?v=4",
      github: "https://github.com/alexqs96",
      linkedin: "https://www.linkedin.com/in/alexander-mamani",
      role: "Fullstack"
    },
    {
      id: 5,
      name: "Lisandro Fideleff",
      image: "https://media.licdn.com/dms/image/D4D03AQGoA8n-hQT6mw/profile-displayphoto-shrink_800_800/0/1683128287624?e=1706745600&v=beta&t=EKNCYJXw-YWFoCBHoFirHZG86CynC163TwIJq6mh4Lk",
      github: null,
      linkedin: "https://www.linkedin.com/in/lisandrofideleff",
      role: "Frontend"
    },
    {
      id: 6,
      name: "Nahuel Cordoba",
      image: "https://media.licdn.com/dms/image/D5603AQGPr-Dy0clV-g/profile-displayphoto-shrink_400_400/0/1690570760385?e=1706745600&v=beta&t=apgXJ2DXxFsBn5BtbYpqJ5t4q5HLQU854z-2USaKFN8",
      github: "https://github.com/Agustinc91",
      linkedin: "https://www.linkedin.com/in/nahuel-cordoba",
      role: "Frontend"
    },
    {
      id: 7,
      name: "Rodrigo Cabrera",
      image: "https://avatars.githubusercontent.com/u/118491820?v=4",
      github: "https://github.com/Rodrigo-Emca",
      linkedin: "https://www.linkedin.com/in/rodrigo-cabrera-developer",
      role: "Frontend"
    },
  ]

  return (
    <main className="w-full py-10">
      <Link
        href="/home"
        className='flex items-center gap-0.5 text-3xl text-green-600 font-semibold w-fit mx-auto mb-5 -mt-5'
      >
        <EcosLogo size={"1.2em"} className={"-mt-0.5 fill-green-600"} />
        Ecos
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full max-w-[85%] mx-auto h-fit gap-5">
        {devs.map(dev => (
          <div
            key={dev.id}
            className="flex flex-col gap-2 border p-4 rounded-2xl font-mono transition duration-200"
          >
            <Image
              width={512}
              height={512}
              className="w-full h-full aspect-square rounded-xl object-cover"
              onError={e => {
                e.target.src = "/img/profile_default.webp";
              }}
              src={dev.image}
              alt={"Foto de " + dev.name}
              title={"Foto de " + dev.name}
              unoptimized
            />
            <div>
              <span className="block text-xl truncate font-medium" title={dev.name}>
                {dev.name}
              </span>

              <div className="flex flex-wrap gap-2 justify-between mt-1.5">
                <span className="bg-slate-900 text-white border border-white/20 py-0.5 px-2.5 rounded-md block w-fit text-sm">
                  {dev.role}
                </span>
                <div className="flex flex-wrap gap-1.5 w-fit">
                  {dev.linkedin ? (
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Perfil de Linkedin"
                      title="Agregame en Linkedin"
                    >
                      <AiFillLinkedin size={24} />
                    </a>
                  ) : null}
                  {dev.github ? (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Perfil de Github"
                      title="Agregame en Github"
                    >
                      <AiFillGithub size={24} />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Ecos