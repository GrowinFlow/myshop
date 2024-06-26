import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Toast = ({ show, type, message, onClose }) => {
    if (!show) return null;

    let icon, bgColor;
    switch (type) {
        case 'success':
            icon = <FaCheckCircle className="mr-2" />;
            bgColor = 'bg-green-400';
            break;
        case 'error':
            icon = <FaExclamationTriangle className="mr-2" />;
            bgColor = 'bg-red-500';
            break;
        default:
            icon = <FaInfoCircle className="mr-2" />;
            bgColor = 'bg-yellow-500';
    }

    return (
        <div className={`toast fixed bottom-0 right-0 m-6 z-[900000000] rounded-lg overflow-hidden text-white ${bgColor}`}>
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    {icon}
                    <span>{message}</span>
                </div>
                <button onClick={onClose} className="ml-4 font-bold"><FaTimes /></button>
            </div>
            <div className="border-b relative border-none"><div className="b border-b-2 border-white"></div></div>
        </div>
    );
};

Toast.propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Toast;
