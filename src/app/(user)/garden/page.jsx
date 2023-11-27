'use client'

import { FilterIcon, GardenIcon, LightBulbIcon } from "@/components/Icons"
import { GardenFormSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Children, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FiChevronLeft, FiSearch } from "react-icons/fi"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { VegetablesIcons } from "@/components/VegetablesIcons"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import ContactsSidebar from "@/components/ContactsSidebar"
import Image from "next/image"

function GardenPage() {
  const search = useRef(null)
  const queryClient = useQueryClient();
  const [gardenPlants, setGardenPlants] = useState([])
  const [vegsFiltered, setVegsFiltered] = useState(false)
  const {data: gardens, isFetching: isLoadingGardens} = useQuery({
    queryKey: ['gardens'],
    queryFn: async () => {
      return await fetch("/api/users/garden").then(res => res.json())
    }
  })
  const {data: vegetables, isFetching: isLoadingVegs} = useQuery({
    queryKey: ['vegetables'],
    queryFn: async () => {
      return await fetch("/api/garden").then(res => res.json())
    }
  })
  //guarda la pagina y hace un backup de los vegs seleccionados en caso de que se quiera cambiar el nombre del jardin
  const [page, setPage] = useState(0)
  const [storeVegs, setStoreVegs] = useState([])
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      width: 0,
      height: 0,
      vegetables: [{
        id: "",
        slug: "",
        name: "",
        icon: "",
        quantity: 1,
        space:1
      }]
    },
    resolver: zodResolver(GardenFormSchema),
  });

 const filterVegetables = () => {
    const data = vegetables.filter(e => e.name.toLowerCase().includes(search.current.value.toLowerCase()))

    setVegsFiltered(data)
  }

  function generatePlants(arr) {
    const data = arr.flatMap(e => {
      return Array.from({ length: e.quantity }, () => ({
        ...e,
        quantity: 1
      }));
    });

    setGardenPlants(data)
  }
  

  const goBack = () => {
    setPage(1)
    setStoreVegs(getValues('vegetables'))
    setValue('vegetables', [{
      id: "",
      slug: "",
      name: "",
      icon: "",
      quantity: 1,
      space: 1
    }])
  }

  const addItems = (id, slug, name, icon, space) => {
    let data = getValues('vegetables').filter(e => e.slug !== "");
  
    const itemIndex = data.findIndex(item => item.slug === slug);
  
    if (itemIndex !== -1) {
      console.log("Sacaste " + slug);
      data = [...data.slice(0, itemIndex), ...data.slice(itemIndex + 1)];
    } else {
      console.log("Agregaste " + slug);
      const newItem = { id, slug, name, icon, quantity: 1, space }; // Establece la cantidad inicial a 1 o cualquier otro valor predeterminado
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
      generatePlants(watch('vegetables'))
      setPage(3)
    }
    else
    {
      setPage(2)
    }
    if (page === 3) {
      const vegs = data.vegetables.map(e => ({
        data: e.id,
        quantity: e.quantity
      }));

      console.log(vegs);

      const res = await fetch('/api/users/garden', {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          width: data.width,
          height: data.height,
          vegetables: vegs
        })
      })

      console.log(res.status);

      if (res.status === 200) {
        queryClient.invalidateQueries('gardens');
        reset()
        setPage(0)
      }
    }
  };

  return (
    <>
    <Toaster />
    <main className="flex flex-col gap-2 w-full p-5">
      <h1 className="text-3xl font-semibold flex items-center gap-2 text-[#27b53C] mb-3">
        <GardenIcon size={"1.2em"} className={"fill-[#27b53C]"} />
        Mi Huerta {watch('name')? "/ "+watch('name') : null}
      </h1>

      <section className="flex gap-5">
        {
            isLoadingVegs || isLoadingGardens ?
            <span className="w-full">Cargando...</span>
            :
            !gardens.length && page === 0 ?
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
                <section className="flex flex-col w-full gap-5">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 h-fit">
                  {
                    gardens.map((e, index) => (
                      <Link
                        style={{ animationDelay: `${index * 0.15}s` }}
                        href={"/garden/"+e.slug}
                        key={e._id}
                        className="w-full appear max-h-[256px] flex flex-col overflow-hidden border rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                      >
                        <Image
                          className="w-full h-full aspect-video"
                          src={e.image || "/img/gardenPreview.webp"}
                          width={256}
                          height={128}
                          alt={"Foto de "+e.name}
                          unoptimized
                        />
                        <div className="flex flex-col px-4 py-2.5 w-full">
                          <span className="text-xl font-semibold truncate">{e.name}</span>
                          <span className="font-medium truncate">{e.width} x {e.height} Metros</span>
                        </div>
                      </Link>
                    ))
                  }
                  </div>

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
                  className="w-full relative"
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
                          <button type="button" onClick={() => {setPage(0), reset()}} className="py-1.5 px-3  font-medium rounded-xl danger">Cancelar</button>
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
                          <div className="w-full flex justify-between gap-4 xl:gap-10 items-center bg-green-300/20 p-5 rounded-3xl">
                            <button type="button" onClick={() => goBack()}>
                              <FiChevronLeft size={"1.5em"} />
                            </button>

                            <div className="flex items-center w-full max-w-xs overflow-hidden border-2 rounded-2xl bg-white focus-within:border-green-600">
                              <button type="button" className="px-2">
                                <FiSearch size={"1.2em"} />
                              </button>
                              <input ref={search} type="text" onChange={() => filterVegetables()} onKeyDown={e => e.key === "Enter"? null : null} className="py-1 pr-3 outline-none w-full" />
                            </div>

                            <button
                              className="flex border items-center gap-0.5 py-1.5 px-4 rounded-2xl bg-white font-medium opacity-50"
                              type="button"
                            >
                              Filtrar
                              <FilterIcon />
                            </button>

                          </div>
                          
                          {
                            watch('vegetables').length > 0?
                            <div className="flex flex-col bg-white sticky top-0 py-4 z-30 -my-3">
                              <small className="-mb-3 font-semibold">Espacio Restante: </small>
                              <div className="w-full relative mt-4 rounded-lg overflow-hidden border">
                                <div className="bg-green-500 text-transparent py-0.5" style={{width: ((calculateTotal() / (watch('width') + watch('height'))) * 100)+"%"}}>-</div>
                                <small className="absolute inset-0 flex items-center justify-center font-medium">{calculateTotal()} Metros / {watch('width') + watch('height')} Metros</small>
                              </div>
                              <button
                                onClick={() => {errors.vegetables ? toast.error("Elegi Verduras") : null}}
                                disabled={isSubmitting || calculateTotal() < 1}
                                type="submit"
                                className={"ml-auto mt-5 w-fit py-1.5 px-3 bg-green-600 font-medium rounded-xl text-white"+(calculateTotal() > 0.1? "" : " opacity-30")}
                              >
                                Continuar
                              </button>
                            </div>
                            :
                            <div className="flex items-center gap-5 text-lg max-w-md font-medium opacity-80 rounded-3xl border p-3.5 mx-auto">
                              <LightBulbIcon size={"3em"} />
                              <p>Elegi las frutas o verduras que deseas cultivar.</p>
                            </div>
                          }

                          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                            {
                              (vegsFiltered.length > 0? vegsFiltered : vegetables).map((e, index) => (
                                <div
                                  style={{ animationDelay: `${index * 0.15}s` }}
                                  key={e._id}
                                  className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
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
                                    onClick={() => addItems(e._id, e.slug, e.name, e.icon, e.space)}
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
                        <section className="flex flex-col w-full gap-5">
                          <div className="flex items-center gap-5 justify-between">
                            <button
                              className="w-fit"
                              type="button"
                              onClick={() => setPage(2)}
                            >
                              <FiChevronLeft size={"1.5em"} />
                            </button>

                            <button
                              onClick={() => {errors.vegetables ? toast.error("Elegi Verduras") : null}}
                              disabled={isSubmitting || calculateTotal() < 1}
                              type="submit"
                              className={"ml-auto mt-5 w-fit py-1.5 px-3 bg-green-600 font-medium rounded-xl text-white"+(calculateTotal() > 0.1? "" : " opacity-30")}
                            >
                              Guardar Jardin
                            </button>
                          </div>

                          <div className="flex flex-col">
                            <span className="font-semibold">Espacio de tu Jardin</span>
                            <span>{watch('width')} Mts Ancho</span>
                            <span>{watch('height')} Mts Altura</span>
                          </div>

                          <div className="flex flex-col">
                            <span className="font-semibold">Semillas necesarias</span>
                            {
                              watch('vegetables').map((e, index) => (
                                <span key={index+e.slug}>{e.name}</span>
                              ))
                            }
                          </div>
                          
                          <span className="font-semibold">Tus Plantas</span>

                          <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 w-full">
                          {
                            Children.toArray(
                              gardenPlants.map((e) => (
                                <button
                                  type="button"
                                  className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                                >
                                  {VegetablesIcons[e.icon]}
                                  <span className="font-medium">{e.name}</span>
                                  <small className="font-medium -mt-4">{e.space} Metros</small>
                                </button>
                              ))
                            )
                          }
                          </div>

                        </section>
                  }
                </form>
        }
      </section>
    </main>
    <ContactsSidebar />
    </>
  )
}

export default GardenPage