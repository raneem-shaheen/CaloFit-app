import { API_BASE_URL } from '../../config/env'

const BASE_API_URL = (API_BASE_URL || '').replace(/\/$/, '')




export const normalizeDishOrPureAssetUrl = (url = '') => {
  if (typeof url !== 'string' || !url.trim()) return ''

  const uploadsIndex = url.indexOf('/uploads')
  if (uploadsIndex !== -1) {
    return url.slice(uploadsIndex) 
  }
  
  let cleanPath = url
    .replace(/^https?:\/\/[^/]+/i, '') 
    .replace(/^(0\.0\.0\.0|127\.0\.0\.1|localhost)(:\d+)?/i, '') 
    .trim()

  
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`
  }

  if (BASE_API_URL) {
    return `${BASE_API_URL}${cleanPath}`
  }

  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
}


function formatAvatarUrl(avatar) {
  if (typeof avatar !== 'string' || !avatar.trim() || /\.heic(?:$|[?#])/i.test(avatar)) {
    return ''
  }


  const cleaned = avatar.replace(/^https?:\/\/[^/]+/i, '')
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

export function formatHeroFeedback(feedBackList = [], summary = {}) {
  if (!Array.isArray(feedBackList) || feedBackList.length === 0) return null

  const avatars = feedBackList
    .slice(0, 3)
    .map((feedback, index) => ({
      id: feedback.id || feedback.user?.id || `avatar-${index}`,
      avatar: formatAvatarUrl(feedback.user?.avatar),
      name: feedback.user?.name || '',
    }))

  return {
    avatars,
    rating: Number(summary?.averageRating) || 0,
    totalCount: Number(summary?.totalCount) || 0,
  }
}

export function formatTestimonials(feedBackList = []) {
  if (!Array.isArray(feedBackList)) return []

  return feedBackList.slice(0, 3).map((item = {}, index) => {
    const parsedRating = Number(item.initialRating)
    const safeRating = Math.max(0, Math.min(5, Math.round(parsedRating) || 0))

    return {
      id: item.id || index,
      rating: safeRating,
      comment: item.feedback || '',
      userName: item.user?.name || '',
      userAvatar: formatAvatarUrl(item.user?.avatar),
    }
  })
}

export function formatPureFeatures(pureList = []) {
  if (!Array.isArray(pureList)) {
    return []
  }

  return pureList.map((item, index) => {
    const iconValue = item?.icon || item?.iconUrl || item?.image || item?.imageUrl || ''
    const iconUrl = normalizeDishOrPureAssetUrl(iconValue)
    const title = item?.title?.en || item?.title || ''
    const description = item?.description?.en || item?.description || ''
    const baseColor = item?.color || '#15803D'
    const bgColor = `${baseColor}26`

    return {
      id: item?.id || index,
      icon: iconUrl,
      title: title,
      description: description,
      color: baseColor,
      bgColor: bgColor,
    }
  })
}

export function formatSocialLinks(data) {
  const normalizeSource = (source) => {
    const normalizedSource = typeof source === 'string' ? source.trim().toLowerCase() : ''
    return normalizedSource === 'twitter' || normalizedSource === 'x-twitter'
      ? 'x'
      : normalizedSource
  }

  if (Array.isArray(data)) {
    return data.map((item, index) => ({
      id: item?.id || `social-${index}`,
      link: typeof item?.link === 'string' && item.link.trim() !== '' ? item.link : '',
      source: normalizeSource(item?.source),
    }))
  }

  if (data && typeof data === 'object') {
    return [
      {
        id: data?.id || 'social-1',
        link: typeof data?.link === 'string' && data.link.trim() !== '' ? data.link : '',
        source: normalizeSource(data?.source),
      },
    ]
  }

  return []
}

export function formatSignatureDishes(dishesList = []) {
  if (!Array.isArray(dishesList)) return []

  return dishesList.map((dish, index) => {
    const rawMacros = Array.isArray(dish?.marcos) ? dish.marcos : []
    const formattedMacros = rawMacros
      .filter((m) => {
        const titleStr = `${m?.title?.en || ''} ${m?.title?.ar || ''}`.toLowerCase()
        return !titleStr.includes('calorie') && !titleStr.includes('سعرات')
      })
      .map((m) => ({
        title: m?.title?.en || m?.title?.ar || '',
        amount: m?.amount ?? 0,
        unit: m?.unit?.en || m?.unit?.ar || 'g',
      }))

    const rawTags = Array.isArray(dish?.tags) ? dish.tags : []
    const formattedTags = rawTags.map((t, tIndex) => ({
      id: t?.id || `tag-${tIndex}`,
      name: t?.name?.en || t?.name?.ar || '',
      color: t?.color || '#2D6A4F',
    }))

    const calMacro = rawMacros.find((m) => {
      const titleStr = `${m?.title?.en || ''} ${m?.title?.ar || ''}`.toLowerCase()
      return titleStr.includes('calorie') || titleStr.includes('سعرات')
    })

    const caloriesValue = calMacro?.amount ?? (index === 0 ? 350 : index === 1 ? 410 : 480)
    const rawImage = dish?.imageUrl || dish?.image || ''
    const safeImage = typeof normalizeDishOrPureAssetUrl === 'function'
      ? normalizeDishOrPureAssetUrl(rawImage)
      : rawImage

    return {
      id: dish?.id || `dish-${index}`,
      name: dish?.name?.en || dish?.name?.ar || 'Signature Dish',
      description: dish?.description?.en || dish?.description?.ar || '',
      price: Number(dish?.price ?? 0),
      currency: dish?.currency || '$',
      calories: caloriesValue,
      imageUrl: safeImage,
      macros: formattedMacros,
      tags: formattedTags,
    }
  })
}