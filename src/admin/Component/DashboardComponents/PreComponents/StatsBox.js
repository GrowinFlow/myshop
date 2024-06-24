import React from 'react';
import { FaIcons } from 'react-icons/fa'; // Ensure correct icon import
import { Link } from 'react-router-dom';
import Loading from '../../../../Common/Components/Loading';

function StatsBox({ heading, icon, data, link, styleClass, error, loading }) {
  return (
    <Link to={link || "/"}>
      <div className={`themeGlassBg rounded-xl flex flex-col gap-2 justify-center items-center h-20 ${styleClass}`}>
        {loading ? (
          <Loading /> // Show loading indicator if isLoading is true
        ) : error ? (
          <div>Error: {error}</div> // Show error message if error is present
        ) : (
          <>
            <span className="text-2xl font-bold themeSpeText">{data !== undefined ? data : "Loading..."}</span>
            <div className="heading flex justify-center items-center gap-2 themeText">
              {heading || "Heading"} {icon || <FaIcons />}
            </div>
          </>
        )}
      </div>
    </Link>
  );
}

export default StatsBox;
