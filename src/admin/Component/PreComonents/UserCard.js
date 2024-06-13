import React, { useContext, useState} from 'react';
import Avatar from '../../../Common/Components/Avatar';
import { FaPen, FaLock } from 'react-icons/fa6';
import { FaTrash } from 'react-icons/fa';
import { SetDataContext } from '../../../lib/context/SetDataContext';



function UserCard({users}) {
  const {setUserIdToEdit, userIdToEdit} = useContext(SetDataContext)
  
  const setId = (x) => {
    setUserIdToEdit(x)
  }

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
            <button 
            className='flex items-center text-blue-700 dark:text-blue-400 cursor-pointer' 
            title='Edit' 
            onClick={()=>setId(user._id)}>
            <FaPen />
            </button>
            <span className='themeSpeText'>#{user.roles}</span>
           
            <button 
            className='flex items-center cursor-pointer text-red-700 dark:text-red-500' 
            title='Delete' >
              <FaTrash/>
            </button>
          </div>
          
          <div className="name-password flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
            <span className='flex items-center capitalize text-ellipsis overflow-hidden'>
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
