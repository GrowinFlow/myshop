import React, { useContext, useEffect, useState, useRef } from 'react';
import userPlaceholder from '../../../assets/images/userPlaceholer.png';
import GlassCard from '../../Components/GlassCard';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../../lib/context/Auth';
import Avatar from './../../Components/Avatar';

function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse transition-all duration-300 ease-in">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-"
        id="user-menu-button"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        title='Profile'
      >
        <span className="sr-only">Open user menu</span>
        <div className="text-lg md:w-12 md:h-12 w-10 h-10 rounded-xl transition-all duration-300 ease-in">
          <Avatar
            styleClass="w-full h-full"
            avatar={user.profile.avatar || userPlaceholder}
            username={user.profile.username || "username"}
            avatarColor={user.profile.avatarColor || "user email"}
          /> 
        </div>
      </button>

      {/* Dropdown menu */}
      <div
        ref={dropdownRef}
        className={`absolute top-20 right-4 z-50 p-2 ${isOpen ? 'block' : 'hidden'} my-4 text-base list-none themeGlassBg divide-y divide-gray-100 rounded-lg shadow dark:divide-gray-600 flex flex-col gap-2 transition-all duration-300 ease-in`}
        id="user-dropdown"
      >
        <GlassCard>
          <div className="md:px-4 text-md px-2 py-1">
            <span className="block text-gray-900 dark:text-white">{user.username || 'User'}</span>
            <span className="block text-gray-500 truncate dark:text-gray-400">{user.email || 'user@email.com'}</span>
          </div>
        </GlassCard>
        <GlassCard>
          <ul className="py-1" aria-labelledby="user-menu-button">
            <li>
              <Link to="/profile" className="block md:px-4 md:py-2 text-sm px-2 py-1 text-gray-700 hover:text-orange-700 dark:hover:text-orange-400 font-bold dark:text-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <Link to="#" className="block md:px-4 md:py-2 text-sm px-2 py-1 text-gray-700 hover:text-orange-700 dark:hover:text-orange-400 font-bold dark:text-gray-200">
                Orders
              </Link>
            </li>
            <li>
              {user && (
                <Link to="#" onClick={handleLogout} className="block md:px-4 md:py-2 text-sm px-2 py-1 text-gray-700 hover:text-orange-700 dark:hover:text-orange-400 font-bold dark:text-gray-200">
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
