'use client'

import { FilterIcon, GardenIcon, LightBulbIcon } from "@/components/Icons"
import { GardenFormSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FiChevronLeft, FiSearch } from "react-icons/fi"
import { useQuery } from "@tanstack/react-query"
import { VegetablesIcons } from "@/components/VegetablesIcons"

function GardenPage() {
  const data = []
  const {data: vegetables, isLoading: isLoadingVegs} = useQuery({
    queryKey: ['vegetables'],
    queryFn: async () => {
      return await fetch("/api/garden").then(res => res.json())
    }
  })
  const [page, setPage] = useState(0)
  const [storeVegs, setStoreVegs] = useState([])
  const search = useRef(null)
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      width: 0,
      height: 0,
      vegetables: [{
        slug: "",
        quantity: 1,
        space: 1
      }]
    },
    resolver: zodResolver(GardenFormSchema),
  });

  const goBack = () => {
    setPage(1)
    setStoreVegs(getValues('vegetables'))
    setValue('vegetables', [{
      slug: "",
      quantity: 1,
      space: 1
    }])
  }

  const addItems = (slug, space) => {
    let data = getValues('vegetables').filter(e => e.slug !== "");
  
    const itemIndex = data.findIndex(item => item.slug === slug);
  
    if (itemIndex !== -1) {
      console.log("Sacaste " + slug);
      data = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
    } else {
      console.log("Agregaste " + slug);
      const newItem = { slug, quantity: 1, space }; // Establece la cantidad inicial a 1 o cualquier otro valor predeterminado
      data = [...data, newItem];
    }
  
    setValue('vegetables', data);
    console.log(data);
  };

  const calculateTotal = () => {
    const data = getValues('vegetables');
    const total = data.reduce((acc, item) => acc + (item.quantity * item.space), 0);
    return Math.ceil(total);
  };

  const incrementQuantity = (slug) => {
    const data = getValues('vegetables').map(item =>
      item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
    );

    const newTotal = calculateTotal();
    if (newTotal < (watch('width')+watch('height'))) {
      setValue('vegetables', data);
    }
    console.log(data);
  };

  const decrementQuantity = (slug) => {
    const data = getValues('vegetables').map(item =>
      item.slug === slug ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );

    const newTotal = calculateTotal();
    if (newTotal <= (watch('width')+watch('height'))) {
      setValue('vegetables', data);
    }
    console.log(data);
  };

  const onSubmit = async (data) => {
    if (page === 1) {
      setValue('vegetables', [])
    }
    if (page === 2) {
      setPage(3)
    }
    else
    {
      setPage(2)
    }
    console.log(data);
  };

  return (
    <main className="flex flex-col gap-2 w-full p-5">
      <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3">
        <GardenIcon size={"1.2em"} className={"fill-[#27b53C]"} />
        Mi Huerta {watch('name')? "/ "+watch('name') : ""}
      </h1>
      <div className="flex">
        <p onClick={() => setPage(0)}>0</p>
        <p onClick={() => setPage(1)}>1</p>
        <p onClick={() => setPage(2)}>2</p>
        <p onClick={() => setPage(3)}>3</p>
      </div>

      <hr className="border-b border-t-0" />

      <section className="flex gap-10">
        {
            isLoadingVegs ?
            <span>Cargando...</span>
            :
            !data.length && page === 0 ?
              <section className="h-[40dvh] flex flex-col mt-16 w-full">
                <div className="text-center">
                  <h2 className="text-5xl font-semibold mb-3">¡Aún no hay Jardines!</h2>
                  <h3 className="font-medium text-lg text-black/80">Crea tu Jardin haciendo click en <b>Agregar Jardín</b>!</h3>
                </div>

                <button
                  onClick={() => setPage(1)}
                  className="block shadow-transparent hover:shadow-2xl hover:shadow-green-700/20 font-medium mt-auto ml-auto py-1.5 px-3.5 rounded-lg bg-[#27b53C] text-white text-lg transition-all duration-200 active:scale-95"
                >
                  Agregar Jardin
                </button>
              </section>
              :
              page === 0 ?
                <section className="flex flex-col w-full">
                  tus jardines

                  <button
                    onClick={() => setPage(1)}
                    className="block shadow-transparent hover:shadow-2xl hover:shadow-green-700/20 font-medium mt-auto ml-auto py-1.5 px-3.5 rounded-lg bg-[#27b53C] text-white text-lg transition-all duration-200 active:scale-95"
                  >
                    Agregar Jardin
                  </button>
                </section>
                :
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full"
                >
                  {
                    page === 1 ?
                      <section className="flex flex-col gap-3 w-full shadow-xl p-8 rounded-2xl max-w-lg mx-auto mt-16">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-2xl">Crea tu Huerta</span>
                          <small>1/3</small>
                        </div>

                        <div className="flex flex-col w-full">
                          <label className="font-medium">Mi Jardin se llama..</label>
                          <input
                            placeholder="Aa.."
                            {...register("name")}
                            type="text"
                            className="border rounded-xl py-1.5 px-2.5 w-full focus:outline-none focus:border-[#27b53C] focus:ring-1 focus:ring-[#27b53C] "
                          />
                          {errors.name ? (
                            <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-xl text-sm mt-1.5 w-fit">
                              {errors.name ? "Completa este campo" : null}
                            </span>
                          ) : null}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-3">
                          <div className="flex flex-col w-full">
                            <label className="font-medium">Ancho <small>(Metros)</small></label>
                            <input
                              placeholder="Aa.."
                              {...register("width", { valueAsNumber: true })}
                              type="number"
                              className="border rounded-xl py-1.5 px-2.5 w-full focus:outline-none focus:border-[#27b53C] focus:ring-1 focus:ring-[#27b53C] "
                            />
                            {errors.width ? (
                              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-xl text-sm mt-1.5 w-fit">
                                {errors.width.message ? "Completa este campo" : null}
                              </span>
                            ) : null}
                          </div>

                          <div className="flex flex-col w-full">
                            <label className="font-medium">Altura <small>(Metros)</small></label>
                            <input
                              placeholder="Aa.."
                              {...register("height", { valueAsNumber: true })}
                              type="number"
                              className="border rounded-xl py-1.5 px-2.5 w-full focus:outline-none focus:border-[#27b53C] focus:ring-1 focus:ring-[#27b53C] "
                            />
                            {errors.height ? (
                              <span className="bg-red-100 text-red-500 py-0.5 px-2 rounded-xl text-sm mt-1.5 w-fit">
                                {errors.height.message ? "Completa este campo" : null}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        {errors.vegetables ? "Elegi una verdura" : null}
                        <div className="flex justify-between gap-5 mt-3">
                          <button type="button" onClick={() => setPage(0)} className="py-1.5 px-3 bg-green-300 font-medium rounded-xl text-green-800">Cancelar</button>
                          <button
                            onClick={() => storeVegs.length > 0? setValue('vegetables', storeVegs) : null}
                            disabled={isSubmitting}
                            type="submit"
                            className="py-1.5 px-3 bg-green-600 font-medium rounded-xl text-white"
                          >
                          Continuar
                          </button>
                        </div>

                      </section>
                      :
                      page === 2 ?
                        <section className="flex flex-col w-full gap-5">
                          <div className="w-full flex justify-between gap-10 items-center bg-green-400/20 p-5 rounded-2xl text-lg">
                            <button type="button" onClick={() => goBack()}>
                              <FiChevronLeft size={"1.5em"} />
                            </button>

                            <div className="flex items-center w-full max-w-xs overflow-hidden border-2 rounded-2xl bg-white focus-within:border-green-600">
                              <button type="button" className="px-2">
                                <FiSearch size={"1.2em"} />
                              </button>
                              <input ref={search} type="text" className="py-1 pr-3 outline-none w-full" />
                            </div>

                            <button
                              className="flex border items-center gap-0.5 py-1.5 px-4 rounded-2xl bg-white font-medium"
                              type="button"
                            >
                              Filtrar
                              <FilterIcon />
                            </button>

                          </div>
                          {
                            watch('vegetables').length > 0?
                            <div className="flex flex-col">
                              <span>Ancho: {watch('width')} Metros</span>
                              <span>Altura: {watch('height')} Metros</span>
                              <p>Espacio Ocupado: {calculateTotal()} de {watch('width') + watch('height')}</p>
                            </div>
                            :
                            <div className="flex items-center gap-5 text-lg max-w-md font-medium opacity-80 rounded-3xl border p-3.5 mx-auto">
                              <LightBulbIcon size={"3em"} />
                              <p>Elegi las frutas o verduras que deseas cultivar.</p>
                            </div>
                          }

                          {errors.vegetables ? "Elegi Verduras" : null}
                          <button disabled={isSubmitting} type="submit" className="py-1.5 px-3 bg-green-600 font-medium rounded-xl text-white">Continuar</button>

                          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                            {
                              vegetables.map(e => (
                                <div
                                  key={e.slug}
                                  className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                                >
                                  {VegetablesIcons[e.icon]}
                                  <span className="font-medium">{e.name}</span>
                                  <div className={"grid grid-cols-[30%_40%_30%] text-center w-[70%] mx-auto border rounded-lg overflow-hidden -my-3"+(watch("vegetables").find(item => item.slug === e.slug)? "" : " opacity-30")}>
                                    <button
                                      onClick={() => decrementQuantity(e.slug)}
                                      type="button"
                                    >
                                      -
                                    </button>
                                    <span className="border-x block w-full">{watch("vegetables").find(item => item.slug === e.slug)?.quantity || "0"}</span>
                                    <button
                                      className="w-full text-center"
                                      onClick={() => incrementQuantity(e.slug)}
                                      type="button"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => addItems(e.slug, e.space)}
                                    className={"font-medium py-1.5 px-3 rounded-lg w-[70%] "+(watch("vegetables").find(item => item.slug === e.slug)? "danger" : "bg-green-500 text-white")}
                                  >
                                  {watch("vegetables").find(item => item.slug === e.slug)? "Quitar" : "Agregar"}
                                  </button>
                                </div>
                              ))
                            }
                          </div>

                        </section>
                        :
                        <section className="flex flex-col w-full">
                          
                          {JSON.stringify(watch("width"))+" Metros"}
                          {JSON.stringify(watch("vegetables"))}
                        </section>
                  }
                </form>
        }

        <aside className="max-w-xs w-full">
          <div className="fixed w-full max-w-xs h-[100dvh] border-l px-5">
            <span className="text-[#27b53C] text-2xl font-medium block text-center my-3">Medallas</span>
            <div className="bg-green-100 px-10 py-20 rounded-3xl">

            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default GardenPage