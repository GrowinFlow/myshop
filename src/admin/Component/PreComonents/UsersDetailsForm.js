import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaImage, FaMap, FaCity, FaRegCalendar, FaZhihu, FaCode, FaUsersRays, FaUserTie } from 'react-icons/fa6';
import { FaHome, FaGlobeAfrica } from 'react-icons/fa';
import Button from "./../../../Common/Components/Button";
import { SetDataContext } from '../../../lib/context/SetDataContext';
import Toast from '../../../Common/Components/Toast';


function UsersDetailsForm() {
  const { registerUser, updateUserIfNeeded, userIdToEdit, setUserIdToEdit, users, error } = useContext(SetDataContext);

  const [actionType, setActionType] = useState('Add');
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    profile: {
      firstName: '',
      lastName: '',
      avatar: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
    },
    roles: 'client' // Default role
  });

  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const formatDateToInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
console.log(userIdToEdit )
useEffect(() => {
  if (userIdToEdit) {
    const userToEdit = users.find(user => user._id === userIdToEdit);
    if (userToEdit) {
      const { username, password, email, profile, roles } = userToEdit;
      setUserData({
        username: username || '',
        password: password || '',
        email: email || '',
        profile: {
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          avatar: profile?.avatar || '',
          dateOfBirth: formatDateToInput(profile?.dateOfBirth) || '',
          address: profile?.address || '',
          city: profile?.city || '',
          state: profile?.state || '',
          country: profile?.country || '',
          zipCode: profile?.zipCode || '',
        },
        roles: roles || 'client'
      });
      setActionType('Update');
    }
  } else {
    setActionType('Add');
    setUserData({
      username: '',
      password: '',
      email: '',
      profile: {
        firstName: '',
        lastName: '',
        avatar: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      roles: 'client'
    });
  }
}, [userIdToEdit, users]);

const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name.startsWith('profile.')) {
    const profileField = name.split('.')[1];
    setUserData(prevUserData => ({
      ...prevUserData,
      profile: {
        ...prevUserData.profile,
        [profileField]: value
      }
    }));
  } else {
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  }
};

const handleAddOrUpdateUser = async (e) => {
    e.preventDefault();
    try {
        if (userIdToEdit) {
            await updateUserIfNeeded(userIdToEdit, userData);
            setToast({ show: true, type: 'success', message: 'User updated successfully!' });
        } else {
            const isDuplicate = users.some(user => user.username === userData.username || user.email === userData.email);
            if (isDuplicate) {
                setToast({ show: true, type: 'error', message: 'Username or email already exists!' });
                return;
            }
            await registerUser(userData);
            setToast({ show: true, type: 'success', message: 'User added successfully!' });
        }
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 5000);
        setUserIdToEdit(null);
    } catch (error) {
        console.error("Error in handleAddOrUpdateUser:", error);
        setToast({ show: true, type: 'error', message: 'Error updating user. Please try again.' });
    }
};


  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="themeGlassBg rounded-xl p-6 themeText">
          <span className='text-xl font-bold'>{actionType} user:</span>
        </div>

        <form onSubmit={handleAddOrUpdateUser} className='flex flex-col items-center gap-4 themeGlassBg rounded-xl p-4 themeText overflow-y-auto '>
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="profile.firstName"
                value={userData.profile.firstName}
                onChange={handleInputChange}
                placeholder="First Name ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUserTie />
              </div>
              <input
                type="text"
                name="profile.lastName"
                value={userData.profile.lastName}
                onChange={handleInputChange}
                placeholder="Last Name ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* Username and Password */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaZhihu />
              </div>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                placeholder="User Name ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Password ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
          </div>

          {/* Email and Avatar */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="Email ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaImage />
              </div>
              <input
                type="text"
                name="profile.avatar"
                value={userData.profile.avatar}
                onChange={handleInputChange}
                placeholder="Avatar URL ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* Date of Birth and Address */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaRegCalendar />
              </div>
              <input
                type="date"
                name="profile.dateOfBirth"
                value={userData.profile.dateOfBirth}
                onChange={handleInputChange}
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaHome />
              </div>
              <input
                type="text"
                name="profile.address"
                value={userData.profile.address}
                onChange={handleInputChange}
                placeholder="Address ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* City and State */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCity />
              </div>
              <input
                type="text"
                name="profile.city"
                value={userData.profile.city}
                onChange={handleInputChange}
                placeholder="City ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaMap />
              </div>
              <input
                type="text"
                name="profile.state"
                value={userData.profile.state}
                onChange={handleInputChange}
                placeholder="State ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* Country and Zip Code */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaGlobeAfrica />
              </div>
              <input
                type="text"
                name="profile.country"
                value={userData.profile.country}
                onChange={handleInputChange}
                placeholder="Country ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCode />
              </div>
              <input
                type="text"
                name="profile.zipCode"
                value={userData.profile.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* Role */}
          <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
            <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
              <FaUsersRays />
            </div>
            <select
              name="roles"
              value={userData.roles}
              onChange={handleInputChange}
              className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
            >
              <option value="client">Client</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className='w-full flex justify-center items-center'>
            <Button type="submit" styleClass="px-6 py-2 rounded-lg font-bold w-full flex justify-center items-center h-12" text={actionType} />
          </div>
        </form>
      </div>

      {toast.show && (
        <Toast
          show={toast.show}
          type={toast.type}
          message={toast.message}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

export default UsersDetailsForm;





































// import React, { useState, useContext } from 'react';
// import { FaUser, FaUserTie, FaZhihu, FaLock, FaEnvelope, FaImage, FaRegCalendar, FaCity, FaMap, FaCode, FaUsersRays } from 'react-icons/fa6';
// import { FaHome ,FaGlobeAfrica, } from 'react-icons/fa';

// import Button from "./../../../Common/Components/Button";
// import { SetDataContext } from '../../../lib/context/SetDataContext';

// const RegisterForm = () => {
//   const { registerUser } = useContext(SetDataContext); // Using AuthContext to get registerUser function
//   const [userData, setUserData] = useState({
//     profile: {
//       firstName: '',
//       lastName: '',
//       avatar: '',
//       dateOfBirth: '',
//       address: '',
//       city: '',
//       state: '',
//       country: '',
//       zipCode: '',
//     },
//     username: '',
//     password: '',
//     email: '',
//     roles: 'client', // Default role
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith('profile.')) {
//       const field = name.split('.')[1];
//       setUserData((prevData) => ({
//         ...prevData,
//         profile: {
//           ...prevData.profile,
//           [field]: value,
//         }
//       }));
//     } else {
//       setUserData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleAddOrupdateUserIfNeeded = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await registerUser(userData);
//       console.log('User Registered Successfully:', response);
//       // You can redirect to login or another page here after successful registration
//     } catch (error) {
//       console.error('Registration Error:', error);
//       // Handle error state or display error message to user
//     }
//   };

//   return (
//     <form onSubmit={handleAddOrupdateUserIfNeeded} className='flex flex-col items-center gap-4 themeGlassBg rounded-xl p-4 themeText overflow-y-auto'>
//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaUser />
//           </div>
//           <input
//             type="text"
//             name="profile.firstName"
//             value={userData.profile.firstName}
//             onChange={handleInputChange}
//             placeholder="First Name ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaUserTie />
//           </div>
//           <input
//             type="text"
//             name="profile.lastName"
//             value={userData.profile.lastName}
//             onChange={handleInputChange}
//             placeholder="Last Name ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaZhihu />
//           </div>
//           <input
//             type="text"
//             name="username"
//             value={userData.username}
//             onChange={handleInputChange}
//             placeholder="User Name ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//             required />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaLock />
//           </div>
//           <input
//             type="password"
//             name="password"
//             value={userData.password}
//             onChange={handleInputChange}
//             placeholder="Password ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//             required />
//         </div>
//       </div>

//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaEnvelope />
//           </div>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleInputChange}
//             placeholder="Email ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//             required />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaImage />
//           </div>
//           <input
//             type="text"
//             name="profile.avatar"
//             value={userData.profile.avatar}
//             onChange={handleInputChange}
//             placeholder="Avatar URL ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaRegCalendar />
//           </div>
//           <input
//             type="date"
//             name="profile.dateOfBirth"
//             value={userData.profile.dateOfBirth}
//             onChange={handleInputChange}
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaHome />
//           </div>
//           <input
//             type="text"
//             name="profile.address"
//             value={userData.profile.address}
//             onChange={handleInputChange}
//             placeholder="Address ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaCity />
//           </div>
//           <input
//             type="text"
//             name="profile.city"
//             value={userData.profile.city}
//             onChange={handleInputChange}
//             placeholder="City ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaMap />
//           </div>
//           <input
//             type="text"
//             name="profile.state"
//             value={userData.profile.state}
//             onChange={handleInputChange}
//             placeholder="State ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaGlobeAfrica />
//           </div>
//           <input
//             type="text"
//             name="profile.country"
//             value={userData.profile.country}
//             onChange={handleInputChange}
//             placeholder="Country ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//         <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//           <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//             <FaCode />
//           </div>
//           <input
//             type="text"
//             name="profile.zipCode"
//             value={userData.profile.zipCode}
//             onChange={handleInputChange}
//             placeholder="Zip Code ..."
//             className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
//         <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
//           <FaUsersRays />
//         </div>
//         <select
//           name="roles"
//           value={userData.roles}
//           onChange={handleInputChange}
//           className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
//         >
//           <option value="client">Client</option>
//           <option value="manager">Manager</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       <div className='w-full flex justify-center items-center'>
//         <Button type="submit" styleClass="px-6 py-2 rounded-lg font-bold w-full flex justify-center items-center h-12" text="Register" />
//       </div>
//     </form>
//   );
// };

// export default RegisterForm;
