'use client'

import { CommunityIcon, EcosLogo, GardenIcon, LogoutIcon, MessageIcon, PlantIcon, ProfileIcon, TradeIcon } from "@/components/Icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSignIn } from "react-icons/pi";


const SIDEBAR_NAV_LINKS = [
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


const SideNavbar = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession();

  return (
    <aside className={"max-sm:hidden w-full sm:max-w-[290px] transition duration-300 " + (status === 'loading' ? "opacity-0" : "opacity-100")}>
      <div className="flex flex-col gap-5 bg-[#27b53C] bg-gradient-to-tr from-green-700 to-green-500 fixed h-[100dvh] px-5 py-5 w-full max-w-[290px] overflow-y-scroll hideScrollbar">

        <div className="flex flex-col text-center text-white select-none">
          <span className="flex items-center gap-1.5 text-3xl font-semibold mx-auto">
            <EcosLogo size={"1.3em"} className={"-mt-0.5 fill-white"} />
            Ecos
          </span>
        </div>

        {
          session?.user ?
            <>
              <Link href={`/${session?.user?.username}`} className="flex gap-3 items-center mx-auto mt-3">
                <Image
                  src={session?.user?.image || "/img/profile_default.webp"}
                  alt="profile"
                  className="h-12 w-12 rounded-full"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="flex flex-col w-full truncate">
                  <span className="font-bold text-white truncate w-[13ch]">
                    {session?.user?.name}
                  </span>
                  <span className="text-sm font-medium text-white truncate opacity-50 w-[13ch]">
                    @{session?.user?.username}
                  </span>
                </div>
              </Link>

              <ul className="flex flex-col gap-3 font-semibold text-white text-lg w-fit mx-auto">
                {SIDEBAR_NAV_LINKS.map((link) => {
                  const isActive = (pathname).includes(link.href) || "/"+session?.user?.username === pathname && link.href === "/profile";

                  return (
                    <li
                      key={link.label}
                      className={`group active:scale-95 hover:bg-white hover:text-[#27b53C] rounded-full transition duration-150  ${isActive && "bg-white text-[#27b53C] fillIcon"}`}
                    >
                      <Link href={link.href === "/profile" ? "/" + session?.user?.username : link.href} className=" flex gap-3 items-center px-5 py-4">
                        {link.icon}
                        <span className="w-[13ch]">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={() => signOut()}
                className="group w-fit mx-auto flex gap-3 items-center text-left px-5 py-4 rounded-full mt-10 hover:bg-white hover:text-[#27b53C] font-semibold text-white text-lg transition duration-150"
              >
                <LogoutIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />
                <span className="w-[13ch]">Cerrar Sesión</span>
              </button>
            </>
            :
            <>
              <Link
                href="/signin"
                className="mt-4 group w-fit mx-auto flex gap-3 items-center text-left px-6 py-4 rounded-full hover:bg-white hover:text-[#27b53C] font-semibold text-white text-lg transition duration-150"
              >
                <PiSignIn size={28} />
                <span className="w-[8ch]">Ingresar</span>
              </Link>
              <Link
                href="/signup"
                className="-mt-2 group w-fit mx-auto flex gap-3 items-center text-left px-6 py-4 rounded-full hover:bg-white hover:text-[#27b53C] font-semibold text-white text-lg transition duration-150"
              >
                <CommunityIcon className="fill-current" size={28} />
                <span className="w-[8ch]">Unirme</span>
              </Link>
            </>
        }
      </div>
    </aside>
  );
};

export default SideNavbar;
