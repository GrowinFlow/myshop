import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Button(props) {
  const { type, styleClass, icon, onClick, text, link, activeBtn=false } = props;
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
      className={`${activeBtn?" text-white bg-orange-700 dark:bg-orange-400":""} ring-2 ring-orange-600 dark:ring-orange-800 flex focus:outline-none active:backdrop:blur-md  active:ring-0 font-medium rounded-lg text-sm px-3 md:px-5 py-1 md:py-2.5  ${styleClass}`}
      onClick={handleClick || onClick}
    >
      <span>{text}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}

export default Button;
