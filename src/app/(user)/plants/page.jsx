'use client'

import { useQuery } from "@tanstack/react-query"

export default function PlantsPage() {
  const {data: plants, isLoading} = useQuery({
    queryKey: ['plants'],
    queryFn: async () => {
      return await fetch("/api/garden").then(res => res.json())
    }
  })

  return (
    <main>
      {
        isLoading?
        <p>Cargando Plantas</p>
        :
        plants?.map(e => (
          <p key={e._id}>{e?.slug}</p>
        ))
      }
    </main>
  )
}
