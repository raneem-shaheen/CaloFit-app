import { useHomeData } from '../../../../services/hooks/useHomeData'

export default function TestimonialsSection() {
  const { testimonials, loading } = useHomeData()

  if (loading) {
    return (
      <section className="bg-[#FAF8F5] px-6 py-20" aria-label="Loading testimonials">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase">COMMUNITY LOVE</span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Loved by 10,000+ Health Enthusiasts</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 animate-pulse">
            {[0, 1, 2].map((item) => (
              <div className="h-64 rounded-3xl border border-gray-100 bg-white p-8" key={item}>
                <div className="mb-4 h-6 w-24 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                <div className="mb-8 h-4 w-4/5 rounded bg-gray-200" />
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
                  src={item.userAvatar}
                  alt={item.userName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-none">
                    {item.userName}
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