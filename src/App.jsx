import './App.css'
import { Navbar } from './layouts/Navbar'
import { ThemeProvider } from './themes/ThemeProvider'
import HeroSection from './features/example/home/components/heroSection'
import TestimonialsSection from './features/example/home/components/TestimonialsSection'
import PureSection from './features/example/home/PureSection'
import Footer from './features/example/home/components/Footer'
function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-warm-50">
        <Navbar />
        <HeroSection />
        <PureSection />
        <TestimonialsSection/>
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App
