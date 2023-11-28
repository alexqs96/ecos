'use client'

import ContactsSidebar from "@/components/ContactsSidebar"
import { TradeIcon } from "@/components/Icons"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Link from "next/link"

function TradePage() {
  const {data: session } = useSession()
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 mt-2.5">
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
                          <Link
                            href={"/chats/"+(e.from?.user?.username === session?.user?.username? e.to?.user?.username : e.from?.user?.username)+"?view=trades"}
                            style={{ animationDelay: `${index * 0.15}s` }}
                            key={e._id}
                            className="w-full appear flex justify-between items-center gap-5 border p-5 rounded-xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <small className="font-medium">De {e.from?.user?.username === session?.user?.username? "Vos" : e.from?.user?.username}</small>
                              {"->"}
                              <small className="font-medium">Hacia {e.to?.user?.username === session?.user?.username? "Vos" : e.to?.user?.username}</small>
                            </div>

                            <div>
                              {
                                e.decline?
                                <span className="py-1 px-2.5 rounded-md danger">Cancelado</span>
                                :
                                e.accepted.you && e.accepted.other?
                                <span className="py-1 px-2.5 rounded-md bg-green-200 text-green-700">Finalizado</span>
                                :
                                <span className="py-1 px-2.5 rounded-md bg-yellow-200 text-yellow-700">Pendiente</span>
                              }
                            </div>
                          </Link>
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