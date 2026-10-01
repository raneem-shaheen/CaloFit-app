import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../stores/AuthContext'

export default function AuthPage({ isOpen, onClose }) {
 
  const { login, register, loading } = useAuth()

  const [isLoginMode, setIsLoginMode] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const resetForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setAvatarFile(null)
    setErrorMsg('')
  }

  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    return emailRegex.test(String(val).trim().toLowerCase())
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  
  if (!isOpen) return null


  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.')
      return
    }

    try {
      if (isLoginMode) {
        await login({ email, password })
      } else {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if (avatarFile) {
          formData.append('avatar', avatarFile)
        }
        await register(formData)
      }

      resetForm()

      if (typeof onClose === 'function') {
        onClose()
      }
    } catch (err) {
      setErrorMsg(err.message)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto sm:p-6">
      
      <button
        type="button"
        onClick={onClose}
        className="fixed top-6 right-6 text-white/70 hover:text-white bg-black/40 hover:bg-black/70 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer z-[10000] text-xl font-bold"
      >
        ✕
      </button>

      
      <div className="relative my-auto w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
   
        <div className="w-full shrink-0 md:w-5/12 bg-emerald-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-800/40 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
                🥗
              </div>
              <span className="font-bold tracking-widest text-sm text-emerald-100 uppercase">
                CaloFit
              </span>
            </div>

            <span className="text-[11px] font-semibold tracking-wider text-emerald-300 uppercase bg-emerald-800/60 px-3 py-1 rounded-full inline-block mb-4">
              Member Benefits
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug mb-6 text-white">
              Nourish your best <br /> self every day.
            </h2>

            <ul className="space-y-4 text-xs sm:text-sm text-emerald-100/90 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Free priority morning delivery before 7 AM</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Personalized macro & calorie targets</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Pause, skip, or cancel your plan anytime</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-emerald-800/60 text-[11px] text-emerald-300/80">
            Trusted by 10,000+ athletes, founders, and health enthusiasts nationwide.
          </div>
        </div>

   
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center overflow-visible">
          <div className="max-w-md w-full mx-auto">
            <span className="text-[10px] font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase inline-block mb-3">
              {isLoginMode ? 'Welcome Back' : 'Get Started'}
            </span>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {isLoginMode ? 'Sign in to your account' : 'Create your account'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {isLoginMode
                ? 'Manage deliveries, reorder favorite meals, and update your nutrition plan.'
                : 'Join us today to set your calorie goals and order custom macro meals.'}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>🌐</span> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span></span> Apple
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-[10px] tracking-wider text-gray-400 uppercase font-semibold absolute">
                Or with email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-700 uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold tracking-wider text-gray-700 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@calofit.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold tracking-wider text-gray-700 uppercase">
                    Password
                  </label>
                  {isLoginMode && (
                    <a href="#forgot" className="text-xs font-semibold text-gray-500 hover:text-emerald-700">
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {!isLoginMode && (
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-700 uppercase mb-1.5">
                    Profile Avatar (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatarFile(e.target.files[0] || null)}
                    className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading
                  ? 'Processing...'
                  : isLoginMode
                  ? 'Sign In to Account'
                  : 'Create My Account'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>{isLoginMode ? 'No account yet?' : 'Already have an account?'}</span>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(!isLoginMode)
                  setErrorMsg('')
                }}
                className="font-bold text-gray-900 border border-gray-200 px-3.5 py-1.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {isLoginMode ? 'Create Account' : 'Sign In'}
              </button>
            </div>

            <p className="text-[10px] text-gray-400 text-center mt-6">
              By continuing, you agree to CaloFit's{' '}
              <a href="#terms" className="underline hover:text-gray-600">
                Terms
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-gray-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}