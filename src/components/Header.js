import React, { useState } from "react";

import SearchIcon from '../assets/search-icon.svg'

const Header = ({ handleSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');
  

  return (
    <div className="sticky text-gray-600 focus-within:text-gray-400 w-full mb-4">
        <div>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <img src={SearchIcon} alt="search icon" className="w-5" />
            </button>
          </span>
          <input
            className="py-3 text-base text-zinc-700 bg-zinc-300 focus:outline-none text-center w-full rounded-full"
            placeholder="Search"
            onChange={handleSearchChange}
            onClick={() => setSearchValue('')}
            value={searchValue}
          />
        </div>
      </div>
  )
}

export default Header