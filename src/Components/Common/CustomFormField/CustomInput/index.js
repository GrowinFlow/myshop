import React, { useState, useEffect, useRef } from "react";
import { useField } from "formik";
import { replaceSpacesAndHyphens } from '../../../../lib/helper'; // Import utility if needed
import { FaEyeSlash, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

function CustomInput({ label, labelStyle, isRequired, classNames, isDisabled, icon, type = "text", ...props }) {
  const [field, meta, helpers] = useField(props);
  const [isPasswordVisible, setIsPasswordVisible] = useState(type === "password" ? false : true);
  const errorField = useRef(null);
  const [charCount, setCharCount] = useState(field.value.length || 0);
  const maxLength = props.maxLength || 200;

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

  const handleTogglePassword = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const handleTextareaChange = (e) => {
    setCharCount(e.target.value.length);
    helpers.setValue(e.target.value);
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label
          htmlFor={replaceSpacesAndHyphens(label)}
          className={`block text-sm font-medium capitalize ${labelStyle || "text-gray-800 dark:text-white"}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <>
            <textarea
              id={replaceSpacesAndHyphens(label)}
              {...field}
              {...props}
              required={isRequired}
              disabled={isDisabled}
              maxLength={maxLength}
              onChange={handleTextareaChange}
              className={`w-full h-28 max-h-36 px-3 py-2 rounded-lg dark:placeholder-gray-400 text-gray-800 dark:text-white ${meta.touched && meta.error ? "border-red-600 dark:border-red-600" : "border-orange-700 dark:border-orange-400 border"} ${isDisabled ? "bg-gray-100 dark:bg-gray-900 cursor-not-allowed" : "bg-glassl dark:bg-glassd "} ${classNames} focus:ring-0`}
            ></textarea>
            <div className="flex items-center justify-between">
              {meta.touched && meta.error ? (
                <div
                  ref={errorField}
                  className={`text-xs text-red-600 dark:text-red-600 mt-1 w-[80%] text-ellipsis overflow-hidden ${meta.touched && meta.error ? "error-slide-in" : "error-slide-out"}`}
                >
                  {meta.error}
                </div>
              ):(<div className="w-[80%]"></div>)}
              <div className="text-right text-xs text-gray-600 dark:text-gray-400 mt-1">
                {charCount}/{maxLength}
              </div>
            </div>
          </>
        ) : (
          <input
            id={replaceSpacesAndHyphens(label)}
            {...field}
            {...props}
            type={type === "password" && !isPasswordVisible ? "password" : "text"}
            required={isRequired}
            disabled={isDisabled}
            className={`w-full px-3 py-2 rounded-lg dark:placeholder-gray-400 text-gray-800 dark:text-white ${meta.touched && meta.error ? "border-red-600 dark:border-red-600" : "border-orange-700 dark:border-orange-400 border"} ${isDisabled ? "bg-gray-100 dark:bg-gray-900 cursor-not-allowed" : "bg-glassl dark:bg-glassd "} ${classNames} focus:ring-0`}
          />
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-white"
          >
            {isPasswordVisible ? (
              <FaRegEye />
            ) : (
              <FaRegEyeSlash />
            )}
          </button>
        )}
        {icon && type !== "password" && (
          <img src={icon} className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" alt="" />
        )}
      </div>
      {meta.touched && meta.error && type !== "textarea" && (
        <div
          ref={errorField}
          className={`text-xs text-red-600 dark:text-red-600 mt-1 ${meta.touched && meta.error ? "error-slide-in" : "error-slide-out"}`}
        >
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;



// use 

{/* <CustomInput
label="password"
name="password"
type="password"
placeholder="Enter your password"
isRequired={true}
minLength={4}
/>
<CustomInput
label="msg"
name="msg"
type="textarea"
placeholder="Enter your message"
isRequired={true}
minLength={10}
maxLength={540}
/> */}