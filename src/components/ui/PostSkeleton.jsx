
export const PostSkeleton = () => {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <span className="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
      </div>

      <div className="ms-4 mt-2 w-full">
        <h3
          className="h-4 bg-gray-200 rounded-full dark:bg-gray-700"
        ></h3>

        <ul className="mt-5 space-y-3">
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
        </ul>
      </div>
    </div>
  );
};
