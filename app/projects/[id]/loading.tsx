export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <div className="container mx-auto max-w-5xl">
        <div className="animate-pulse">
          <div className="h-6 w-48 bg-gray-700 rounded mb-8"></div>
          
          <div className="bg-gray-800/50 border-2 border-purple-500 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
              <div className="flex-1 space-y-4">
                <div className="h-10 bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-6 bg-gray-700 rounded-full w-20"></div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-48">
                <div className="h-10 bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-700 rounded w-4/6"></div>
              
              <div className="h-6 bg-gray-700 rounded w-1/6 mt-8"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
