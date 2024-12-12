import React, { useState, useEffect, useRef } from "react";

const CustomTooltip = ({
  children,
  content,
  position = 'top',
  className = '',
  trigger = 'hover', // Can be 'hover' or 'click'
  delay = 0,
  tooltipClassName = '',
  zIndex = 'z-100',
  customStyles = {},
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  defaultIsOpen = false,
}) => {
  const [isVisible, setIsVisible] = useState(defaultIsOpen);
  const [showTimeout, setShowTimeout] = useState(null);
  const tooltipRef = useRef(null);

  // Manage visibility based on controlled prop
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsVisible(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Manage visibility based on internal state
  useEffect(() => {
    if (isVisible && onOpen) onOpen();
    if (!isVisible && onClose) onClose();
  }, [isVisible]);

  const showTooltip = () => {
    if (delay) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      setShowTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    clearTimeout(showTimeout);
    setIsVisible(false);
  };

  useEffect(() => {
    if (trigger === 'click') {
      const handleClickOutside = (event) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
          hideTooltip();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [trigger]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const tooltipClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    left_top: 'right-full top-1/2 transform -translate-y-12 mr-2',
    left_bottom: 'right-full top-1/2 transform translate-y-2 mr-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    right_top: 'left-full top-1/2 transform -translate-y-12 ml-2',
    right_bottom: 'left-full top-1/2 transform translate-y-12 ml-2',
  };

  return (
    <div
      className={`relative  ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={tooltipRef}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute trans-ani w-auto h-auto rounded-md bg-gray-200 dark:bg-gray-800 ${zIndex} ${tooltipClasses[position]} ${tooltipClassName}`}
          style={customStyles}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
