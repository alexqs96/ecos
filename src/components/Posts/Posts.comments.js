'use client'

import Image from "next/image"
import ImageModal from "../ImageModal"
import { useState } from "react"

export default function Comments({data}){
  const [imageCommented, setimageCommented] = useState(null)
  
  if (!data.length > 0) {
    return null
  }

  return(
    <section className="flex flex-col gap-2">
    <ImageModal image={imageCommented} close={setimageCommented} />
    {
      data.map(e => (
        <div key={e._id} className="flex flex-col gap-2">
          <p>{e.creator.username}</p>
          <p>{e.content}</p>
          {
            e.image?
            <Image
              className="w-full max-w-[128px] h-full aspect-square object-cover rounded-md overflow-hidden cursor-pointer"
              onClick={() => setimageCommented(e.image)}
              width={128.1}
              height={128.1}
              src={e.image}
              alt={"Foto de "+e.creator.username}
              unoptimized
              priority
            />
            :
            null
          }
        </div>
      ))
    }
    </section>
  )
}