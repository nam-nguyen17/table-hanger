import React, { useState } from 'react'
import Button from '../button/Button'
import './style.css'

interface SearchProps {
  onSearch: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    onSearch(searchValue)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSearch()
  }

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input
        className="searchBar input"
        type="text"
        placeholder="Search by name"
        value={searchValue}
        onChange={handleInputChange}
      />
      <Button type="submit" className="searchBar button">
        Search
      </Button>
    </form>
  )
}

export default Search
