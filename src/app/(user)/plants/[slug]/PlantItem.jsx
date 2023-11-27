"use client";
import { useQuery } from "@tanstack/react-query";
import ThumbnailSlider from "./ThumbnailSlider";

const PlantItem = ({ slug }) => {
  const { data: plantItem, isFetching } = useQuery({
    queryKey: ["plantItem"],
    queryFn: async () => {
      return await fetch(`/api/garden/${slug}`).then((res) => res.json());
    },
  });

  const { data: plantInfo, isFetching : FindInfoFetching } = useQuery({
    queryKey: ["plantInfo"],
    queryFn: async () => {
      return await fetch(`/api/info/${slug}`).then((res) => res.json());
    },
  });

  if (!plantItem) return <div> No se encontro la planta </div>;

  return (
    <main className="w-full flex-column">
      {isFetching ? (
        <div> Cargando... </div>
      ) : (
        <section>
          <header className="flex p-5 col gap-3 items-center w-full ">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.6669 14.6667V17.3333H10.6669L18.0002 24.6667L16.1069 26.56L5.54688 16L16.1069 5.44L18.0002 7.33334L10.6669 14.6667H26.6669Z"
                fill="#27B53C"
              />
            </svg>

            <h1 className=" text-4xl text-[#27b53C] font-semibold px-8">
              {plantItem.name}
            </h1>
          </header>
          <hr className="border-b border-t-0 w-full" />
          <section className="w-full m-0-auto">
            {plantItem?.images?.length > 0 ? (
              <ThumbnailSlider
                images={plantItem.images}
                name={plantItem.name}
              />
            ) : (
              <p>No Hay Imagenes en DB</p>
            )}
          </section>
          <section>
            <header>
              <h2>Información rápida</h2>
            </header>

            {FindInfoFetching ? (
              <div> Cargando... </div>
            ) : (
              plantInfo?.map((e) => (
                <div
                  key={e._id}
                  className="w-full aspect-square flex flex-col items-center justify-center gap-5 border py-5 rounded-3xl transition-shadow duration-200 shadow-transparent hover:shadow-md"
                >
                  <span className="font-medium">{e.name}</span>
                </div>
              ))
            )}
          </section>
        </section>
      )}
    </main>
  );
};

export default PlantItem;
