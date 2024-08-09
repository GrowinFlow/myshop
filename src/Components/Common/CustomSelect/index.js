import React, { useState, useRef, useEffect } from "react";
import CustomSearchInput from "../CustomFormField/CustomSearchInput";
import { FaX } from "react-icons/fa6";

const CustomSelect = ({
  name,
  label,
  labelStyle,
  options = [],
  defaultValue = [],
  width = "220px",
  isMulti = false,
  onChange,
  searchable = false,
  clearOnChange = false,
  selectedOption = "",
  optionStyle = "",
  checkedStyle = "",
  selectPlaceholder = "select placeholder" || selectPlaceholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(defaultValue);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedOptions(defaultValue);
  }, [defaultValue]);

  const handleOptionClick = (option) => {
    if (isMulti) {
      setSelectedOptions((prevSelected) => {
        const isSelected = prevSelected.some(o => o.value === option.value);
        const newSelected = isSelected
          ? prevSelected.filter(o => o.value !== option.value)
          : [...prevSelected, option];

        if (onChange) {
          onChange(newSelected);
        }

        return newSelected;
      });
    } else {
      setSelectedOptions([option]);
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    }
  };

  const handleClear = () => {
    setSelectedOptions([]);
    setSearchTerm("");
    if (onChange) {
      onChange([]);
    }
  };

  const handleClearOption = (option) => {
    setSelectedOptions(prevSelected => {
      const newSelected = prevSelected.filter(o => o.value !== option.value);
      if (onChange) {
        onChange(isMulti ? newSelected : []);
      }
      return newSelected;
    });
  };

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div ref={containerRef} className="relative w-full" style={{ width }}>
      {label && (
        <label className={`block text-sm font-medium capitalize ${labelStyle || "text-gray-800 dark:text-white"}`}>
          {label}
        </label>
      )}

      <div 
        className={`border rounded-lg p-2 cursor-pointer ${isOpen ? 'dark:border-orange-400 border-orange-600' : 'dark:border-orange-400 border-orange-600'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isMulti ? (
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <div key={option.value} className={`flex items-center bg-orange-600 dark:bg-orange-400 text-white px-2 py-1 rounded ${selectedOption}`}>
                  <span>{option.label}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearOption(option);
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-red-400 dark:hover:bg-red-600 shadow-xl"
                  >
                    <FaX className="text-white text-[8px]" />
                  </button>
                </div>
              ))
            ) : (
              <span className="text-gray-400 dark:text-gray-500">{selectPlaceholder}</span>
            )}
          </div>
        ) : (
          <div className="flex items-center">
            {selectedOptions.length > 0 ? (
              <>
                <div className="flex justify-between items-center px-1 w-full">
                  <span className={`text-gray-800 dark:text-white ${selectedOption}`}>{selectedOptions[0].label}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearOption(selectedOptions[0]);
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-red-400 dark:hover:bg-red-600 shadow-xl"
                  >
                    <FaX className="text-gray-500 dark:text-gray-300 text-xs text-bold" />
                  </button>
                </div>
              </>
            ) : (
              <span className="text-gray-400 dark:text-gray-500">{selectPlaceholder}</span>
            )}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full max-h-72 mt-1 bg-gray-200 dark:bg-gray-800 border rounded-lg shadow-lg z-10 dark:border-orange-400 border-orange-600 overflow-y-auto flex flex-col">
          {searchable && (
            <CustomSearchInput
              placeholder="Search..."
              filterValue={searchTerm}
              setFilterValue={setSearchTerm}
              onSearchChange={setSearchTerm}
              onClear={handleClear}
              clearButtonColor="text-white"
              classNames="mb-2"
            />
          )}
          <div className="max-h-72 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-2 text-gray-500 dark:text-gray-400 bg-glassl dark:bg-glassd flex justify-center items-center overflow-hidden">
                No options found
              </div>
            ) : (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  className={`p-2 cursor-pointer bg-glassl dark:bg-glassd hover:bg-gray-200 dark:hover:bg-gray-800 backdrop:blur-3xl ${optionStyle} ${selectedOptions.some(o => o.value === option.value) ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {isMulti ? (
                    <input
                      type="checkbox"
                      name={name}
                      value={option.value}
                      checked={selectedOptions.some(o => o.value === option.value)}
                      readOnly
                      className={`mr-2 ${checkedStyle}`}
                    />
                  ) : (
                    <input
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={selectedOptions.some(o => o.value === option.value)}
                      readOnly
                      className={`mr-2 ${checkedStyle}`}
                    />
                  )}
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
