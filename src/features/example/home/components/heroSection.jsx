import heroDishImg from '../../../../assets/images/hero-dish.png'
import { useHomeData } from '../../../../services/hooks/useHomeData'

function HeroSection() {
  const { heroData, loading } = useHomeData()
  const rating = Math.max(0, Math.min(5, Math.round(Number(heroData?.rating) || 0)))

  return (
    <section className="w-full bg-[radial-gradient(circle_at_8%_35%,#dcfce7_0%,#faf9f6_34%,#faf9f6_70%,#fef3c7_100%)] py-12 sm:py-16 lg:min-h-[calc(100vh-5rem)] lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              100% Certified Organic & Non-GMO
            </span>
          </div>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-warm-900 sm:text-5xl lg:text-6xl">
            Calorie-Smart Meals for an{' '}
            <span className="text-brand-500">Active Life.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-warm-700 sm:text-lg">
            Clean ingredients, exact macros, and unbeatable flavor. Every meal is tailored to your active routine and delivered fresh to keep you performing at your best.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-base font-bold text-white shadow-md shadow-brand-500/20 transition-all hover:bg-brand-600" type="button">
              <span>Explore Menu</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="cursor-pointer rounded-full border border-warm-200 bg-white px-7 py-3.5 text-base font-bold text-warm-900 shadow-sm transition-all hover:bg-warm-100" type="button">
              Build Your Plan
            </button>
          </div>
          <div className="flex min-h-10 flex-wrap items-center gap-6 pt-2">
            {loading ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="h-10 w-32 rounded-full bg-gray-200" />
                <div className="h-10 w-40 rounded bg-gray-200" />
              </div>
            ) : heroData ? (
              <div className="flex items-center gap-3">
              <div className="flex min-w-[7.5rem] -space-x-2.5 overflow-hidden">
                {heroData?.avatars?.map((item) => (
                      <img
                        key={item.id}
                        src={item.avatar}
                        alt={item.name}
                        className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-warm-50"
                      />
                    ))}
              </div>
              <div className="flex min-w-[12rem] flex-col">
                <div
                  className="flex gap-0.5 text-xs"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <span
                      key={starIndex}
                      className={
                        starIndex < rating ? 'text-amber-500' : 'text-gray-300'
                      }
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-xs font-bold text-warm-900 sm:text-sm">
                  {rating}/5{' '}
                  <span className="font-normal text-warm-700">
                    from {heroData?.totalCount || 0} foodies
                  </span>
                </p>
              </div>
              </div>
            ) : null}
            <div className="hidden h-8 w-px bg-warm-200 sm:block" />
            <div className="flex min-w-[9rem] flex-col">
              <span className="text-sm font-extrabold leading-tight text-warm-900">30 min</span>
              <span className="text-[11px] text-warm-700">Avg. Morning Drop-off</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center rounded-none p-4 sm:p-6 lg:p-8">
          <img
            src={heroDishImg}
            alt="Healthy Salmon Bowl"
            className="aspect-[4/3] h-auto w-full max-w-md rounded-[1.5rem] object-cover shadow-xl sm:aspect-square lg:max-w-xl"
          />
		</div>
    </div>
    </section>
  );
}

export default HeroSection;