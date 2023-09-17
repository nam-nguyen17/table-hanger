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

export function filterData<T>(
  data: T[],
  searchQuery: string,
  filters: (keyof T)[]
): T[] {
  if (!searchQuery) {
    return data
  }

  const lowerCaseQuery = searchQuery.toLowerCase()
  return data.filter((item) =>
    filters.some((key) =>
      String(item[key]).toLowerCase().includes(lowerCaseQuery)
    )
  )
}
