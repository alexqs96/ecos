'use client'

import { EcosLogo } from "@/components/Icons"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiChevronLeft } from "react-icons/fi"

function GardenPage({ slug }) {
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['garden'],
    queryFn: async () => {
      return await fetch("/api/users/garden/" + slug).then(res => res.json())
    }
  })

  const calculateTotal = (data) => {
    const total = data.reduce((acc, item) => acc + (item.quantity * item.data.space), 0);
    return parseFloat(total).toFixed(2);
  };

  const getSizeText = (space, qty, single) => {
    const data = !single ? parseFloat(space * qty).toFixed(2) : !space % 1 ? parseFloat(space).toFixed(2) : space
    if (data < 1) {
      return data + " Cm"
    }
    else if (data === 1) {
      return data + " Metro"
    }
    else if (data > 1) {
      return data + " Metros"
    }
  }

  const harvestPlant = async (id, harvestStatus) => {
    setLoading(true)
    const index = data.vegetables.findIndex(veg => veg._id === id)

    if (index !== -1) {
      let vegetables = data.vegetables
      vegetables[index].harvested = !harvestStatus

      const res = await fetch(`/api/users/garden/${data._id}`, {
        method: "PUT",
        body: JSON.stringify(
          {
            vegetables
          }
        )
      })

      if (res.status === 200) {
        queryClient.invalidateQueries('garden');
      }
    }
    setLoading(false)
  }

  if (error) {
    return <main className="w-full">
      Este jardin no existe
    </main>
  }

  return (
    <main className="w-full pb-5 px-5 flex flex-col gap-5">
      {
        isLoading ?
          <p>Cargando...</p>
          :
          <>
            <div className="flex items-center gap-5 sticky top-0 bg-white py-5 border-b text-[#27b53C]">
              <Link href="/garden">
                <FiChevronLeft size={"1.5em"} />
              </Link>
              <h1 className="text-2xl font-semibold">{data?.name}</h1>
            </div>

            <Image
              className="w-full h-full aspect-video max-h-[356px] object-cover rounded-xl"
              src={data.image || "/img/gardenPreview.webp"}
              width={256}
              height={128}
              alt={"Foto de "+data.name}
              unoptimized
            />

            <div className="flex flex-col">
              <h2 className="font-semibold">Detalles</h2>
              <span className="font-medium">Medidas: {data?.width} Metros / {data?.height} Metros</span>
              <span className="font-medium">Espacio Usado: {calculateTotal(data.vegetables)} / {(data.width + data.height)} Metros</span>
            </div>

            <span className="text-xl font-semibold">Mis Plantas</span>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {
                data?.vegetables?.map(e => (
                  <Link
                    href={"/plants/" + e.data.slug}
                    key={e._id}
                    className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                  >
                    {VegetablesIcons[e.data.icon]}
                    <span className="font-medium">{e.data.name}</span>
                    <div className="flex flex-col px-2 text-center -mt-4">
                      <small className="font-medium">{getSizeText(e.data.space, 1, true)} C/Planta</small>
                      <small className="font-medium">{e.quantity} Plantas / {getSizeText(e.data.space, e.quantity)}</small>
                    </div>
                    <span className="p-1 bg-green-200 text-green-800 -mt-3 px-5 rounded-md">Mas info</span>
                  </Link>
                ))
              }
            </div>

            <span className="text-xl font-semibold">Mis Cosechas</span>
            <p className="-mt-3">Haz clic en el botón <strong>Plantado</strong> para indicar si ya has cosechado la planta.</p>
            <div className="flex items-center gap-2 border py-2 px-3 rounded-xl w-fit -mt-3">
              <EcosLogo size={"1.2em"} />
              <small className="font-medium">La comunidad podra ver cuando cosechaste una planta para realizar intercambios!</small>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {
                data?.vegetables?.map((e) => (
                  <div
                    key={e._id}
                    className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                  >
                    {VegetablesIcons[e.data.icon]}
                    <span className="font-medium">{e.data.name}</span>
                    <button
                      disabled={loading}
                      onClick={() => harvestPlant(e._id, e.harvested)}
                      type="button"
                      className={"p-1 -mt-3 px-5 rounded-md " + (e.harvested ? "bg-green-200 text-green-800" : "bg-yellow-100 text-yellow-700") + (loading ? " animate-pulse" : "")}
                    >
                      {e.harvested ? "Cosechado" : "Plantado"}
                    </button>
                  </div>
                ))
              }
            </div>
          </>
      }
    </main>
  )
}

export default GardenPage