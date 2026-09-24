import React from "react"
import { useHomeData } from "../../../../services/hooks/useHomeData";

const SOCIAL_ICONS ={
    x:(
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    )
}
export default function Footer (){
  const { socialLinks, loading } = useHomeData()
    return(
        <>
        <footer className="bg-[#1C1B18] text-white pt-16 pb-12 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2D6A4F] text-white">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                <path d="M12 18v-4" />
              </svg>
            </span>
            <span className="font-extrabold tracking-wider text-lg">CALOFIT</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Fueling your ambition with chef-curated organic meals. Pure, wholesome nutrition delivered straight from local farms to your table.
          </p>
          <div className="mt-2">
            <label className="text-xs text-gray-400 block mb-2">
              Subscribe for weekly recipes & exclusive discounts
            </label>
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
                type="email"
                placeholder="Enter your email address..."
                className="bg-transparent border border-white/20 rounded-full px-4 py-2 text-xs w-full text-white placeholder-gray-500 focus:outline-none focus:border-[#2D6A4F]"
              />
              <button className="bg-[#2D6A4F] hover:bg-[#245740] text-white text-xs font-semibold px-5 py-2 rounded-full transition-colors">
                Join
              </button>
          </div>
                </div>
                <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-wider text-gray-300 uppercase">
            Pages
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition">Daily Menu</a></li>
            <li><a href="#" className="hover:text-white transition">Plan Builder</a></li>
            <li><a href="#" className="hover:text-white transition">Sign In</a></li>
            <li><a href="#" className="hover:text-white transition">Member Dashboard</a></li>
            <li><a href="#" className="hover:text-white transition">Checkout</a></li>
            <li><a href="#" className="hover:text-white transition">Track Delivery</a></li>
          </ul>
        </div>


        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-wider text-gray-300 uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-400">
            <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            <li><a href="#" className="hover:text-white transition">Meal Plans</a></li>
            <li><a href="#" className="hover:text-white transition">Subscription</a></li>
            <li><a href="#" className="hover:text-white transition">Account</a></li>
          </ul>
        </div>


        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold tracking-wider text-gray-300 uppercase">
            Follow Us
          </h4>
          <div className="flex items-center gap-4 mt-1">
            {loading ? (
              <div className="h-5 w-24 animate-pulse rounded bg-white/10" aria-label="Loading social links" />
            ) : (
              socialLinks.map((item) => (
                SOCIAL_ICONS[item.source?.trim().toLowerCase()] && item.link ? (
                  <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title={item.source}
                  >
                    {SOCIAL_ICONS[item.source.trim().toLowerCase()]}
                  </a>
                ) : null
              ))
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Verdant Organic Kitchen, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
                </div>
            </div>
        </footer>
        </>
    )
}