'use client'

import { TradeIcon } from "@/components/Icons"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import { useState } from "react"

export default function TradeDetails({ slug }) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false)
  const [myVegs, setMyVegs] = useState([])
  const [otherVegs, setOtherVegs] = useState([])

  const { data, error, isLoading } = useQuery({
    queryKey: ['trading'],
    queryFn: async () => {
      return await fetch(`/api/users/trade/${slug}`).then(res => res.json())
    }
  })

  const startTrade = async () => {
    setLoading(true)
    try {
      if (myVegs.length > 0 && otherVegs.length > 0) {
        const res = await fetch(`/api/users/trade/${slug}`, {
          method: "POST",
          body: JSON.stringify({
            yourVegetables: myVegs,
            otherVegetables: otherVegs
          })
        })

        if (res.status === 200) {
          push("/chats/"+slug+"?view=trades")
        }

      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  const checkItemInList = (id, option) => {
    if (option) {
      return otherVegs.find(e => e.data === id)? true : false
    }
    return myVegs.find(e => e.data === id)? true : false
  }

  const viewQty = (id, option) => {
    if (option) {
      return otherVegs.find(e => e.data === id)?.quantity || 0
    }

    return myVegs.find(e => e.data === id)?.quantity || 0
  }

  const addMyItems = (id, option) => {
    if (option) {
      if (checkItemInList(id, true)) {
        setOtherVegs(otherVegs.filter(e => e.data !== id))
      }
      else
      {
        setOtherVegs([...otherVegs, {data: id, quantity: 1}])
      }
    }else{
      if (checkItemInList(id)) {
        setMyVegs(myVegs.filter(e => e.data !== id))
      }
      else
      {
        setMyVegs([...myVegs, {data: id, quantity: 1}])
      }
    }
  }

  const decrementQuantity = (id, option) => {
    if (option) {
      const dataCopy = [...otherVegs];
      const index = dataCopy.findIndex(e => e.data === id);
    
      if (index !== -1) {
        dataCopy[index].quantity = dataCopy[index].quantity - 1;
    
        if (dataCopy[index].quantity < 1) {
          setOtherVegs(dataCopy.filter(e => e.data !== id));
        } else {
          setOtherVegs(dataCopy); // Directly use dataCopy
        }
      }
    }else{
      const dataCopy = [...myVegs];
      const index = dataCopy.findIndex(e => e.data === id);
    
      if (index !== -1) {
        dataCopy[index].quantity = dataCopy[index].quantity - 1;
    
        if (dataCopy[index].quantity < 1) {
          setMyVegs(dataCopy.filter(e => e.data !== id));
        } else {
          setMyVegs(dataCopy); // Directly use dataCopy
        }
      }
    }
  };
  
  const incrementQuantity = (id, limit, option) => {
    if (option) {
      const dataCopy = [...otherVegs];
      const index = dataCopy.findIndex(e => e.data === id);
    
      if (index !== -1 && dataCopy[index].quantity < limit) {
        dataCopy[index].quantity = dataCopy[index].quantity + 1;
    
        setOtherVegs(dataCopy);
      }
    }else{
      const dataCopy = [...myVegs];
      const index = dataCopy.findIndex(e => e.data === id);
    
      if (index !== -1 && dataCopy[index].quantity < limit) {
        dataCopy[index].quantity = dataCopy[index].quantity + 1;
    
        setMyVegs(dataCopy);
      }
    }
  };
  
  return (
    <>
      <main className="w-full p-5 flex flex-col gap-5">
        <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C]">
          <TradeIcon size={"1.2em"} className={"fill-[#27b53C]"} />
          Intercambiar con @{slug}
        </h1>

        <span className="text-xl font-semibold -mb-2.5">Mis Cosechas</span>
        <p className="font-medium">Selecciona tus plantas a ofrecer para el intercambio con @{slug}</p>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                      data?.you?.length > 0 ?
                        data?.you?.map((e, index) => (
                          <div
                            style={{ animationDelay: `${index * 0.15}s` }}
                            key={e._id}
                            className={(checkItemInList(e._id)? "border-green-600" : "")+" border w-full appear aspect-square flex flex-col items-center justify-center gap-5 py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"}
                          >
                            {VegetablesIcons[e.data.icon]}
                            <span className="text-lg text-center font-medium truncate w-full px-2">{e.data.name}</span>
                            <div className={"grid grid-cols-[30%_40%_30%] text-center w-[70%] mx-auto border rounded-lg overflow-hidden -my-3"+(checkItemInList(e._id)? "" : " opacity-30")}>
                              <button
                                onClick={() => decrementQuantity(e._id)}
                                type="button"
                              >
                                -
                              </button>
                              <span className="border-x block w-full">{viewQty(e._id)} / {e.quantity}</span>
                              <button
                                className="w-full text-center"
                                onClick={() => incrementQuantity(e._id, e.quantity)}
                                type="button"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => addMyItems(e._id)}
                              className={"py-1 px-3 rounded-lg font-medium "+(checkItemInList(e._id)? "danger" : "bg-green-200 text-green-800")}
                            >
                              {checkItemInList(e._id)? "Quitar" : "Agregar"}
                            </button>
                          </div>
                        ))
                        :
                        <fieldset className="py-2 px-3.5 rounded-lg border shadow-lg w-fit col-span-full">
                          <legend className="px-3 font-semibold text-lg">Eco-Tip!</legend>
                          <p className="mb-1 -mt-1">Si cosechaste alguna planta, recorda marcarla como <strong>Cosechado</strong> desde <strong>Mi Huerta</strong></p>
                        </fieldset>
                    }
                  </div>

                  <span className="text-xl font-semibold">Cosechas de @{slug}</span>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                      data?.other?.length > 0 ?
                      data?.other?.map((e, index) => (
                        <div
                          style={{ animationDelay: `${index * 0.15}s` }}
                          key={e._id}
                          className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                        >
                          {VegetablesIcons[e.data.icon]}
                          <span className="text-lg text-center font-medium truncate w-full px-2">{e.data.name}</span>
                          <div className={"grid grid-cols-[30%_40%_30%] text-center w-[70%] mx-auto border rounded-lg overflow-hidden -my-3"+(checkItemInList(e._id, true)? "" : " opacity-30")}>
                              <button
                                onClick={() => decrementQuantity(e._id, true)}
                                type="button"
                              >
                                -
                              </button>
                              <span className="border-x block w-full">{viewQty(e._id, true)} / {e.quantity}</span>
                              <button
                                className="w-full text-center"
                                onClick={() => incrementQuantity(e._id, e.quantity, true)}
                                type="button"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => addMyItems(e._id, true)}
                              className={"py-1 px-3 rounded-lg font-medium "+(checkItemInList(e._id, true)? "danger" : "bg-green-200 text-green-800")}
                            >
                              {checkItemInList(e._id, true)? "Quitar" : "Agregar"}
                            </button>
                        </div>
                      ))
                      :
                      <fieldset className="py-2 px-3.5 rounded-lg border shadow-lg w-fit col-span-full">
                        <legend className="px-3 font-semibold text-lg">Eco-Alerta!</legend>
                        <p className="mb-1 -mt-1 font-medium">Oops @{slug} no tiene cosechas para intercambiar.</p>
                      </fieldset>
                    }
                  </div>
                </>
        }
        {
          data?.other?.length > 0 && data?.you?.length > 0?
          <button
            onClick={() => startTrade()}
            disabled={loading}
            className="block shadow-transparent hover:shadow-2xl hover:shadow-green-700/20 font-medium py-1.5 px-3.5 rounded-lg bg-[#27b53C] text-white text-lg transition-all duration-200 active:scale-95 w-fit"
          >
            {loading? "Solicitando..." : "Solicitar Intercambio"}
          </button>
          :
          null
        }
      </main>
    </>
  )
}
