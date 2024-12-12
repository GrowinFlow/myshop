import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CustomAccordion = ({
  items,
  defaultOpenKey = null,
  onToggle,
  customClass = "",
}) => {
  const [openKey, setOpenKey] = useState(defaultOpenKey);

  const handleToggle = (key) => {
    const newOpenKey = openKey === key ? null : key;
    setOpenKey(newOpenKey);
    if (onToggle) {
      onToggle(newOpenKey);
    }
  };

  return (
    <div className={`overflow-hidden bg-glassl dark:bg-glassd  backdrop-blur-sm rounded-xl p-4 ${customClass}`}>
      {items.map(({ key, title, content }) => (
        <div key={key}>
          <button
            onClick={() => handleToggle(key)}
            className={`flex justify-between items-center w-full p-3 bg-glassl dark:bg-glassd hover:backdrop-blur-sm focus:outline-none transition-colors ${
              openKey === key ? ' backdrop-blur-sm px-4 rounded-t-xl' : 'rounded-xl'
            }`}
          >
            <span className={`text-lg font-semibold ${openKey === key ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
              {title}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {openKey === key ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          <div
            className={`transition-all duration-300 ease-out overflow-hidden mb-1 ${
              openKey === key ? 'max-h-96 ' : 'max-h-0 py-0'
            }`}
          >
            <div className="text-gray-800 dark:text-white p-2 px-6  backdrop-blur-sm rounded-b-xl">
              {content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

CustomAccordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  defaultOpenKey: PropTypes.string,
  onToggle: PropTypes.func,
  customClass: PropTypes.string,
};

export default CustomAccordion;


// use 

// const items = [
//   {
//     key: "1",
//     title: "Accordion 1",
//     content: (
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//       </p>
//     ),
//   },
//   {
//     key: "2",
//     title: "Accordion 2",
//     content: (
//       <p>
//         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//       </p>
//     ),
//   },]
{/* <CustomAccordion
items={items}
defaultOpenKeys={["1"]}
multiple
onToggle={(keys) => console.log("Toggled keys:", keys)}
customClass="my-custom-accordion"
/> */}