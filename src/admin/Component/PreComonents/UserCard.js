import React, { useContext} from 'react';
import Avatar from '../../../Common/Components/Avatar';
import { FaPen, FaLock } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';

function UserCard({users}) {

  return (
    <>
    {users.map((user) => (

    <div 
    key={user._id}
    className="relative grid grid-cols-6 gap-2 bg rounded-xl items-center p-2 w-full h-[112px]">
      <div className="Avatar themeGlassBg themeText rounded-xl p-2 col-span-2">
        <Avatar
          avatar={user.profile.avatar}
          username={user.profile.username}
          avatarColor={user.profile.avatarColor}
        />
      </div>

      <div className="userdata themeGlassBg themeText rounded-xl p-2 col-span-4">
        <div className="details-box min-h-20 w-full rounded-xl flex flex-col items-center justify-center themeText text-sm">
          
          <div className="action-D-E flex items-center justify-between gap-2 w-full py-1">
            <span className='flex items-center text-blue-700 dark:text-blue-400 cursor-pointer' key={user._id} title='Edit'>
            <FaPen />
            </span>
            <span className='themeSpeText'>#{user.roles}</span>
           
            <span className='flex items-center cursor-pointer text-red-700 dark:text-red-500' key={user._id} title='Delete'>
              <FaTrash/>
            </span>
          </div>
          
          <div className="name-password flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
            <span className='flex items-center capitalize'>
              {user.profile.firstName}&nbsp;{user.profile.lastName}
            </span>
           
            <span className='flex items-center'>
              <FaLock/>•••••••
            </span>
          </div>
          
          <div className="username-email flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
            <span>{user.username}</span>
            <span className='text-ellipsis overflow-hidden'>{user.email}</span>
          </div>

        </div>
      </div>
    </div>
    ))}
    </>
  );
}

export default UserCard;
