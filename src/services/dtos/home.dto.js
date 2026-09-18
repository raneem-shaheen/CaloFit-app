export function formatHeroFeedback(feedBackList = [], summary = {}) {
  const avatars = feedBackList
    .filter((feedback) => feedback?.user?.avatar)
    .slice(0, 3)
    .map((feedback, index) => ({
      id: feedback.id || feedback.user.id || `avatar-${index}`,
      avatar: feedback.user.avatar,
      name: feedback.user.name || 'Customer testimonial',
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
    const testimonial = item || {}
    let avatarUrl = testimonial.user?.avatar
    if (avatarUrl && !/^https?:\/\//i.test(avatarUrl)) {
      avatarUrl = `https://verbose-cornhusk-aptitude.ngrok-free.dev${avatarUrl}`
    }

    return {
      id: testimonial.id || index,
      rating: Math.max(1, Math.min(5, Number(testimonial.rating) || 5)),
      comment: testimonial.comment || testimonial.feedback || testimonial.message || 'The quality and freshness of the food has exceeded all my expectations every single day.',
      userName: testimonial.user?.name || 'Happy Customer',
      userRole: testimonial.user?.role || 'Verified Buyer',
      userAvatar: avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    }
  })
}