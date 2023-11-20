'use client'

import { useEffect, useRef, useState } from "react";

async function getMessages(username){
  console.log(username);

  if (!username) return null

  const data = await fetch(`/api/chats/${username}`).then(res => res.json()).catch(err => {
    console.error(err);

    return []
  })
  return data
}

async function sendMessage(message, images, username){
  console.log(message);
  console.log(username);
  try {
    await fetch(`/api/chats/${username}`, {
      method: "POST",
      body: JSON.stringify({
        message,
        images: []
      })
    }).then(res => res.json())
  } catch (error) {
    console.log("Error API Send Message: "+error);
    return null
  }
}

function ChatPage({params}) {
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const message = useRef('')

  useEffect(() => {
    if (params?.username) {
      async function fetchMessages(){
        const data = await getMessages(params.username)

        setMessages(data)
        setLoading(false)
      }

      fetchMessages()
    }
  }, [params])
  

  return (
    <div className='w-full max-w-[80%] mx-auto border-x'>
      <div className="p-5 fixed top-18 bg-white -mt-0.5">
        <span>@{params?.username}</span>
      </div>
      <div className='flex flex-col gap-5 w-full p-5 pt-24'>
        {
          loading?
          <strong>Cargandooo.....</strong>
          :
          messages?.map(e => (
            <div key={e?._id} className='flex flex-col'>
              <small>{e?.sender?.username}</small>
              <em>{e?.message}</em>
            </div>
          ))
        }
      </div>

      <div className='sticky bottom-0 inset-x-0 flex w-full bg-white mx-auto border'>
        <textarea ref={message} className='h-[64px] w-full outline-none'></textarea>
        <button type='button' onClick={() => sendMessage(message.current.value, [], params?.username)}>
          Enviar
        </button>
      </div>
    </div>
  )
}

export default ChatPage