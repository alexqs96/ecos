import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ecos',
  description: 'Proyecto Ecos, Pescar Santander 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <main>
      {children}
      </main>
      </body>
    </html>
  )
}
