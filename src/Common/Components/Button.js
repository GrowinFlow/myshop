import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Button(props) {
  const { type, styleClass, icon, onClick, text, link } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      className={`flex focus:outline-none text-white bg-orange-700 dark:bg-orange-400 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 md:px-5 py-1 md:py-2.5 dark:focus:ring-yellow-900 ${styleClass}`}
      onClick={handleClick || onClick}
    >
      <span>{text}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}

export default Button;
