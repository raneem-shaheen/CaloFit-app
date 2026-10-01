import './App.css'
import { useState } from 'react'
import { Navbar } from './layouts/Navbar'
import { ThemeProvider } from './themes/ThemeProvider'
import HeroSection from './features/example/home/components/heroSection'
import PureSection from './features/example/home/components/PureSection'
import TestimonialsSection from './features/example/home/components/TestimonialsSection'
import TopSellingSection from './features/example/home/components/TopSellingSection'
import Footer from './features/example/home/components/Footer'
import { AuthProvider } from './stores/AuthContext'
import AuthPage from './features/example/home/components/AuthPage'
function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  return (
    <ThemeProvider>
      <AuthProvider>
      <main className="min-h-screen bg-warm-50">
        <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
        <HeroSection />
        <PureSection />
        <TestimonialsSection />
        <TopSellingSection />
        <Footer />
        <AuthPage isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </main>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
