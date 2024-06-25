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
        <button id="theme-toggle" onClick={toggleTheme} className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm rounded-lg focus:outline-none  hover:bg focus:ring-2 hover:bg md:focus:ring-0 dark:focus:ring-gray-200  focus:ring-gray-800  hover:shadow-lg themeShadow text-black dark:text-white dark:hover:shadow-md">
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
