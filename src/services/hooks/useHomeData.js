import { useEffect, useState } from 'react'
import { formatHeroFeedback, formatTestimonials, formatPureFeatures, formatSocialLinks } from '../dtos/home.dto'
import { fetchContactUs, fetchHomeData } from '../home.service'

export function useHomeData() {
  const [heroData, setHeroData] = useState(null)
  const [testimonials, setTestimonials] = useState([])
  const [pureFeatures, setPureFeatures] = useState([])
  const [socialLinks, setSocialLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [rawData, contactData] = await Promise.all([
          fetchHomeData(),
          fetchContactUs(),
        ])
        const homeData = Array.isArray(rawData)
          ? rawData
          : rawData?.data || rawData?.pure || []
        const feedback = rawData?.feedBack || []
        setHeroData(formatHeroFeedback(feedback, rawData?.summary))
        setTestimonials(formatTestimonials(feedback))
        setPureFeatures(formatPureFeatures(homeData))
        setSocialLinks(formatSocialLinks(contactData))
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  return { heroData, testimonials, pureFeatures, socialLinks, loading }
}
