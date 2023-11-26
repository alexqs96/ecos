'use client'
import { CommunityIcon, EcosLogo, GardenIcon, HeartIcon, LogoutIcon, MessageIcon, PlantIcon, ProfileIcon, TradeIcon } from "@/components/Icons";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const SIDEBAR_NAV_LINKS = [
  {
    icon: <ProfileIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/profile",
    label: "Perfil",
  },
  {
    icon: <CommunityIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />,
    href: "/home",
    label: "Inicio",
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
    <aside className={"max-sm:hidden w-full sm:max-w-xs transition duration-300 "+(status === 'loading'? "opacity-0" : "opacity-100")}>
      <div className="flex flex-col gap-5 bg-[#27b53C] bg-gradient-to-tr from-green-700 to-green-500 fixed h-[100dvh] px-5 pt-5 w-full max-w-xs">
        
        <div className="flex flex-col text-center text-white pr-8 select-none">
          <span className="flex items-center gap-1 text-3xl font-semibold mx-auto">
            <EcosLogo size={"1.3em"} className={"-mt-0.5 fill-white"} />
            Ecos
          </span>
        </div>

        <hr className="border-white/30" />

        <Link href={`/${session?.user?.username}`} className="flex gap-3 items-center pl-6">
          <Image
            src={session?.user?.image || "/img/profile_default.webp"}
            alt="profile"
            className="h-14 w-14 rounded-full"
            width={100}
            height={100}
            unoptimized
          />
          <div className="flex flex-col w-full truncate">
            <span className="font-bold text-white truncate">
              {session?.user?.name}
            </span>
            <span className="text-sm font-medium text-white truncate opacity-50">
              @{session?.user?.username}
            </span>
          </div>
        </Link>

        <hr className="border-white/30" />

        <ul className="flex flex-col gap-3 font-semibold text-white text-lg">
          {SIDEBAR_NAV_LINKS.map((link) => {
            const isActive = link.href === pathname;

            return (
              <li
                key={link.label}
                className={`group active:scale-95 hover:bg-white hover:text-[#27b53C] rounded-full transition duration-150 px-5 ${isActive && "bg-white text-[#27b53C] fillIcon"}`}
              >
                <Link href={link.href === "/profile" ? "/" + session?.user?.username : link.href} className=" flex gap-4 items-center p-4">
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => signOut()}
          className="group flex gap-3 items-center px-9 py-4 rounded-full mt-10 hover:bg-white hover:text-[#27b53C] font-semibold text-white text-lg transition duration-150"
        >
          <LogoutIcon size={28} className="fill-white group-hover:fill-[#27b53C]" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
