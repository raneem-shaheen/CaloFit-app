export async function fetchHomeData() {
  const response = await fetch('/api/home')

  if (!response.ok) {
    throw new Error(`Home request failed with status ${response.status}`)
  }

  const result = await response.json()
  return result.data
}

export async function fetchContactUs() {
  const response = await fetch('/api/home/contact-us')

  if (!response.ok) {
    throw new Error(`Contact us request failed with status ${response.status}`)
  }

  const result = await response.json()
  return result.data ?? result
}
