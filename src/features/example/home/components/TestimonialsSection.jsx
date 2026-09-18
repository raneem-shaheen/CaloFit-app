import { useHomeData } from '../../../../services/hooks/useHomeData'

export default function TestimonialsSection() {
  const { testimonials, loading } = useHomeData()
  const defaultComment = 'The quality and freshness of the food has exceeded all my expectations every single day.'

  if (loading) {
    return (
      <section className="py-16 text-center text-warm-600">
        Loading customer reviews...
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F5] py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">
            COMMUNITY LOVE
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Loved by 10,000+ Health Enthusiasts
          </h2>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(testimonials || []).map((item = {}) => (
            <div
              key={item.id || item.userName}
              className="flex flex-col justify-between bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div>
                
                <div className="flex text-amber-400 text-lg mb-4">
                  {'★'.repeat(Math.max(1, Math.min(5, Number(item.rating) || 5)))}
                </div>

                
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8">
                  &quot;{item.comment || defaultComment}&quot;
                </p>
              </div>

              
              <div className="flex items-center gap-3">
                <img
                  src={item.userAvatar || undefined}
                  alt={item.userName || 'Happy Customer'}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-none">
                    {item.userName || 'Happy Customer'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.userRole || 'Verified Buyer'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}