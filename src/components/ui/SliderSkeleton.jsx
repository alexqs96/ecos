
export const SliderSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="h-[27.8125rem] rounded-xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex list-none items-center justify-center py-3 gap-3">
        <div className="h-[70px] w-[70px] cursor-pointer list-none overflow-hidden rounded-2xl object-cover bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-[70px] w-[70px] cursor-pointer list-none overflow-hidden rounded-2xl object-cover bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-[70px] w-[70px] cursor-pointer list-none overflow-hidden rounded-2xl object-cover bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-[70px] w-[70px] cursor-pointer list-none overflow-hidden rounded-2xl object-cover bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};
