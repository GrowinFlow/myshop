import React from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';

function ConfirmToast({ title, message, onConfirm, onCancel, onClose }) {
  return (
    <div 
      className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className="flex items-center">
        <div className="flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg flex items-center justify-center dark:text-blue-300 dark:bg-blue-900">
          <FaTrash className="w-4 h-4" aria-hidden="true" />
        </div>
        <div className="ms-3">
          <span className="block font-semibold text-gray-900 dark:text-white">{title}</span>
          <p className="text-sm">{message}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button 
              onClick={onConfirm}
              className="inline-flex justify-center w-full px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Yes
            </button>
            <button 
              onClick={onCancel}
              className="inline-flex justify-center w-full px-3 py-1.5 text-xs font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              No
            </button>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto -mr-1.5 -mt-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          aria-label="Close"
        >
          <FaTimes className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmToast;
