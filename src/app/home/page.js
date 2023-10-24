import { LeftDrawer, RightDrawer } from '@/components/Drawers'
import { PostForm } from '@/components/Forms'

export default function Home() {
  return (
    <section className="flex justify-between gap-5 w-full">
      <LeftDrawer />
      <main className="border-x dark:border-white/20 w-full px-[1%]">
        <PostForm />
      </main>
      <RightDrawer />
    </section>
  )
}