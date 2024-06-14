// ConfirmToast.js

import React from 'react';
import { FaTrash } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

function ConfirmToast({ title, message, onConfirm, onCancel, onClose }) {
  return (
    <div 
      id="toast-interactive" 
      className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" 
      role="alert"
    >
      <div className="flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
          <FaTrash className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Trash icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
          <div className="mb-2 text-sm font-normal">{message}</div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <button 
                onClick={onConfirm} 
                className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Yes
              </button>
            </div>
            <div>
              <button 
                onClick={onCancel} 
                className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
        <button 
          type="button" 
          className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
          aria-label="Close" 
          onClick={onClose}
        >
          <span className="sr-only">Close</span>
          <FaTimes className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default ConfirmToast;
