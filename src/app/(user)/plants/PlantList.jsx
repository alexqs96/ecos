"use client";

import { PlantIcon } from "@/components/Icons";
import { VegetablesIcons } from "@/components/VegetablesIcons";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";


export default function PlantList() {
  const { data: plants, isLoading } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      return await fetch("/api/garden").then((res) => res.json());
    },
  });

  const [vegsFiltered, setVegsFiltered] = useState(false)

  const filterVegetables = () => {
    const data = plants.filter(e => e.name.toLowerCase().includes(search.current.value.toLowerCase()))
    setVegsFiltered(data)
  }

  const search = useRef(null);
  return (
    <main className="w-full">
      <header className="flex p-8 col gap-3 items-center w-full">
        <PlantIcon size={32} className={"fill-[#27b53C]"} />
        <h1 className=" text-4xl text-[#27b53C] font-semibold">Plantas</h1>
      </header>
      <hr className="border-b border-t-0 w-full" />
      <div className="flex items-center w-full max-w-xs overflow-hidden border-2 rounded-2xl bg-white focus-within:border-green-600">
        <button type="button" className="px-2">
          <FiSearch size={"1.2em"} />
        </button>
        <input
          ref={search}
          type="text"
          onChange={() => filterVegetables()}
          onKeyDown={(e) => (e.key === "Enter" ? null : null)}
          className="py-1 pr-3 outline-none w-full"
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 p-5 gap-5">
      {isLoading ? (
        <p>Cargando Plantas</p>
      ) : (
        (vegsFiltered.length > 0? vegsFiltered : plants).map((e, index) => (
            <div
              style={{ animationDelay: `${index * 0.15}s` }}
              key={e._id}
              className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
            >
              {VegetablesIcons[e.icon]}
              <span className="font-medium">{e.name}</span>
              <Link
                href={`/plants/${e.slug}`}
                className="font-medium py-1.5 px-3 rounded-lg w-[70%] bg-green-500 text-white text-center"
              >
                Ver detalle
              </Link>
            </div>
          
        ))
      )}
      </div>
    </main>
  );
}
