'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { EcosLogo, GardenIcon, MessageIcon, PlantIcon, ProfileIcon, TradeIcon } from '../Icons'
import { PiHouseFill } from 'react-icons/pi'
import { usePathname } from 'next/navigation'

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
  const search = useRef(null)
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()

  return (
    <>
    <header className="py-3 px-5 bg-green-500 flex items-center justify-between gap-5 sticky top-0 z-40 sm:hidden">
      <Link
        href="/home"
        className='flex items-center gap-0.5 text-2xl text-white font-semibold'
      >
        <EcosLogo size={"1.2em"} className={"-mt-0.5 fill-white"} />
        Ecos
      </Link>

      <div className="flex items-center w-full overflow-hidden border rounded-2xl bg-white focus-within:border-green-600">
        <button type="button" className="px-2">
        <FiSearch size={"1.1em"} />
        </button>
        <input ref={search} type="text" className="py-1 pr-2 outline-none w-full" />
      </div>

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
        <div className='flex flex-col gap-5 mt-10 ml-10 pb-10'>
        <Link
          href="/home"
          className='flex items-center gap-2 text-3xl -mt-4 mb-2 text-white font-semibold'
        >
          <EcosLogo size={28} className={"-mt-0.5 fill-white"} />
          Ecos
        </Link>
        {
          openMenu?
          SIDEBAR_NAV_LINKS.map((e, index) => (
            <Link
              key={e.href+e.label}
              href={e.href}
              style={{ animationDelay: `${index * 0.15}s` }}
              className='flex items-center gap-2 appear text-3xl py-1 font-bold text-white'
            >
              {e.icon}
              <span>{e.label}</span>
            </Link>
          ))
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