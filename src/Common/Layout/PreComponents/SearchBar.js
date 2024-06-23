import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
  

function SearchBar() {
  return (
    <>
                <div className="relative flex gap-2 bg rounded-xl items-center p-1 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-2 ml-2 pointer-events-none">
                <FaMagnifyingGlass />
              </div>
              <input
                type="search"
                name="search"
                placeholder="Search anything . . ."
                className="block w-full p-3 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required
              />
            </div>
    </>
  )
}

export default SearchBar