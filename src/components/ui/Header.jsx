'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { FiSearch } from 'react-icons/fi'
import { EcosLogo } from '../Icons'

const Header = () => {
  const search = useRef(null)

  return (
    <>
    <header className="p-3 bg-green-500 flex items-center justify-between gap-5 sticky top-0 z-50">
      <Link
        href="/home"
        className='flex items-center gap-1'
      >
        <EcosLogo size={"1.3em"} className={"-mt-0.5 fill-white"} />
        Ecos
      </Link>
      <div className="text-xl flex items-center w-full overflow-hidden border rounded-2xl bg-white focus-within:border-green-600">
        <button type="button" className="px-2">
        <FiSearch size={"1.2em"} />
        </button>
        <input ref={search} type="text" className="py-1 pr-3 outline-none w-full" />
      </div>
      <button>
        menu
      </button>
    </header>
    </>
  )
}

export default Header