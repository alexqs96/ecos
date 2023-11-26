import GardenPage from "./GardenPage"

function ViewGarden({params}) {
  return (
    <>
      <GardenPage slug={params.slug} />
    </>
  )
}

export default ViewGarden