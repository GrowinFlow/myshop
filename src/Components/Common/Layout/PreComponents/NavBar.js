import React, { useState, useEffect } from 'react';
import NavItems from './NavItems'; 
import { FaChevronDown } from 'react-icons/fa';
import CustomTooltip from '../../CustomTooltip';

const NavBar = React.memo(({ routes, closeMenu }) => {
  const [visibleRoutesCount, setVisibleRoutesCount] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000 && window.innerWidth>300) {
        setVisibleRoutesCount(3); // Show fewer routes on smaller screens
      } else {
        setVisibleRoutesCount(14); // Show more routes on larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set the initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const visibleRoutes = routes.slice(0, visibleRoutesCount);
  const dropdownRoutes = routes.slice(visibleRoutesCount);

  return (
    <nav>
      <ul className="flex p-0 mt-4 font-medium border-gray-100 rounded-lg space-x-8 md:flex-row md:mt-0 border-0 bg-transparent dark:bg-transparent dark:border-gray-700 gap-0 flex-nowrap justify-between">
        {/* Render the visible routes directly */}
        {visibleRoutes.map((route, index) => (
          <NavItems
            key={index}
            label={route.label}
            link={route.path}
            closeMenu={closeMenu}
          />
        ))}

        {/* Render CustomTooltip for remaining routes if there are any */}
        {dropdownRoutes.length > 0 && (
          <div className="">
            <div className="absolute py-2">
              <CustomTooltip
                content={
                  <ul className="dropdown-menu p-2 w-36">
                    {dropdownRoutes.map((route, index) => (
                      <NavItems
                        key={index + visibleRoutesCount} // Ensure unique keys
                        label={route.label}
                        link={route.path}
                        closeMenu={closeMenu}
                        tooltipClassName="bg-red-500 p-4 w-full h-auto top-4"
                      />
                    ))}
                  </ul>
                }
                position="left_bottom"
                trigger="click"
                delay={100}
              >
                <span className='cursor-pointer text-balck dark:text-white'><FaChevronDown/></span>
              </CustomTooltip>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
});

export default NavBar;
