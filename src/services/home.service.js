export async function fetchHomeData() {
  const response = await fetch('/api/home')

  if (!response.ok) {
    throw new Error(`Home request failed with status ${response.status}`)
  }

  const result = await response.json()
  return result.data
}
