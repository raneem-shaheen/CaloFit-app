import { useNavigate } from 'react-router-dom'

export function useGoBack(fallback = '/') {
  const navigate = useNavigate()
  return () => (window.history.length > 1 ? navigate(-1) : navigate(fallback))
}
