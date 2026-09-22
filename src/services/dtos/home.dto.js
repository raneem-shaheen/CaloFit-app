const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
const DEFAULT_AVATARS = [
  DEFAULT_AVATAR,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
]
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

function formatIconUrl(icon) {
  if (typeof icon !== 'string' || !icon.trim()) return ''

  const iconPath = icon.replace(/^https?:\/\/0\.0\.0\.0:8080/, '')
  return iconPath.startsWith('/')
    ? `${API_BASE_URL}${iconPath}`
    : `${API_BASE_URL}/${iconPath}`
}

function formatAvatarUrl(avatar, index = 0) {
  if (!avatar || /\.heic(?:$|[?#])/i.test(avatar)) {
    return DEFAULT_AVATARS[index % DEFAULT_AVATARS.length]
  }

  const cleanedAvatar = avatar.replace('http://0.0.0.0:8080', '')
  return cleanedAvatar.startsWith('/') ? cleanedAvatar : `/${cleanedAvatar}`
}

export function formatHeroFeedback(feedBackList = [], summary = {}) {
  const avatars = feedBackList
    .slice(0, 3)
    .map((feedback, index) => ({
      id: feedback.id || feedback.user?.id || `avatar-${index}`,
      avatar: formatAvatarUrl(feedback.user?.avatar, index),
      name: feedback.user?.name || 'Customer testimonial',
    }))

  return {
    avatars,
    rating: summary.averageRating || 4,
    totalCount: summary.totalCount || 0,
  }
}
export function formatTestimonials(feedBackList = []) {
  if (!Array.isArray(feedBackList)) return []

  return feedBackList.slice(0, 3).map((item = {}, index) => {
    const parsedRating = Number(item.initialRating)
    const safeRating = Math.max(1, Math.min(5, Math.round(parsedRating) || 5))

    return {
      id: item.id || index,
      rating: safeRating,
      comment: item.feedback || 'Great experience with high quality meals.',
      userName: item.user?.name || 'Verified Customer',
      userAvatar: formatAvatarUrl(item.user?.avatar, index),
    }
  })
}

export function formatPureFeatures(pureList=[]){
  if(!Array.isArray(pureList)){
    return[]
  }
  return pureList.map((item,index)=>{
    
      const iconUrl = formatIconUrl(item?.icon)
      const title= item?.title?.en||""
      const description=item?.description?.en||""
      const baseColor = item?.color || "#15803D"
      const bgColor = `${baseColor}26`;


return {
  id: item?.id || index,
  icon: iconUrl,
  title: title,
  description: description,
  color: baseColor,
  bgColor: bgColor,
};
    }
  )
}
 export function formatSocialLinks(data) {
  const normalizeSource = (source) => {
    const normalizedSource = typeof source === "string" ? source.trim().toLowerCase() : "";
    return normalizedSource === "twitter" || normalizedSource === "x-twitter"
      ? "x"
      : normalizedSource;
  };
  
  if (Array.isArray(data)) {
    return data.map((item, index) => ({
      id: item?.id || `social-${index}`,
      link: typeof item?.link === "string" && item.link.trim() !== "" ? item.link : "#",
      source: normalizeSource(item?.source),
    }));
  }

 
  if (data && typeof data === "object") {
    return [
      {
        id: data?.id || "social-1",
        link: typeof data?.link === "string" && data.link.trim() !== "" ? data.link : "#",
        source: normalizeSource(data?.source),
      },
    ];
  }

  return [];
}