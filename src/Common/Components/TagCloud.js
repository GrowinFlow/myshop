import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaAlignLeft } from 'react-icons/fa';

const TagCloud = ({ icon: Icon = FaAlignLeft, placeholder = "Type tags separated by commas and press Enter", limit = 10, initialTags = [], onTagsChange }) => {
    const [tags, setTags] = useState(initialTags);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setTags(initialTags);
    }, [initialTags]);

    const handleTagInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTagsFromInput();
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            e.preventDefault();
            removeLastTag();
        }
    }; 

    const addTagsFromInput = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            const newTags = trimmedValue.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            const combinedTags = [...tags, ...newTags.slice(0, limit - tags.length)];
            setTags(combinedTags);
            onTagsChange(combinedTags);
            setInputValue('');
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const removeLastTag = () => {
        const newTags = [...tags];
        newTags.pop();
        setTags(newTags);
        onTagsChange(newTags);
    };

    const handleRemoveTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
        onTagsChange(newTags);
    };

    return (
         <>
      <div className="bg p-2 w-full rounded-xl themeText overflow-hidden">
        <div className="relative flex flex-wrap items-center p-2 w-full h-[56px] rounded-xl themeGlassBg overflow-auto">
          <div className="absolute z-10 inset-y-0 left-0 flex items-center ps-3 ml-2 pointer-events-none">
            {Icon && <Icon />}
          </div>
          <div className="flex flex-wrap gap-1 items-center w-full pl-10 pr-4 py-1 bg-transparent border-none focus:outline-none text-ellipsis">
            {tags.map((keyword, index) => (
              <span key={index} className="tag themeGlassBg rounded-lg p-1 flex items-center text-wrap text-ellipsis">
                <span className="text-sm">{keyword}</span>
                <button type="button" onClick={() => handleRemoveTag(index)} className="ml-2 text-red-500">
                  &times;
                </button>
              </span>
            ))}
            {tags.length < limit && (
              <input
                ref={inputRef}
                value={inputValue}
                onChange={handleTagInputChange}
                onKeyDown={handleTagInputKeyDown}
                placeholder={placeholder}
                className="flex-1 p-1 bg-transparent themeText border-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-200"
              />
            )}
          </div>
        </div>
      </div>
    </>
    );
};

TagCloud.propTypes = {
    icon: PropTypes.elementType,
    placeholder: PropTypes.string,
    limit: PropTypes.number,
    initialTags: PropTypes.arrayOf(PropTypes.string),
    onTagsChange: PropTypes.func.isRequired,
};

export default TagCloud;
 