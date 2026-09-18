import { useEffect, useState } from 'react'
import { formatHeroFeedback, formatTestimonials } from '../dtos/home.dto'
import { fetchHomeData } from '../home.service'

export function useHomeData() {
  const [heroData, setHeroData] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHomeData() {
      try {
        const rawData = await fetchHomeData()
        const feedback = rawData?.feedBack || []
        setHeroData(formatHeroFeedback(feedback, rawData?.summary))
        setTestimonials(formatTestimonials(feedback))
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  return { heroData, testimonials, loading }
}
