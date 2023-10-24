import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import DarkModeProvider from '@/components/DarkMode'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecos',
  description: 'Proyecto Ecos, Pescar Santander 2023',
  alternates: {
    canonical: '/',
  },
  openGraph:{
    type: "website",
    url: "https://eco-s.vercel.app",
    title: "Ecos",
    siteName: "Ecos",
    description: 'Proyecto Ecos, Pescar Santander 2023',
    images: "/og_image.png"
  },
  twitter: {
    card: "summary_large_image",
    site: "@ecospescar",
    creator: "@ecospescar",
  },
  themeColor: "transparent",
  metadataBase: new URL("https://eco-s.vercel.app"),
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true} className='scroll-smooth h-full'>
      <body className={inter.className + " bg-white dark:bg-black transition-[background-color] h-full"}>
        <DarkModeProvider>
        <Header />
        <div className='max-w-screen-2xl mx-auto px-[1%] h-full flex'>
        {children}
        </div>
        </DarkModeProvider>
      </body>
    </html>
  )
}
