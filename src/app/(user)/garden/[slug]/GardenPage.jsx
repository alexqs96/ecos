'use client'

import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { FiChevronLeft } from "react-icons/fi"

function GardenPage({slug}) {
  const {data, isFetching} = useQuery({
    queryKey: ['gardens'],
    queryFn: async () => {
      return await fetch("/api/users/garden/"+slug).then(res => res.json())
    }
  })

  const calculateTotal = (data) => {
    const total = data.reduce((acc, item) => acc + (item.quantity * item.data.space), 0);
    return parseFloat(total).toFixed(2);
  };

  const getSizeText = (space, qty, single) => {
    const data = !single? parseFloat(space * qty).toFixed(2) : !space % 1? parseFloat(space).toFixed(2) : space
    if(data < 1)
    {
      return data+" Cm"
    }
    else if (data === 1) {
      return data+" Metro"
    }
    else if (data > 1) {
      return data+" Metros"
    }
  }

  if (isFetching) {
    return <p>Cargando...</p>
  }

  if (!data) {
    return <p>Este jardin no existe</p>
  }

  return (
    <main className="w-full p-5">
      <Link href="/garden">
        <FiChevronLeft size={"1.5em"} />
      </Link>

      <h1 className="text-xl font-semibold">Jardin: {data?.name}</h1>
      <div className="flex flex-col">
        <h2 className="font-semibold">Detalles</h2>
        <span className="font-medium">Medidas: {data?.width} Metros / {data?.height} Metros</span>
        <span className="font-medium">Espacio Usado: {calculateTotal(data.vegetables)} / {(data.width + data.height)} Metros</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
      {
        data?.vegetables?.map(e => (
        <Link
          href={"/plants/"+e.data.slug}
          key={e._id}
          className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
        >
          {VegetablesIcons[e.data.icon]}
          <span className="font-medium">{e.data.name}</span>
          <div className="flex flex-col px-2 text-center -mt-4">
            <small className="font-medium">{getSizeText(e.data.space,1,true)} C/Planta</small>
            <small className="font-medium">{e.quantity} Plantas / {getSizeText(e.data.space, e.quantity)}</small>
          </div>
          <span className="p-1 bg-green-200 text-green-800 -mt-3 px-5 rounded-md">Mas info</span>
          </Link>
        ))
      }
      </div>
    </main>
  )
}

export default GardenPage