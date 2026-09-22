import React from "react";
import { useHomeData } from "../../../services/hooks/useHomeData";

export default function PureSection() {
  const { pureFeatures, loading } = useHomeData();

  if (loading) {
    return null;
  }

  return (
    <>
      <section className="bg-[#FAF8F5] py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
              CALOFIT DIFFERENCE
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
              Pure Ingredients. Zero Compromise.
            </h2>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              We take the guesswork out of healthy living with a transparent, uncompromising kitchen standard.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pureFeatures.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start"
              >
                
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <img
                    src={item.icon}
                    alt={item.title || 'Pure feature icon'}
                    className="h-6 w-6 object-contain"
                    width="24"
                    height="24"
                  />
                </div>

               
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}