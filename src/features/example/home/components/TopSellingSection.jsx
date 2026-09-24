import React from 'react'
import DishesSkeleton from './DishesSkeleton'

export default function TopSellingSection({ dishes = [], loading = false }) {
  const safeDishes = Array.isArray(dishes) ? dishes : []

  const getTagTextColor = (color) => {
    const value = typeof color === 'string' ? color.trim().toLowerCase() : ''

    if (!value) {
      return 'text-white'
    }

    if (value.startsWith('#')) {
      const hex = value.replace('#', '')
      if (hex.length === 3) {
        const expanded = hex
          .split('')
          .map((char) => char + char)
          .join('')

        const r = parseInt(expanded.slice(0, 2), 16)
        const g = parseInt(expanded.slice(2, 4), 16)
        const b = parseInt(expanded.slice(4, 6), 16)

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance > 0.7 ? 'text-gray-900' : 'text-white'
      }

      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16)
        const g = parseInt(hex.slice(2, 4), 16)
        const b = parseInt(hex.slice(4, 6), 16)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        return luminance > 0.7 ? 'text-gray-900' : 'text-white'
      }
    }

    return value.includes('yellow') || value.includes('light') ? 'text-gray-900' : 'text-white'
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Signature Dishes</h2>
          <p className="text-gray-600">
            Freshly prepared, macro-balanced meals crafted for your daily goals.
          </p>
        </div>

        {loading ? (
          <DishesSkeleton />
        ) : safeDishes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
            Signature dishes are temporarily unavailable.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeDishes.map((dish) => {
              const priceValue = Number(dish.price ?? 0)
              const formattedPrice = `${dish.currency || '$'}${priceValue.toFixed(2)}`
              const caloriesValue =
                typeof dish.calories !== 'undefined' && dish.calories !== null && dish.calories !== ''
                  ? Number(dish.calories)
                  : Array.isArray(dish.macros)
                    ? Number(
                        dish.macros.find((macro) => /calories?/i.test(String(macro.title || '')))?.amount ?? 0,
                      )
                    : 0

              const showCaloriesBadge = Number.isFinite(caloriesValue) && caloriesValue > 0

              return (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-56 bg-gray-100 overflow-hidden rounded-t-2xl">
                    <img
                      src={dish.imageUrl || '/images/placeholder-dish.png'}
                      alt=""
                      aria-label={dish.name || 'Dish image'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />

                    {showCaloriesBadge ? (
                      <div className="absolute inset-x-3 top-3 z-10 flex justify-between items-center gap-2">
                        <div className="bg-white/90 backdrop-blur-md text-gray-700 font-medium text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                          <span aria-hidden="true">🔥</span>
                          <span>{caloriesValue} kcal</span>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {dish.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag.id}
                              style={{ backgroundColor: tag.color || '#2D6A4F' }}
                              className={`${getTagTextColor(tag.color)} text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-x-3 top-3 z-10 flex justify-end">
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          {dish.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag.id}
                              style={{ backgroundColor: tag.color || '#2D6A4F' }}
                              className={`${getTagTextColor(tag.color)} text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm`}
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-gray-900 text-lg leading-snug">{dish.name}</h3>
                      <span className="text-emerald-600 font-bold text-lg whitespace-nowrap">
                        {formattedPrice}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{dish.description}</p>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                      {dish.macros?.map((macro, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-[11px] text-gray-600"
                        >
                          <span className="font-semibold text-gray-800">{macro.amount}{macro.unit}</span>
                          <span>{macro.title}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 mt-auto">
                      <button
                        type="button"
                        className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-xl transition-colors duration-150"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
