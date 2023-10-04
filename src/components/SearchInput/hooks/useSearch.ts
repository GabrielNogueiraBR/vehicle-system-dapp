'use client'

import { useMemo, useState } from 'react'

function useSearch<T>(data: Array<T>) {
  const [search, setSearch] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const filteredData = useMemo(() => {
    setIsSearching(true)

    const filtered = data.filter((d) => {
      const stringData = JSON.stringify(d).toLowerCase()
      return stringData.includes(search.toLowerCase())
    })

    setIsSearching(false)
    return filtered
  }, [data, search])

  return { search, filteredData, setSearch, isSearching }
}

export default useSearch
