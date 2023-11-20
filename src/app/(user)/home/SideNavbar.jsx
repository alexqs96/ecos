'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SIDEBAR_NAV_LINKS = [
  {
    icon: "/profile.svg",
    href: "/profile",
    label: "Perfil",
  },
  {
    icon: "/trade.svg",
    href: "/trade",
    label: "Intercambios",
  },
  {
    icon: "/plants.svg",
    href: "/plants",
    label: "Plantas",
  },
  {
    icon: "/garden.svg",
    href: "/garden",
    label: "Mi huerta",
  },
  {
    icon: "/message.svg",
    href: "/message",
    label: "Mensajes",
  },
  {
    icon: "/heart.svg",
    href: "/favorites",
    label: "Mis favoritos",
  }
];


const SideNavbar = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession();

  return (
    <nav className="max-sm:hidden md:min-w-[300px] lg:max-w-[353px] py-5 bg-[#27b53C]">
      <div className="flex flex-col gap-5">
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
                className={`leftsidebar-link group ${
                  isActive && "bg-white text-[#27b53C]"
                } pl-[12.5%]`}
              >
                <Link href={link.href} className="flex gap-4 items-center p-4">
                  <img
                    src={link.icon}
                    width={28}
                    height={28}
                    alt={link.label}
                    className={`group-hover:invert-black fill-white ${
                      isActive && "invert-green"
                    }`}
                  />
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
        <img height={28} width={28} src="/logout.svg" alt="logout" className="fill-white"/>
        <p className="font-regular text-white">Salir</p>
      </button>
    </nav>
  );
};

export default SideNavbar;
