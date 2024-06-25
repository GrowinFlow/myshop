import React, { useState, useRef } from 'react';
import { FaAlignLeft } from 'react-icons/fa';

const TagInput = () => {
  const [tag, setTag] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleTagInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === '') {
      removeLastTagIfEmptyInput();
    }
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      editLastTag();
    }
  };
console.log(tag)
  const addKeyword = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tag.includes(trimmedValue)) {
      setTag([...tag, trimmedValue]);
      setInputValue('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const removeKeyword = (index) => {
    const newtag = [...tag];
    newtag.splice(index, 1);
    setTag(newtag);
  };

  const editLastTag = () => {
    if (tag.length > 0) {
      const lastKeyword = tag.pop();
      setInputValue(lastKeyword);
      setTag(tag);
      if (inputRef.current) {
        inputRef.current.value = lastKeyword;
      }
    }
  };

  const removeLastTagIfEmptyInput = () => {
    if (tag.length > 0 && inputValue === '') {
      const newtag = [...tag];
      newtag.pop();
      setTag(newtag);
    }
  };

  return (
    <>
      <div className="bg p-2 w-full rounded-xl themeText overflow-hidden">
        <div className="relative flex flex-wrap items-center p-2 w-full rounded-xl themeGlassBg overflow-auto">
          <div className="absolute z-10 inset-y-0 left-0 flex items-center ps-3 ml-2 pointer-events-none">
            <FaAlignLeft />
          </div>
          <div className="flex flex-wrap items-center w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none text-ellipsis">
            {tag.map((keyword, index) => (
              <span key={index} className="tag themeGlassBg rounded-lg p-1 flex items-center mx-1 my-1 text-wrap line-clump-1  text-ellipsis ">
                <span className="text-sm text-wrap flex flex-wrap">{keyword}</span>
                <button type="button" onClick={() => removeKeyword(index)} className="ml-2 text-red-500">
                  &times;
                </button>
              </span> 
            ))}
            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Type tag separated by commas and press Enter"
              className="flex-1 p-1 bg-transparent themeText border-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-200"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TagInput;
