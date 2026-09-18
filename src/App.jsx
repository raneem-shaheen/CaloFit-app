import './App.css'
import { Navbar } from './layouts/Navbar'
import { ThemeProvider } from './themes/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-warm-50">
        <Navbar />
      </main>
    </ThemeProvider>
  )
}

export default App
