import "@/globals.css";
import { Roboto } from "next/font/google";
import Providers from "@/components/Providers";

const roboto = Roboto({ subsets: ["latin"], weight:['100','300','400','700'] });

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
      <body className={roboto.className+" w-full mx-auto"}>
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
