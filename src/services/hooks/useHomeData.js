import { useEffect, useState } from 'react'
import {
  formatHeroFeedback,
  formatTestimonials,
  formatPureFeatures,
  formatSocialLinks,
  formatSignatureDishes,
} from '../dtos/home.dto'
import { fetchContactUs, fetchHomeData } from '../home.service'

let homeRequestPromise = null
let contactRequestPromise = null
const HOME_CACHE_KEY = 'calofit.home-data'

const EMPTY_HOME_DATA = {
  heroData: null,
  testimonials: [],
  pureFeatures: [],
  socialLinks: [],
  dishes: [],
}

function readHomeCache() {
  if (typeof window === 'undefined') return EMPTY_HOME_DATA

  try {
    const cachedData = window.localStorage.getItem(HOME_CACHE_KEY)
    if (!cachedData) return EMPTY_HOME_DATA

    const parsedData = JSON.parse(cachedData)
    return {
      heroData: parsedData.heroData || null,
      testimonials: Array.isArray(parsedData.testimonials) ? parsedData.testimonials : [],
      pureFeatures: Array.isArray(parsedData.pureFeatures) ? parsedData.pureFeatures : [],
      socialLinks: Array.isArray(parsedData.socialLinks) ? parsedData.socialLinks : [],
      dishes: Array.isArray(parsedData.dishes) ? parsedData.dishes : [],
    }
  } catch (error) {
    console.error('[useHomeData] Failed to read cached home data:', error)
    return EMPTY_HOME_DATA
  }
}

function writeHomeCache(data) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(HOME_CACHE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('[useHomeData] Failed to cache home data:', error)
  }
}

function getHomeDataRequest() {
  if (!homeRequestPromise) {
    homeRequestPromise = fetchHomeData().finally(() => {
      homeRequestPromise = null
    })
  }

  return homeRequestPromise
}

function getContactRequest() {
  if (!contactRequestPromise) {
    contactRequestPromise = fetchContactUs().finally(() => {
      contactRequestPromise = null
    })
  }

  return contactRequestPromise
}

export function useHomeData() {
  const [cachedData] = useState(readHomeCache)
  const [heroData, setHeroData] = useState(cachedData.heroData)
  const [testimonials, setTestimonials] = useState(cachedData.testimonials)
  const [pureFeatures, setPureFeatures] = useState(cachedData.pureFeatures)
  const [socialLinks, setSocialLinks] = useState(cachedData.socialLinks)
  const [dishes, setDishes] = useState(cachedData.dishes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadHomeData() {
      try {
        const results = await Promise.allSettled([
          getHomeDataRequest(),
          getContactRequest(),
        ])

        const homeResult = results[0]
        const contactResult = results[1]
        const rawData = homeResult.status === 'fulfilled' ? homeResult.value : null
        const contactData = contactResult.status === 'fulfilled' ? contactResult.value : null

        if (homeResult.status === 'rejected') {
          console.error(
            '[useHomeData] Failed to load home data:',
            homeResult.reason?.response?.data || homeResult.reason?.message,
          )
        } else {
          console.log('[useHomeData] Home response:', rawData)
        }

        if (contactResult.status === 'rejected') {
          console.error(
            '[useHomeData] Failed to load contact data:',
            contactResult.reason?.response?.data || contactResult.reason?.message,
          )
        } else {
          console.log('[useHomeData] Contact response:', contactData)
        }

        const homeData = Array.isArray(rawData)
          ? rawData
          : Array.isArray(rawData?.pure)
            ? rawData.pure
            : Array.isArray(rawData?.data?.pure)
              ? rawData.data.pure
              : []
        const feedback = Array.isArray(rawData?.feedBack)
          ? rawData.feedBack
          : Array.isArray(rawData?.data?.feedBack)
            ? rawData.data.feedBack
            : []
        const summary = rawData?.summary || rawData?.data?.summary || {}
        const rawDishes = Array.isArray(rawData?.dishes)
          ? rawData.dishes
          : Array.isArray(rawData?.data?.dishes)
            ? rawData.data.dishes
            : []

        if (isMounted && homeResult.status === 'fulfilled') {
          const nextHomeData = {
            heroData: formatHeroFeedback(feedback, summary),
            testimonials: formatTestimonials(feedback),
            pureFeatures: formatPureFeatures(homeData),
            dishes: formatSignatureDishes(rawDishes),
          }
          setHeroData(nextHomeData.heroData)
          setTestimonials(nextHomeData.testimonials)
          setPureFeatures(nextHomeData.pureFeatures)
          setDishes(nextHomeData.dishes)
          writeHomeCache({
            ...readHomeCache(),
            ...nextHomeData,
          })
        }

        if (isMounted && contactResult.status === 'fulfilled') {
          const nextSocialLinks = formatSocialLinks(contactData)
          setSocialLinks(nextSocialLinks)
          writeHomeCache({
            ...readHomeCache(),
            socialLinks: nextSocialLinks,
          })
        }
      } catch (error) {
        console.error('[useHomeData] Unexpected load error:', error.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadHomeData()

    return () => {
      isMounted = false
    }
  }, [])

  return { heroData, testimonials, pureFeatures, socialLinks, dishes, loading }
}
