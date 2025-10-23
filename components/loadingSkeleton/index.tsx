const LoadingSkeleton = ({ count = 6, type = "card" }) => {
  return [...Array(count)].map((_, index) => (
    <div
      key={index}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 animate-pulse"
    >
      {type === "card" && (
        <>
          <div className="h-6 bg-gray-300 rounded-md mb-4 w-3/4"></div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-2/3"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
            </div>
          </div>
        </>
      )}
      {type === "table" && (
        <div className="space-y-2">
          <div className="h-6 bg-gray-300 rounded-md mb-2 w-full"></div>
          {[...Array(3)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="h-4 bg-gray-300 rounded-md w-full mb-2"
            ></div>
          ))}
        </div>
      )}
      {type === "Article" && (
        <div className=" mx-auto p-6 bg-gray-50 rounded-lg shadow-md animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
          </div>

          <div className="h-40 bg-gray-300 rounded-lg mb-6"></div>

          <div className="space-y-4">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-300 rounded"></div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-20 w-20 bg-gray-300 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      )}

      {type === "ArticleID" && (
        <section className="relative top-28 md:top-40 px-4 lg:px-28 pb-40 items-center overflow-hidden">
          <div>
            {/* Breadcrumb and share skeleton */}
            <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center my-4">
              <div className="hidden md:flex md:items-center text-sm mb-4">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-2 w-2 mx-2 bg-gray-300 rounded-full"></div>
                <div className="h-4 w-40 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Title and author skeleton */}
            <div className="h-8 w-3/4 bg-gray-300 rounded mb-3"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded mb-6"></div>

            {/* Main image skeleton */}
            <div className="w-full aspect-[21/9] md:h-[20rem] bg-gray-300 rounded-lg mb-8"></div>
          </div>

          {/* Content grid skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content skeleton */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none mt-6">
                <div className="h-7 w-1/3 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2 mb-8">
                  {[...Array(6)].map((_, pIndex) => (
                    <div
                      key={`p-${pIndex}`}
                      className="h-4 bg-gray-300 rounded w-full"
                    ></div>
                  ))}
                </div>
              </div>

              {/* Second content section */}
              <div className="prose max-w-none mt-6">
                <div className="h-7 w-1/4 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  {[...Array(4)].map((_, pIndex) => (
                    <div
                      key={`p2-${pIndex}`}
                      className="h-4 bg-gray-300 rounded w-full"
                    ></div>
                  ))}
                </div>
                {/* Second image skeleton */}
                <div className="relative w-full h-[20rem] bg-gray-300 rounded-lg mb-8"></div>
              </div>

              {/* Third content section */}
              <div className="prose max-w-none mt-6">
                <div className="h-7 w-2/5 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-2 mb-4">
                  {[...Array(5)].map((_, pIndex) => (
                    <div
                      key={`p3-${pIndex}`}
                      className="h-4 bg-gray-300 rounded w-full"
                    ></div>
                  ))}
                </div>
                {/* Third image skeleton */}
                <div className="relative w-full h-[28rem] bg-gray-300 rounded-lg mb-8"></div>
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              {/* Related posts skeleton */}
              <div className="mb-8 p-4 border rounded-lg border-gray-300">
                <div className="h-6 w-1/2 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`related-${i}`}
                      className="h-5 bg-gray-300 rounded w-full pb-3 border-b border-gray-300"
                    ></div>
                  ))}
                </div>
                <div className="h-5 w-1/3 bg-gray-300 rounded mt-4"></div>
              </div>

              {/* Testimonial skeleton */}
              <div className="relative rounded-lg overflow-hidden mb-8 h-40 bg-gray-300"></div>

              {/* Newsletter skeleton */}
              <div className="bg-gray-200 p-6 rounded-lg text-center mb-8">
                <div className="h-7 w-3/4 bg-gray-300 rounded mx-auto mb-2"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  ));
};

export default LoadingSkeleton;
