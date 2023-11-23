import ChatList from "./ChatList";
import ContactList from "./ContactList";

export default function Chats({searchParams}){
  return (
    <>
      <ChatList searchParams={searchParams} />
      <ContactList />
    </>
  )
}