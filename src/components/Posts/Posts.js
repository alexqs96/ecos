import { PostCard } from "./Posts.card"

export async function Posts(){
  let data = await fetch('/api/posts').then(res => res.json()).catch(() => [])

  if (!data) return null

  return (
    <>
    {
      data.map(e => (
        <PostCard key={e._id} data={e} />
      ))
    }
    </>
  )
}