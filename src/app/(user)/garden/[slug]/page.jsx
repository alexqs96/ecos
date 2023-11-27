import ContactsSidebar from "@/components/ContactsSidebar"
import GardenPage from "./GardenPage"

function ViewGarden({params}) {
  return (
    <>
      <GardenPage slug={params.slug} />
      <ContactsSidebar />
    </>
  )
}

export default ViewGarden