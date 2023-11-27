import ContactsSidebar from "@/components/ContactsSidebar";
import ChatList from "./ChatList";

export default function Chats({searchParams}){
  return (
    <>
      <ChatList searchParams={searchParams} />
      <ContactsSidebar />
    </>
  )
}