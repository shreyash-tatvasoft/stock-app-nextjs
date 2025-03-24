"use client"

import React, { useState } from 'react'


interface SearchFormProps {
    handleSubmit : (searchVal : string) => Promise<void>
    handleClearSearch : () => Promise<void>
}

const Searchform :React.FC<SearchFormProps> = ({ handleSubmit, handleClearSearch }) => {
    const [query, setQuery] = useState("")

    const handleSearch = () => {
        handleSubmit(query.trim())
    }

    const handleClear = () => {
        setQuery("")
        handleClearSearch()
    }

  return (
    <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-lg w-full my-2">
      <input
        type="text"
        name="searchVal"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query && (
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Clear
        </button>
      )}
      <button
        onClick={handleSearch}
        disabled={query.trim() === ""}
        className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Search
      </button>
    </div>
  );
}

export default Searchform