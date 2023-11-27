import "@/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import SideNavbar from "./home/SideNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecos",
  description: "Proyecto Ecos, Pescar Santander 2023",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://eco-s.vercel.app",
    title: "Ecos",
    siteName: "Ecos",
    description: "Proyecto Ecos, Pescar Santander 2023",
    images: "/og_image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ecospescar",
    creator: "@ecospescar",
  },
  themeColor: "transparent",
  metadataBase: new URL("https://eco-s.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className + " bg-white max-w-screen-[1920px] mx-auto"}>
        <Providers>
          <section className="flex">
          <SideNavbar />
          {children}
          </section>
        </Providers>
      </body>
    </html>
  );
}
