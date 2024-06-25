import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function SearchBar({ onSearch, placeholder = "Search anything . . ." }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the local state
    onSearch(query); // Trigger the search with the updated query
  };

  return (
    <div className="relative flex gap-2 bg rounded-xl items-center p-1 w-full">
      <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-2 ml-2 pointer-events-none">
        <FaMagnifyingGlass />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={null || handleSearchChange} // Update the state and trigger search on input change
        name="search"
        placeholder={placeholder || "Search anything . . ."} // Use provided placeholder or default to the specified one
        className="block w-full p-3 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
        required
      />
    </div>
  );
}

export default SearchBar;
