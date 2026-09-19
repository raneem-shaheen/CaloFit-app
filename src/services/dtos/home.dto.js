const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
const DEFAULT_AVATARS = [
  DEFAULT_AVATAR,
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
]
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