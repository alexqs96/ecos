'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { EcosLogo, GardenIcon, MessageIcon, PlantIcon, ProfileIcon, TradeIcon } from '../Icons'
import { PiHouseFill } from 'react-icons/pi'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

const SIDEBAR_NAV_LINKS = [
  {
    icon: <PiHouseFill size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/home",
    label: "Inicio",
  },
  {
    icon: <ProfileIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/profile",
    label: "Perfil",
  },
  {
    icon: <TradeIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/trade",
    label: "Intercambios",
  },
  {
    icon: <PlantIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/plants",
    label: "Plantas",
  },
  {
    icon: <GardenIcon size={28} className="fill-white group-hover:fill-[#27b53C] " />,
    href: "/garden",
    label: "Mi huerta",
  },
  {
    icon: <MessageIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/chats",
    label: "Mensajes",
  },
];

const Header = () => {
  const {data: session, status} = useSession()
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()

  return (
    <>
    <header className="py-4 px-5 bg-green-500 flex items-center justify-between gap-5 sticky top-0 z-40 sm:hidden">
      <Link
        href="/home"
        className='flex items-center gap-0.5 text-3xl text-white font-semibold'
      >
        <EcosLogo size={"1.2em"} className={"-mt-0.5 fill-white"} />
        Ecos
      </Link>

      <button
        onClick={() => setOpenMenu(!openMenu)}
        className={"md:hidden hamburger block z-50" + (openMenu ? " is-active" : "")}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div className={'h-[100dvh] overflow-y-scroll hideScrollbar bg-gradient-to-tr from-[#147b3c] to-green-500 fixed inset-0 z-40 overflow-hidden transition-all duration-200 '+(
        openMenu? "w-full" : "w-0"
      )}>
        <div className='flex flex-col gap-3 mt-20 mx-8 pb-10 text-white'>
        {
          openMenu?
          <>
            <EcosLogo size={"8em"} className={"fill-white fixed bottom-4 right-4 opacity-10"} />

            {
              SIDEBAR_NAV_LINKS.map((e, index) => {
                const isActive = (pathname).includes(e.href) || "/"+session?.user?.username === pathname && e.href === "/profile";
                
                return (
                <Link
                  onClick={() => setOpenMenu(false)}
                  key={e.href+e.label}
                  href={e.href === "/profile" ? "/" + session?.user?.username : e.href}
                  style={{ animationDelay: `${index * 0.15}s` }}
                  className={'flex items-center gap-2 appear text-3xl py-2.5 px-5 font-bold rounded-full transition duration-150 '+(
                    isActive && "bg-white text-[#27b53C] fillIcon shadow-md"
                  )}
                >
                  {e.icon}
                  <span className='w-[13.5ch]'>{e.label}</span>
                </Link>
                )
              })
            }
          </>
          :
          null
        }
        </div>
      </div>
    </header>
    </>
  )
}

export default Header