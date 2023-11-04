
export function LeftSidebar() {
  return (
    <aside className="max-sm:hidden w-full max-w-[128px] lg:max-w-[256px] py-5">
      <div className="fixed">
        Friends
      </div>
    </aside>
  )
}

export function RightSidebar() {
  return (
    <aside className="max-sm:hidden w-full max-w-[256px] py-5 max-lg:hidden">
      <div className="fixed">
        Messaging
      </div>
    </aside>
  )
}
