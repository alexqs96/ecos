"use client";
import { useQuery } from "@tanstack/react-query";
import ThumbnailSlider from "./ThumbnailSlider";
import {
  HarvestIcon,
  QuickInfoIcons,
  ShovelIcon,
  SnowflakeIcon,
  SproutIcon,
  SquareIcon,
  SunIcon,
  ThermometerIcon,
  WaterIcon,
} from "@/components/Posts/QuickInfoIcons";
import { Disclosure } from "@headlessui/react";
import { MyDisclosure } from "./MyDisclosure";
import Link from "next/link";

const PlantItem = ({ slug }) => {
  const {
    data: plantItem,
    isFetching: plantItemLoading,
    error: plantItemError,
  } = useQuery({
    queryKey: ["plantItem"],
    queryFn: async () => {
      return await fetch(`/api/garden/${slug}`).then((res) => res.json());
    },
  });

  const {
    data: plantInfo,
    isFetching: plantInfoLoading,
    error: plantInfoError,
  } = useQuery({
    queryKey: ["plantInfo"],
    queryFn: async () => {
      return await fetch(`/api/info/${slug}`).then((res) => res.json());
    },
  });

  return (
    <main className="w-full flex-column pb-10">
      {plantItemError ? (
        <p>Hubo un error al cargar info sobre esta planta</p>
      ) : plantItemLoading ? (
        <div> Cargando... </div>
      ) : (
        <section>
          <header className="flex p-5 col gap-3 items-center w-full text-4xl sticky top-0 bg-white z-30">
            <Link href="/plants">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6669 14.6667V17.3333H10.6669L18.0002 24.6667L16.1069 26.56L5.54688 16L16.1069 5.44L18.0002 7.33334L10.6669 14.6667H26.6669Z"
                  fill="#27B53C"
                />
              </svg>
            </Link>

            <h1 className="text-[#27b53C] font-semibold px-8">
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
              <h2 className=" text-3xl text-[#27b53C] font-semibold p-6">
                Información rápida
              </h2>
            </header>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  p-5 ">
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border  py-5  ">
                <span className="font-medium">Espacio</span>
                <SquareIcon />
                {plantItem.space}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border  py-5 ">
                <span className="font-medium">Temporada</span>
                <ThermometerIcon />
                {plantItem.season}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 ">
                <span className="font-medium">Frio</span>
                <SnowflakeIcon />
                {plantItem.cool ? "Tolerante" : "No Tolerante"}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 ">
                <span className="font-medium">Agua</span>
                <WaterIcon />
                {plantItem.water}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5">
                <span className="font-medium">Germinación</span>
                <SproutIcon />
                {plantItem.germination}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5 ">
                <span className="font-medium">Profundidad</span>
                <ShovelIcon />
                {plantItem.depth}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border  py-5 ">
                <span className="font-medium">Sol</span>
                <SunIcon />
                {plantItem.sun}
              </div>
              <div className="w-full appear aspect-square flex flex-col items-center justify-center gap-5 border py-5">
                <span className="font-medium">Cosecha</span>
                <HarvestIcon />
                {plantItem.harvest}
              </div>
            </div>
            {plantInfoError ? (
              <p>Hubo un error al cargar los detalles de esta planta</p>
            ) : plantInfoLoading ? (
              <div> Cargando... </div>
            ) : plantInfo ? (
              <>
                <div className="py-4">
                  <strong className=" text-2xl text-[#27b53C] font-semibold p-y p-6">
                    Botánica:
                  </strong>
                  <div className="w-full">
                    <MyDisclosure
                      title={"Semillas por gramo:"}
                      text={plantInfo.botany.seedsPerGram}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Familia:"}
                      text={plantInfo.botany.family}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Características específicas:"}
                      text={plantInfo.botany.family}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <strong className=" text-2xl text-[#27b53C] font-semibold py-14 p-6">
                    Diseño de la huerta:
                  </strong>
                  <div>
                    <MyDisclosure
                      title={"Ubicación en la huerta:"}
                      text={plantInfo.gardenDesign.gardenLocation}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Distancia entre planta (centímetros):"}
                      text={plantInfo.gardenDesign.plantsDistance}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Asociar con:"}
                      text={plantInfo.gardenDesign.asociateWith}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Rotar con:"}
                      text={plantInfo.gardenDesign.rotateWith}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Espacio Ocupado:"}
                      text={plantInfo.gardenDesign.spaceNeeded}
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Tolencia a la sombra:"}
                      text={
                        plantInfo.gardenDesign.shadowTolerance ? "Si" : "No"
                      }
                    />
                  </div>
                  <div>
                    <MyDisclosure
                      title={"Cultivo en recipiente:"}
                      text={
                        plantInfo.gardenDesign.bowlCultivation ? "Si" : "No"
                      }
                    />
                  </div>
                </div>
                <div className="py-4">
                <strong className=" text-2xl text-[#27b53C] font-semibold py-14 p-6">
                  Labores de cultivo:
                </strong>
                <div>
                  <MyDisclosure
                    title={"Tareas especiales:"}
                    text={plantInfo.cultivationWork.specialTasks}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Dificultad de cultivo:"}
                    text={plantInfo.cultivationWork.difficulty}
                  />
                </div>
                </div>
                <div className="py-4">
                <strong className=" text-2xl text-[#27b53C] font-semibold py-14 p-6">
                  Planificación de siembra:
                </strong>
                <div>
                  <MyDisclosure
                    title={"Fecha de siembra:"}
                    text={plantInfo.planning.sowingSeason}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Escalonamiento recomendado:"}
                    text={plantInfo.planning.stagingRecomendation}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Abono verde:"}
                    text={plantInfo.planning.greenFertilizer}
                  />
                </div>
                </div>
                <div className="py-4">
                <strong className=" text-2xl text-[#27b53C] font-semibold py-14 p-6">
                  Cosecha de productos
                </strong>
                <div>
                  <MyDisclosure
                    title={"Rendimiento de cosecha:"}
                    text={plantInfo.productHarvest.harvestPerformance}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Periodo posible de cosecha:"}
                    text={plantInfo.productHarvest.possibleHarvest}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Recomendación de cosecha:"}
                    text={plantInfo.productHarvest.recommendedHarvest}
                  />
                </div>
                </div>
                <div className="py-4">
                <strong className=" text-2xl text-[#27b53C] font-semibold py-14 p-6">
                  Cosecha de semillas:
                </strong>
                <div>
                  <MyDisclosure
                    title={"Años con buen poder germinativo:"}
                    text={plantInfo.seedsHarvest.germinativeYears}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"Tiempo de Fecundación:"}
                    text={plantInfo.seedsHarvest.kindOfFertilization}
                  />
                </div>
                <div>
                  <MyDisclosure
                    title={"¿Cómo cosecho las semillas?:"}
                    text={plantInfo.seedsHarvest.howToHarvest}
                  />
                </div>
                </div>
              </>
            ) : (
              <p>No hay info sobre esta planta</p>
            )}
          </section>
        </section>
      )}
    </main>
  );
};

export default PlantItem;
