import React from "react";

export default function DishesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        >
            
            <div className="w-full h-56 bg-gray-200" />
          
          <div className="p-5 flex flex-col flex-grow space-y-4">
           

            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-2/3" />
              <div className="h-5 bg-gray-200 rounded w-12" />
            </div>
            

            <div className="space-y-2">
              <div className="h-3.5 bg-gray-100 rounded w-full" />
              <div className="h-3.5 bg-gray-100 rounded w-4/5" />
            </div>
            

            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-gray-100 rounded-full w-14" />
              <div className="h-6 bg-gray-100 rounded-full w-14" />
              <div className="h-6 bg-gray-100 rounded-full w-14" />
            </div>
       

            <div className="pt-2 mt-auto">
              <div className="h-10 bg-gray-200 rounded-xl w-full" />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}