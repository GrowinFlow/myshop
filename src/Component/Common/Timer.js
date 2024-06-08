// Timer.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GlassCard from './GlassCard';

const Timer = ({ days, hours }) => {
  // Convert days and hours to total seconds
  const initialSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60);
  
  // State to store the remaining time in seconds
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let interval = null;

    // Start the countdown interval
    interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Calculate remaining days, hours, minutes, and seconds
  const remainingDays = Math.floor(seconds / (24 * 60 * 60));
  const remainingHours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div className="flex items-center justify-between gap-2">
      <b className='text-2xl'>Black Friday</b>
      
      <div className="timer flex items-center gap-2 ">
        <p><small>Ending in :</small></p>

      <GlassCard styleClass="text-orange-700 dark:text-orange-400 h-10 w-10 flex items-center justify-center">{remainingDays} </GlassCard>:
      <GlassCard styleClass="text-orange-700 dark:text-orange-400 h-10 w-10 flex items-center justify-center">{String(remainingHours).padStart(2, '0')}</GlassCard>:
      <GlassCard styleClass="text-orange-700 dark:text-orange-400 h-10 w-10 flex items-center justify-center">{String(remainingMinutes).padStart(2, '0')}</GlassCard>:
      <GlassCard styleClass="text-orange-700 dark:text-orange-400 h-10 w-10 flex items-center justify-center">{String(remainingSeconds).padStart(2, '0')}</GlassCard>
      </div>
    </div>
  );
};

Timer.propTypes = {
  days: PropTypes.number.isRequired,
  hours: PropTypes.number.isRequired,
};

export default Timer;
