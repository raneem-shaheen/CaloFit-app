import { useState } from 'react'

export function useHomeData() {
  const [heroData] = useState(null)
  const [loading] = useState(false)

  return { heroData, loading }
}
