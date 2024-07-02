import React, { useContext, useState } from 'react';
import Avatar from '../../../Common/Components/Avatar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPen, FaLock, FaTrash } from 'react-icons/fa';

import ConfirmToast from '../../../Common/Components/ConfirmToast';
import SingleUserPrev from '../ManageUsersComponents/SingleUserPrev';
import { TotalUsersContext } from '../../../lib/context/admin/TotalUsersContext';
import { FaDoorOpen } from 'react-icons/fa6';
import { highlightText } from '../../../lib/helper';
import CustomToast,{showToast} from '../../../Common/Components/Toast';


function UserCard({ users, query }) {

  const navigate = useNavigate();

  const { deleteUser, setUserIdToEdit  } = useContext(TotalUsersContext);
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showUserPreview, setShowUserPreview] = useState(false);

  if (!users) {
      return <div>No data</div>;
  }

  const handleViewUser = (userId, username) => {
      setSelectedUserId(userId);
      setShowUserPreview(true);
      navigate(`/users/preview=@${username}`)
  };

  const handleCloseUserPreview = () => {
      setShowUserPreview(false);
      setSelectedUserId(null);

      navigate(`/users`)
  };

  const handleDeleteClick = (userId) => {
      setSelectedUserId(userId);
      setShowConfirmToast(true); // Show confirmation toast
  };

  const handleConfirmDelete = async () => {
      try {
          await deleteUser(selectedUserId);
           showToast('User delete successfully!', 'success');
          setShowConfirmToast(false); // Close the confirmation toast after successful deletion
      } catch (error) {
          console.error("Delete User Error:", error);
           showToast('Failed to delete user. Please try again!', 'error');
        //   alert("Failed to delete user. Please try again.");
      }
  };

  const handleCancelDelete = () => {
      setShowConfirmToast(false); // Close the confirmation toast if cancelled

      showToast('User delete Cancel!', 'warning');
      setSelectedUserId(null);
  };
  const handleEditClick = (userId) => {
    setUserIdToEdit(userId)
      setSelectedUserId(userId);
  };


  return (
      <>
          {users.map((user) => (
              <div
                  key={user._id}
                  className="relative grid grid-cols-6 gap-2 bg rounded-xl items-center p-2 w-full h-[112px] group"
              >
                  {/* Avatar Section */}
                  <div className="Avatar themeGlassBg themeText rounded-xl p-2 col-span-2">
                      <Avatar
                          avatar={user.profile.avatar}
                          username={user.profile.username}
                          avatarColor={user.profile.avatarColor}
                      />
                  </div>

                  {/* User Data Section */}
                  <div className="userdata themeGlassBg themeText rounded-xl p-2 col-span-4">
                      <div className="details-box min-h-20 w-full rounded-xl flex flex-col items-center justify-center themeText text-sm">

                          {/* Action Buttons */}
                          <div className="action-D-E flex items-center justify-between gap-2 w-full py-1">
                             
                          <span className='flex gap-4 items-center'>
                              <button
                                  className='flex items-center text-blue-700 dark:text-blue-500 cursor-pointer transform transition-transform duration-300 hover:scale-150 hover:text-black dark:hover:text-black'
                                  title='Edit'
                                  onClick={() => handleEditClick(user._id)}
                              >
                                  <FaPen className='hover:text-black' />
                              </button>
                              <button
                                      className='flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transform transition-transform duration-300 hover:scale-150'
                                      title='Preview'
                                      onClick={() => handleViewUser(user._id, user.username)}
                                  >
                                      <FaDoorOpen />
                                  </button>
                              </span>
                              <span className='themeSpeText'>#{user.roles}</span>

                                  <button
                                      className='flex items-center cursor-pointer text-red-700 dark:text-red-600 transform transition-transform duration-300 hover:scale-150'
                                      title='Delete'
                                      onClick={() => handleDeleteClick(user._id)}
                                  >
                                      <FaTrash />
                                  </button>
                          </div>

                          {/* User Details */}
                          <div className="name-password flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                              <span className='flex items-center capitalize text-ellipsis overflow-hidden'>
                                  {user.profile.firstName}&nbsp;{user.profile.lastName}
                              </span>
                              <span className='flex items-center'>
                                  <FaLock />•••••••
                              </span>
                          </div>

                          <div className="username-email flex items-center justify-between gap-2 w-full border-b border-gray-800 dark:border-gray-100">
                              <span dangerouslySetInnerHTML={{ __html: highlightText(user.username, query) }}>
                                {/* {user.username} */}
                                </span>
                              <span className='text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: highlightText(user.email, query) }}>
                                {/* {user.email} */}
                              </span>
                          </div>

                      </div>
                  </div>
              </div>
          ))}


          {/* User Preview */}
          {showUserPreview && selectedUserId && (
              <SingleUserPrev
                  userData={selectedUserId}
                  onClose={handleCloseUserPreview}
              />
          )}
            {/* Confirmation Toast */}
            {showConfirmToast && (
              <div className="fixed top-4 right-4">
                  <ConfirmToast
                      title="Delete User"
                      message="Are you sure you want to delete this user?"
                      onConfirm={handleConfirmDelete}
                      onCancel={handleCancelDelete}
                      onClose={() => setShowConfirmToast(false)} // Close the toast on close button click
                  />
              </div>
          )}
          <CustomToast/>
      </>
  );
}

export default UserCard;