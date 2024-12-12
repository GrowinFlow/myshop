import React, { useEffect, useState } from 'react';
import Button from './../../Common/CustomMIniComponents/Button';
import { data } from './../../../lib/mockData';
import {showToast} from './../../Common/CustomMIniComponents/Toast';

const localKeys = ["user_roles", "user"];

function Settings() {
  const [userRoles, setUserRoles] = useState([]); // Initialize as an array
  const [userRole, setUserRole] = useState(0); // Initialize with a number

  useEffect(() => {
    // Create an array to hold roles
    const roles = data.map(user => user.user_role.name);
    // Update state with the roles array
    setUserRoles(roles);

    // Save the current user data to localStorage
    if (data[userRole]) {
      localStorage.setItem(localKeys[1], JSON.stringify(data[userRole]));

showToast('Congratulation! \nUpdate User Role ', 'info');
    }
  }, [userRole]); // Dependency array should include `userRole`

  // Function to handle button click
  const handleClick = (index) => {
    // Set userRole based on button index
    setUserRole(index);
  };

  return (
    <div className="themeGlassBg rounded-xl  w-full h-[80vh] grid grid-rows-2 items-center">
      <h2 className='text-center text-3xl font-medium '>Change <span className='underline'>Role</span></h2>
    
      <div className="grid grid-cols-7 p-4">
        <div className="empty col-span-2"></div>
        <div className="flex gap-4 flex-wrap justify-center items-center col-span-5 md:col-span-3">

          {userRoles.map((role, index) => (
            <Button
            key={index} // Unique key for each button
            type={"submit"}
            text={role}
            activeBtn={userRole === index}
            onClick={() => handleClick(index)}
            />
          ))}
          <div className="empty col-span-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
