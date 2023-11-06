'use client'

export default function page() {

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Subiendo...");

    const formData = {
      kind: e.target.kind.value,
      botany: {
        seedsPerGram: parseFloat(e.target.seedsPerGram.value), // Convert to a number
        family: e.target.family.value,
        coldBehavior: e.target.coldBehavior.value,
        specificCharacteristics: e.target.specificCharacteristics.value,
      },
      gardenDesign: {
        gardenLocation: e.target.gardenLocation.value,
        plantsDistance: parseFloat(e.target.plantsDistance.value), // Convert to a number
        linesDistance: parseFloat(e.target.linesDistance.value), // Convert to a number
        asociateWith: e.target.asociateWith.value, // Assuming it's a comma-separated list
        rotateWith: e.target.rotateWith.value, // Assuming it's a comma-separated list
        spaceNeeded: e.target.spaceNeeded.value,
        shadowTolerance: e.target.shadowTolerance.checked, // Checkbox value
        bowlCultivation: e.target.bowlCultivation.checked, // Checkbox value
      },
      cultivationWork: {
        specialTasks: e.target.specialTasks.value,
        difficulty: e.target.difficulty.value,
      },
      planning: {
        sowingSeason: e.target.sowingSeason.value,
        seedPerMeter: e.target.seedPerMeter.value,
        almagicoPerformance: e.target.almagicoPerformance.value,
        stagingRecomendation: e.target.stagingRecomendation.value,
        greenFertilizer: e.target.greenFertilizer.value,
      },
      productHarvest: {
        harvestPerformance: e.target.harvestPerformance.value,
        possibleHarvest: e.target.possibleHarvest.value,
        recommendedHarvest: e.target.recommendedHarvest.value,
        daysToHarvest: parseInt(e.target.daysToHarvest.value), // Convert to an integer
      },
      seedsHarvest: {
        germinativeYears: e.target.germinativeYears.value,
        kindOfFertilization: e.target.kindOfFertilization.value,
        howToHarvest: e.target.howToHarvest.value,
      },
    }

    const res = await fetch('/api/upload', {
      method: "POST",
      headers:{
        "content-type" : "application/json"
      },
      body: JSON.stringify(formData)
    })

    console.log("Response: "+res.statusText);

    if (res.status === 200) {
      location.reload()
    }
  }

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label htmlFor="kind">ESPECIE:</label>
          <input className="border mb-1" type="text" name="kind" id="kind"/>

          <span className="font-bold mb-1 mt-2">Botánica</span>
          <label htmlFor="seedsPerGram">SEMILLAS EN 1 GRAMO:</label>
          <input className="border mb-1" type="text" name="seedsPerGram" id="seedsPerGram" defaultValue="1"/>

          <label htmlFor="family">Familia:</label>
          <input className="border mb-1" type="text" name="family" id="family"/>

          <label htmlFor="coldBehavior">COMPORTAMIENTO HELADAS:</label>
          <input className="border mb-1" type="text" name="coldBehavior" id="coldBehavior"/>

          <label htmlFor="specificCharacteristics">CARACTERÍSTICAS ESPECÍFICAS:</label>
          <input className="border mb-1" type="text" name="specificCharacteristics" id="specificCharacteristics"/>

          <span className="font-bold mb-1 mt-2">Diseño de la huerta</span>
          <label htmlFor="gardenLocation">UBICACIÓN EN LA HUERTA:</label>
          <input className="border mb-1" type="text" name="gardenLocation" id="gardenLocation"/>

          <label htmlFor="plantsDistance">DISTANCIA ENTRE PLANTAS (CENTÍMETROS):</label>
          <input className="border mb-1" type="text" name="plantsDistance" id="plantsDistance"/>

          <label htmlFor="linesDistance">DISTANCIA ENTRE LÍNEAS (CENTÍMETROS):</label>
          <input className="border mb-1" type="text" name="linesDistance" id="linesDistance"/>

          <label htmlFor="asociateWith">ASOCIAR CON:</label>
          <input className="border mb-1" type="text" name="asociateWith" id="asociateWith"/>

          <label htmlFor="rotateWith">ROTAR CON:</label>
          <input className="border mb-1" type="text" name="rotateWith" id="rotateWith"/>

          <label htmlFor="spaceNeeded">ESPACIO OCUPADO:</label>
          <input className="border mb-1" type="text" name="spaceNeeded" id="spaceNeeded"/>

          <label htmlFor="shadowTolerance" className="flex items-center gap-2 mb-1">TOLERA SOMBRA:
            <input className="border mb-1" type="checkbox" name="shadowTolerance" id="shadowTolerance"/>
          </label>

          <label htmlFor="bowlCultivation" className="flex items-center gap-2 mb-1">CULTIVO EN RECIPIENTE:
            <input className="border mb-1" type="checkbox" name="bowlCultivation" id="bowlCultivation"/>
          </label>

          <span className="font-bold mb-1 mt-2">Labores de cultivo</span>
          <label htmlFor="specialTasks">TAREAS ESPECIALES:</label>
          <input className="border mb-1" type="text" name="specialTasks" id="specialTasks"/>

          <label htmlFor="difficulty">DIFICULTAD DE CULTIVO:</label>
          <input className="border mb-1" type="text" name="difficulty" id="difficulty"/>
        </div>

        <div className="flex flex-col">

          <span className="font-bold mb-1 mt-2">Planificación de siembra</span>
          <label htmlFor="sowingSeason">FECHA DE SIEMBRA O PLANTACIÓN:</label>
          <input className="border mb-1" type="text" name="sowingSeason" id="sowingSeason"/>

          <label htmlFor="seedPerMeter">SEMILLA POR METRO CUADRADO DE ALMÁCIGO O SURCO:</label>
          <input className="border mb-1" type="text" name="seedPerMeter" id="seedPerMeter"/>

          <label htmlFor="almagicoPerformance">RENDIMIENTO EN ALMÁCIGO:</label>
          <input className="border mb-1" type="text" name="almagicoPerformance" id="almagicoPerformance"/>

          <label htmlFor="stagingRecomendation">ESCALONAMIENTO RECOMENDADO:</label>
          <input className="border mb-1" type="text" name="stagingRecomendation" id="stagingRecomendation"/>

          <label htmlFor="greenFertilizer">ABONO VERDE:</label>
          <input className="border mb-1" type="text" name="greenFertilizer" id="greenFertilizer"/>

          <span className="font-bold mb-1 mt-2">Cosecha de productos</span>
          <label htmlFor="harvestPerformance">RENDIMIENTO A COSECHAR:</label>
          <input className="border mb-1" type="text" name="harvestPerformance" id="harvestPerformance"/>

          <label htmlFor="possibleHarvest">PERIODO POSIBLE DE COSECHA:</label>
          <input className="border mb-1" type="text" name="possibleHarvest" id="possibleHarvest"/>

          <label htmlFor="recommendedHarvest">RECOMENDACIÓN DE COSECHA:</label>
          <input className="border mb-1" type="text" name="recommendedHarvest" id="recommendedHarvest"/>

          <label htmlFor="daysToHarvest">DÍAS A COSECHA:</label>
          <input className="border mb-1" type="text" name="daysToHarvest" id="daysToHarvest"/>

          <span className="font-bold mb-1 mt-2">Cosecha de semillas</span>
          <label htmlFor="germinativeYears">AÑOS CON BUEN PODER GERMINATIVO:</label>
          <input className="border mb-1" type="text" name="germinativeYears" id="germinativeYears"/>

          <label htmlFor="kindOfFertilization">TIPO DE FECUNDACIÓN:</label>
          <input className="border mb-1" type="text" name="kindOfFertilization" id="kindOfFertilization"/>

          <label htmlFor="howToHarvest">¿CÓMO COSECHO LAS SEMILLAS?:</label>
          <input className="border mb-1" type="text" name="howToHarvest" id="howToHarvest"/>

          <button type="submit" className="bg-black text-white py-1.5 px-3 rounded-md w-fit mt-4">Guardar</button>
        </div>
      </form>
    </>
  )
}