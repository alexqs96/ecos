'use client'

import { TradeIcon } from "@/components/Icons"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery } from "@tanstack/react-query"

export default function TradeDetails({ slug }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['trading'],
    queryFn: async () => {
      return await fetch(`/api/users/trade/${slug}`).then(res => res.json())
    }
  })

  return (
    <>
      <main className="w-full p-5 flex flex-col gap-5">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3">
          <TradeIcon size={"1.2em"} className={"fill-[#27b53C]"} />
          Intercambiar con @{slug}
        </h1>
        {
          isLoading ?
            <p>Cargando Jardines</p>
            :
            error ?
              <p>Hubo un error al traer las cosechas</p>
              :
              !data ?
                <p>El usuario seleccionado no existe.</p>
                :
                <>
                  <span>Tus Cosechas</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2.5">
                    {
                      data?.you.length > 0 ?
                        data?.you?.map((e, index) => (
                          <div
                            style={{ animationDelay: `${index * 0.15}s` }}
                            key={e._id}
                            className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                          >
                            {VegetablesIcons[e.data.icon]}
                            <span className="text-lg font-medium">{e.data.name}</span>
                          </div>
                        ))
                        :
                        <fieldset className="py-2 px-3.5 rounded-lg border shadow-lg w-fit col-span-full">
                          <legend className="px-3 font-semibold text-lg">Eco-Tip!</legend>
                          <p className="mb-1 -mt-1">Si cosechaste alguna planta, recorda marcarla como <strong>Cosechado</strong> desde <strong>Mi Huerta</strong></p>
                        </fieldset>
                    }
                  </div>

                  <span>Las Cosechas de @{slug}</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2.5">
                    {
                      data?.other.length > 0 ?
                      data?.other?.map((e, index) => (
                        <div
                          style={{ animationDelay: `${index * 0.15}s` }}
                          key={e._id}
                          className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                        >
                          {VegetablesIcons[e.data.icon]}
                          <span className="text-lg font-medium">{e.data.name}</span>
                        </div>
                      ))
                      :
                      <fieldset className="py-2 px-3.5 rounded-lg border shadow-lg w-fit col-span-full">
                        <legend className="px-3 font-semibold text-lg">Eco-Info!</legend>
                        <p className="mb-1 -mt-1">El usuario @{slug} no tiene cosechas para intercambiar.</p>
                      </fieldset>
                    }
                  </div>
                </>
        }
      </main>
    </>
  )
}
