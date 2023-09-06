export async function fetchData<T>(url: string): Promise<T[]> {
  try {
    const response = await fetch(url)
    const data: T[] = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error)
    return []
  }
}
