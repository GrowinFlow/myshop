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
        <button id="theme-toggle" onClick={toggleTheme}>
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
