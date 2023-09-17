import React, { useState } from 'react'
import './style.css'

interface SearchProps {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchValue(query)
    onSearch(query)
  }

  return (
    <div className="searchBar">
      <input
        className="searchBar input"
        type="text"
        placeholder="Search by name"
        value={searchValue}
        onChange={handleInputChange}
        autoComplete="on"
      />
    </div>
  )
}

export default Search
