import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa6';



const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (localStorage.getItem('color-theme') === 'dark') {
            return true;
        }
        if (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button id="theme-toggle" onClick={toggleTheme} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  dark:hover:bg-gray-700 dark:focus:ring-gray-600 hover:shadow-lg shadow-[rgba(0,0,0,0.5)]] dark:shadow-[rgba(255,255,255,0.4)] text-black dark:text-white dark:hover:shadow-md">
            <span
                id="theme-toggle-dark-icon"
                className={!isDarkMode ? '' : 'hidden'}
            >
                <FaMoon />
            </span>
            <span
                id="theme-toggle-light-icon"
                className={isDarkMode ? '' : 'hidden'}
            >
                <FaSun />
            </span>
        </button>
    );
};

export default ThemeToggle;
