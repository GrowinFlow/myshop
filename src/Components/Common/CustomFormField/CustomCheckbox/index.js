import React, { useEffect, useRef } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { replaceSpacesAndHyphens } from '../../../../lib/helper'; // Adjust path if needed

function CustomCheckbox({ label, labelStyle, isRequired, classNames, isDisabled, ...props }) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  const errorField = useRef(null);

  useEffect(() => {
    if (errorField.current) {
      if (meta.touched && meta.error) {
        errorField.current.classList.remove("error-slide-out");
        errorField.current.classList.add("error-slide-in");
      } else {
        errorField.current.classList.remove("error-slide-in");
        errorField.current.classList.add("error-slide-out");
      }
    }
  }, [meta.touched, meta.error]);

  return (
    <div className="relative mb-4">
      <div className="flex items-center">
        <input
          id={replaceSpacesAndHyphens(label)}
          {...field}
          {...props}
          type="checkbox"
          required={isRequired}
          disabled={isDisabled}
          // className={`mr-2 rounded accent-orange-700 dark:accent-orange-400 ${meta.touched && meta.error ? "border-red-600 dark:border-red-600" : "border-orange-700 dark:border-orange-400 border"} ${isDisabled ? "bg-gray-100 dark:bg-gray-900 cursor-not-allowed" : ""} ${classNames} focus:ring-0`}
          className={`mr-2 rounded ${meta.touched && meta.error ? "border-red-600 dark:border-red-600" : "border-orange-700 dark:border-orange-400 border"} ${isDisabled ? "bg-gray-100 dark:bg-gray-900 cursor-not-allowed" : "bg-red-300"} ${classNames} focus:ring-0`}
        />
        <label
          htmlFor={replaceSpacesAndHyphens(label)}
          className={`text-sm font-medium capitalize ${labelStyle || "text-gray-800 dark:text-white"} ${isDisabled ? "cursor-not-allowed" : ""}`}
        >
          {label}
        </label>
      </div>
      {meta.touched && meta.error && (
        <div
          ref={errorField}
          className={`text-xs text-red-600 dark:text-red-600 mt-1 ${meta.touched && meta.error ? "error-slide-in" : "error-slide-out"}`}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
}

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  classNames: PropTypes.string,
};

export default CustomCheckbox;
