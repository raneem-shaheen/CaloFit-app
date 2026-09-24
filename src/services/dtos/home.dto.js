import { API_BASE_URL } from '../../config/env'

const BASE_API_URL = (API_BASE_URL || '').replace(/\/$/, '')




const normalizeDishOrPureAssetUrl = (url = '') => {
  if (typeof url !== 'string' || !url.trim()) return ''

  
  let cleanPath = url
    .replace(/^https?:\/\/[^/]+/i, '') 
    .replace(/^(0\.0\.0\.0|127\.0\.0\.1|localhost)(:\d+)?/i, '') 
    .trim()

  
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`
  }

  
  return cleanPath
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
    const formattedMacros = Array.isArray(dish?.marcos)
      ? dish.marcos
          .filter((m) => !/calories?|سعرات/i.test(String(m?.title?.en || m?.title?.ar || m?.title || '')))
          .map((m) => {
            return {
              title: m?.title?.en || m?.title?.ar || '',
              amount: m?.amount ?? 0,
              unit: m?.unit?.en || m?.unit?.ar || 'g',
            }
          })
      : []

    const formattedTags = Array.isArray(dish?.tags)
      ? dish.tags.map((t, tIndex) => {
          return {
            id: t?.id || `tag-${tIndex}`,
            name: t?.name?.en || t?.name?.ar || '',
            color: t?.color,
          }
        })
      : []

    const caloriesValue = (() => {
      const directCalories = Number(dish?.calories ?? dish?.calorie ?? 0)
      if (Number.isFinite(directCalories) && directCalories > 0) {
        return directCalories
      }

      const caloriesMacro = Array.isArray(dish?.marcos)
        ? dish.marcos.find((macro) => /calories?/i.test(String(macro?.title?.en || macro?.title?.ar || macro?.title || '')))
        : null

      if (caloriesMacro) {
        const numericCalories = Number(caloriesMacro.amount ?? 0)
        return Number.isFinite(numericCalories) && numericCalories > 0 ? numericCalories : null
      }

      const fallbackByName = /salad|سلطة/i.test(String(dish?.name?.en || dish?.name?.ar || ''))
        ? 410
        : /burger|برجر/i.test(String(dish?.name?.en || dish?.name?.ar || ''))
          ? 480
          : null

      return fallbackByName
    })()

    return {
      id: dish?.id || `dish-${index}`,
      name: dish?.name?.en || dish?.name?.ar || 'Signature Dish',
      description: dish?.description?.en || dish?.description?.ar || '',
      price: dish?.price ?? 0,
      currency: dish?.currency || '$',
      calories: caloriesValue,
      imageUrl: normalizeDishOrPureAssetUrl(dish?.imageUrl || dish?.image || dish?.image_url),
      macros: formattedMacros,
      tags: formattedTags,
    }
  })
}