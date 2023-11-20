import ChatList from "./ChatList";
import ContactList from "./ContactList";

export default function Chats({searchParams}){
  return (
    <>
      <div className="max-w-xs w-full border-r"></div>
      <ChatList searchParams={searchParams} />
      <ContactList />
    </>
  )
}