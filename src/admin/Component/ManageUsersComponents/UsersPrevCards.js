import React, { useContext, useState } from 'react';
import UserCard from '../PreComonents/UserCard';
import { SetDataContext } from '../../../lib/context/SetDataContext';

function UsersPrevCards() {
  const { users } = useContext(SetDataContext);
  const [currentFilter, setCurrentFilter] = useState('All'); // Default filter state

  const filterUsersByRole = (role) => {
    setCurrentFilter(role); // Update current filter state
  };

  const filteredUsers = users.filter(user => {
    if (currentFilter === 'All') {
      return true; // Show all users if currentFilter is 'All'
    } else {
      return user.roles.includes(currentFilter); // Filter users by selected role
    }
  });

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-[125vh]">
      <div className="themeGlassBg rounded-xl p-4 themeText">
        <div className="flex gap-2 flex-wrap justify-start items-center themeText ">
          <button
            className={`flex focus:outline-none ${
              currentFilter === 'All' ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
            } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
            onClick={() => filterUsersByRole('All')}
          >
            All
          </button>

          <button
            className={`flex focus:outline-none ${
              currentFilter === 'client' ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
            } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
            onClick={() => filterUsersByRole('client')}
          >
            Clients
          </button>

          <button
            className={`flex focus:outline-none  ${
              currentFilter === 'manager' ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
            } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
            onClick={() => filterUsersByRole('manager')}
          >
            Managers
          </button>

          <button
            className={`flex focus:outline-none ${
              currentFilter === 'admin' ? 'bg-orange-700 dark:bg-orange-400' : 'themeText'
            } focus:ring-2 focus:ring-orange-300 font-medium rounded-lg px-5 py-2.5 cursor-pointer dark:focus:ring-yellow-900`}
            onClick={() => filterUsersByRole('admin')}
          >
            Admins
          </button>
        </div>
      </div>

      <div className="themeGlassBg rounded-xl p-4 themeText flex flex-wrap content-start gap-2 h-full overflow-y-auto">
        <UserCard users={filteredUsers} />
      </div>
    </div>
  );
}

export default UsersPrevCards;
