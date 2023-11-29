

export const CardSkeleton = () => {
  return (
    <div
      role="status"
      className="border-1.5 max-w-[14rem] animate-pulse rounded border-gray-200 p-4 shadow dark:border-gray-300 md:p-6"
    >
      <div className="mb-4 flex h-[10rem] items-center justify-center rounded bg-gray-300 dark:bg-gray-500"></div>
      <div className="flex justify-center">
        <div className="h-10 w-[50%] rounded-full bg-gray-200 dark:bg-gray-500"></div>
      </div>
    </div>
  );
};
