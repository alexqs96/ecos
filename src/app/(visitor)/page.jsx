import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-fit gap-2">
      <p>Aca iria un landing</p>
      <Link href="/signin" className="text-red-500">Ingresar</Link>
      <Link href="/signup" className="text-blue-500">Unirme</Link>
    </div>
  )
}
