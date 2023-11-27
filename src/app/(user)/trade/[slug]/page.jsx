import ContactsSidebar from "@/components/ContactsSidebar"
import TradeDetails from "./TradeDetails"

export default function TradeDetailsPage ({params}) {
  return (
    <>
      <TradeDetails slug={params?.slug} />
      <ContactsSidebar />
    </>
  )
}
