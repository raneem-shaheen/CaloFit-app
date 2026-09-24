import { useEffect, useState } from 'react'
import { fetchHomeData } from '../services/home.service'
import { formatHeroFeedback } from '../services/dtos/home.dto'

export function useHomeData() {
  const [heroData, setHeroData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHomeData() {
      try {
        const rawData = await fetchHomeData()
        setHeroData(formatHeroFeedback(rawData?.feedBack, rawData?.summary))
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  return { heroData, loading }
}
