import './App.css'
import { Navbar } from './layouts/Navbar'
import { ThemeProvider } from './themes/ThemeProvider'
import HeroSection from './features/example/home/components/heroSection'
import TestimonialsSection from './features/example/home/components/TestimonialsSection'
function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-warm-50">
        <Navbar />
        <HeroSection />
        <TestimonialsSection/>
      </main>
    </ThemeProvider>
  )
}

export default App
