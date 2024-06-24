import React from 'react';

function Button(props) {
  const { type, styleClass, order, icon, onClick, text } = props;

  return (
    <button
      type={type} 
      className={`flex focus:outline-none text-white bg-orange-700 dark:bg-orange-400 focus:ring-2 focus:ring-orange-300 font-medium rounded-lg text-sm px-3 md:px-5 py-1 md:py-2.5 dark:focus:ring-yellow-900 ${styleClass}`}
      onClick={onClick} // Directly pass onClick handler here
    >
      <span className={order}>{text}</span> {/* Use className instead of order for text */}
      <span className={order || "order-2"}>{icon}</span> {/* Use className instead of order for icon */}
    </button>
  );
}

export default Button;
