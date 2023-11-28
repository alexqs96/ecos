import ContactsSidebar from "@/components/ContactsSidebar";
import ChatView from "./ChatView";

export default function ChatViewPage ({params, searchParams}) {
  return (
    <>
      <ChatView params={params} type={searchParams?.view === "trades"? "trades" : null} />
      <ContactsSidebar />
    </>
  )
}
