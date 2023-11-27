"use client";
import { useQuery } from "@tanstack/react-query";
import ThumbnailSlider from "./ThumbnailSlider";

const PlantItem = ({ slug }) => {
  const { data: plantItem, isFetching: plantItemLoading, error: plantItemError } = useQuery({
    queryKey: ["plantItem"],
    queryFn: async () => {
      return await fetch(`/api/garden/${slug}`).then((res) => res.json());
    },
  });

  const { data: plantInfo, isFetching: plantInfoLoading, error: plantInfoError } = useQuery({
    queryKey: ["plantInfo"],
    queryFn: async () => {
      return await fetch(`/api/info/${slug}`).then((res) => res.json());
    },
  });

  return (
    <main className="w-full flex-column">
      {
        plantItemError ?
          <p>Hubo un error al cargar info sobre esta planta</p>
          :
          plantItemLoading ? (
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

                {
                  plantInfoError ?
                    <p>Hubo un error al cargar los detalles de esta planta</p>
                    :
                    plantInfoLoading ? (
                      <div> Cargando... </div>
                    ) : (
                      plantInfo ?
                        <>
                          <strong>botany</strong>
                          <div><strong>seedsPerGram:</strong> <span>{plantInfo.botany.seedsPerGram}</span></div>
                          <div><strong>family:</strong> <span>{plantInfo.botany.family}</span></div>
                          <div><strong>specificCharacteristics:</strong> <span>{plantInfo.botany.specificCharacteristics}</span></div>

                          <strong>gardenDesign</strong>
                          <div><strong>gardenLocation:</strong> <span>{plantInfo.gardenDesign.gardenLocation}</span></div>
                          <div><strong>plantsDistance:</strong> <span>{plantInfo.gardenDesign.plantsDistance}</span></div>
                          <div><strong>asociateWith:</strong> <span>{plantInfo.gardenDesign.asociateWith}</span></div>
                          <div><strong>rotateWith:</strong> <span>{plantInfo.gardenDesign.rotateWith}</span></div>
                          <div><strong>spaceNeeded:</strong> <span>{plantInfo.gardenDesign.spaceNeeded}</span></div>
                          <div><strong>shadowTolerance:</strong> <span>{plantInfo.gardenDesign.shadowTolerance ? "Si" : "No"}</span></div>
                          <div><strong>bowlCultivation:</strong> <span>{plantInfo.gardenDesign.bowlCultivation ? "Si" : "No"}</span></div>

                          <strong>cultivationWork</strong>
                          <div><strong>specialTasks:</strong> <span>{plantInfo.cultivationWork.specialTasks}</span></div>
                          <div><strong>difficulty:</strong> <span>{plantInfo.cultivationWork.difficulty}</span></div>

                          <strong>planning</strong>
                          <div><strong>sowingSeason:</strong> <span>{plantInfo.planning.sowingSeason}</span></div>
                          <div><strong>stagingRecomendation:</strong> <span>{plantInfo.planning.stagingRecomendation}</span></div>
                          <div><strong>greenFertilizer:</strong> <span>{plantInfo.planning.greenFertilizer}</span></div>

                          <strong>productHarvest</strong>
                          <div><strong>harvestPerformance:</strong> <span>{plantInfo.productHarvest.harvestPerformance}</span></div>
                          <div><strong>possibleHarvest:</strong> <span>{plantInfo.productHarvest.possibleHarvest}</span></div>
                          <div><strong>recommendedHarvest:</strong> <span>{plantInfo.productHarvest.recommendedHarvest}</span></div>

                          <strong>seedsHarvest</strong>
                          <div><strong>germinativeYears:</strong> <span>{plantInfo.seedsHarvest.germinativeYears}</span></div>
                          <div><strong>kindOfFertilization:</strong> <span>{plantInfo.seedsHarvest.kindOfFertilization}</span></div>
                          <div><strong>howToHarvest:</strong> <span>{plantInfo.seedsHarvest.howToHarvest}</span></div>

                          <div><strong>kind:</strong> <span>{plantInfo.kind}</span></div>
                        </>
                        :
                        <p>No hay info sobre esta planta</p>
                    )}
              </section>
            </section>
          )}
    </main>
  );
};

export default PlantItem;