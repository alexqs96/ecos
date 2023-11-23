'use client'
import { GardenIcon, HeartIcon, LogoutIcon, MessageIcon, PlantIcon, ProfileIcon, TradeIcon } from "@/components/Icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_NAV_LINKS = [
  {
    icon: <ProfileIcon  size={24} className={`fill-white `}  />,
    href: "/profile",
    label: "Perfil",
  },
  {
    icon: <TradeIcon   size={24} className="fill-white" />,
    href: "/trade",
    label: "Intercambios",
  },
  {
    icon: <PlantIcon  size={24} className="fill-white" />,
    href: "/plants",
    label: "Plantas",
  },
  {
    icon: <GardenIcon size={24} className="fill-white"/>,
    href: "/garden",
    label: "Mi huerta",
  },
  {
    icon: <MessageIcon  size={24} className="fill-white" />,
    href: "/chats",
    label: "Mensajes",
  },
  {
    icon: <HeartIcon  size={24} className="fill-white"/>,
    href: "/favorites",
    label: "Mis favoritos",
  }
];


const SideNavbar = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession();

  return (
    <nav className="max-sm:hidden md:min-w-[300px] lg:max-w-[353px] py-5 bg-[#27b53C]">
      <div className="flex flex-col gap-5 fixed top-0">
        <Link href={`/profile`} className="flex gap-3 items-center pl-[14%]">
          <img
            // src={`${session?.user?.image} || "/avatar.svg"`}
            src="./avatar.svg"
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold font-bold text-white">
              {session?.user?.name}
            </p>
            <p className="text-sm font-normal text-white">
              @{session?.user?.name}
            </p>
          </div>
        </Link>
        <hr className="w-[255px] ml-[14.8%] " />
        <ul className="flex flex-col gap-6 font-semibold text-white">
          {SIDEBAR_NAV_LINKS.map((link) => {
            const isActive = link.href === pathname;

            return (
              <li
                key={link.label}
                className={` group hover:bg-white rounded-full  ${
                  isActive && "bg-white text-[#27b53C]"
                } pl-[12.5%] `}
              >
                <Link href={link.href} className="flex gap-4 items-center p-4">
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => signOut()}
        className="flex gap-3 items-center pl-[17%] py-12"
      >
        <LogoutIcon size={24} className="fill-white"/>
        <p className="font-regular text-white">Salir</p>
      </button>
    </nav>
  );
};

export default SideNavbar;
