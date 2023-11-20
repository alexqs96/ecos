function ChatSkeleton() {
  return (
    <button type="button" className="flex text-left items-center gap-3 animate-pulse px-4 py-2 rounded-2xl w-full">
      <span className='block p-7 rounded-full bg-gray-300'></span>
      <div className="w-full">
        <span className="flex items-center capitalize font-semibold w-full">
          <span className="block w-full bg-gray-300 py-2.5 rounded-md"></span>
          <small className="block ml-1 bg-gray-300 py-2.5 rounded-md w-[40%]"></small>
          </span>
        <p className="w-full bg-gray-300 py-2.5 mt-1 rounded-md"></p>
      </div>
    </button>
  )
}

export default ChatSkeleton