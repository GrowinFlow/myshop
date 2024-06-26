import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaAlignLeft } from 'react-icons/fa';
import { isImageUrl } from '../../lib/helper';


const TagCloud = ({
  icon: Icon = FaAlignLeft,
  placeholder = "Type tags separated by commas and press Enter",
  limit = 10,
  initialTags = [],
  onTagsChange,
}) => {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState('');
  const [editingTagIndex, setEditingTagIndex] = useState(null);
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
    } else if (e.key === 'Backspace' && inputValue === '') {
      e.preventDefault();
      editPreviousTag();
    }
  };

  const addTagsFromInput = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      const newTags = trimmedValue
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');
      let updatedTags = [...tags];

      if (editingTagIndex !== null) {
        updatedTags[editingTagIndex] = newTags[0];
        updatedTags = [...updatedTags, ...newTags.slice(1)];
        setEditingTagIndex(null);
      } else {
        updatedTags = [...tags, ...newTags.slice(0, limit - tags.length)];
      }

      setTags(updatedTags);
      onTagsChange(updatedTags);
      setInputValue('');
    }
  };

  const editPreviousTag = () => {
    if (tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      setInputValue(lastTag);
      setEditingTagIndex(tags.length - 1);
      setTags(tags.slice(0, -1));
      inputRef.current.focus();
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onTagsChange(newTags);
  };

  const handleEditTag = (index) => {
    setInputValue(tags[index]);
    setEditingTagIndex(index);
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    inputRef.current.focus();
  };

  return (
    <div className="bg p-2 w-full max-h-48 rounded-xl themeText overflow-y-auto">
      <div className="relative flex flex-wrap items-start p-2 w-full rounded-xl themeGlassBg overflow-y-auto">
        <div className="absolute z-10 inset-y-0 left-0 flex items-start top-4 ps-3 ml-2 pointer-events-none">
          {Icon && <Icon />}
        </div>
        <div className="flex flex-wrap gap-1 items-center w-full pl-10 pr-4 py-1 bg-transparent border-none focus:outline-none text-ellipsis">
          {tags.map((keyword, index) => (
            <div
              key={index}
              className="tag themeGlassBg rounded-lg p-1 flex items-start cursor-pointer"
              onClick={() => handleEditTag(index)}
            >
              {isImageUrl(keyword) ? (
                <img
                  src={keyword}
                  alt="Tag"
                  className="max-w-40 max-h-20 rounded-lg"
                />
              ) : (
                <span className="text-sm max-w-40 max-h-20 overflow-x-hidden overflow-y-auto break-words">
                  {keyword}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTag(index);
                }}
                className="ml-2 text-red-700 dark:text-red-500"
              >
                &times;
              </button>
            </div>
          ))}
          {tags.length < limit && (
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder={placeholder}
              className="flex-1 p-1 bg-transparent themeText border-none focus:outline-none placeholder-gray-400 dark:placeholder-gray-200 overflow-y-auto dark:focus:ring-transparent dark:focus:border-transparent min-h-8  min-w-24 resize-y"
              rows={1}
            />
          )}
        </div>
      </div> 
    </div>
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
