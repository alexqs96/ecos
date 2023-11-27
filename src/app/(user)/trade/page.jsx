'use client'

import ContactsSidebar from "@/components/ContactsSidebar"
import { TradeIcon } from "@/components/Icons"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery } from "@tanstack/react-query"

function TradePage() {
  const { data: yourItems, error: yourItemsError, isLoading: yourItemsLoading } = useQuery({
    queryKey: ['tradeMine'],
    queryFn: async () => {
      return await fetch("/api/users/trade/harvest").then(res => res.json())
    }
  })

  const { data: yourTrades, error: yourTradesError, isLoading: yourTradesLoading } = useQuery({
    queryKey: ['trades'],
    queryFn: async () => {
      return await fetch("/api/users/trade").then(res => res.json())
    }
  })

  return (
    <>
      <main className="flex flex-col w-full p-5">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3">
          <TradeIcon size={"1.2em"} className={"fill-[#27b53C]"} />
          Intercambios
        </h1>

        <div className="flex flex-col gap-10 mt-3">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-semibold">Tus Plantas</h2>
            <p className="font-medium">La comunidad podra elegir entre tus plantas cosechadas para realizar un intercambio!</p>
            {
              yourItemsError ?
                <span className="text-lg font-medium">Hubo un error al traer tus plantas, porfavor ingresa mas tarde.</span>
                :
                yourItemsLoading ?
                  <span className="text-lg font-medium animate-pulse">Cargando tus plantas cosechadas...</span>
                  :
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-2.5">
                    {
                      yourItems.length > 0 ?
                        yourItems?.map((e, index) => (
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
            }
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-semibold">Mis Intercambios</h2>
            <p className="font-medium">Aca veras tus intercambios realizados o por realizar con la comunidad!</p>

            {
              yourTradesError ?
                <span className="text-lg font-medium">Hubo un error al traer tus plantas, porfavor ingresa mas tarde.</span>
                :
                yourTradesLoading ?
                  <span className="text-lg font-medium animate-pulse">Cargando tus plantas cosechadas...</span>
                  :
                  <div className="flex flex-col gap-5">
                    {
                      yourTrades.length > 0 ?
                        yourTrades?.map((e, index) => (
                          <div
                            style={{ animationDelay: `${index * 0.15}s` }}
                            key={e._id}
                            className="w-full appear flex flex-col items-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                          >
                            <div>
                              <span className="text-lg font-medium">De {e.from?.user?.username}</span>
                              <span className="text-lg font-medium">Hacia {e.to?.user?.username}</span>
                            </div>

                            <div>
                              {
                                e.decline?
                                <span>Cancelado</span>
                                :
                                e.accepted.you && e.accepted.other?
                                <span>Finalizado</span>
                                :
                                <span>Pendiente</span>
                              }
                            </div>
                          </div>
                        ))
                        :
                        <fieldset className="py-2 px-3.5 rounded-lg border shadow-lg w-fit">
                          <legend className="px-3 font-semibold text-lg">Eco-Tip!</legend>
                          <p className="mb-1 -mt-1">Si cosechaste alguna planta, recorda marcarla como <strong>Cosechado</strong> desde <strong>Mi Huerta</strong></p>
                        </fieldset>
                    }
                  </div>
            }
          </div>
        </div>

      </main>
      <ContactsSidebar />
    </>
  )
}

export default TradePage