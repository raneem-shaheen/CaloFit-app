import { useHomeData } from '../../../../services/hooks/useHomeData'

const FALLBACK_AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'

export default function TestimonialsSection() {
  const { testimonials, loading } = useHomeData()

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-400">
        Loading reviews...
      </div>
    )
  }


  if (!testimonials || testimonials.length === 0) {
    return null
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div>
                
                <div className="flex gap-0.5 text-lg mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, starIndex) => {
                    const rating = Math.max(0, Math.min(5, Number(item.rating) || 0))

                    return (
                      <span
                        key={starIndex}
                        className={starIndex < rating ? 'text-amber-500' : 'text-gray-300'}
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    )
                  })}
                </div>

                
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8">
                  &quot;{item.comment}&quot;
                </p>
              </div>

              
              <div className="flex items-center gap-3">
                <img
                  src={item.userAvatar || FALLBACK_AVATAR_URL}
                  alt={item.userName || 'Verified Customer'}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_AVATAR_URL;
                  }}
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-none">
                    {item.userName || 'Verified Customer'}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}