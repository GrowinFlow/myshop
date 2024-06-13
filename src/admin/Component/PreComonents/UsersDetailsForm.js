import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaImage, FaMap, FaCity, FaRegCalendar, FaZhihu, FaCode, FaUsersRays, FaUserTie } from 'react-icons/fa6';
import { FaHome, FaGlobeAfrica } from 'react-icons/fa';
import Button from "./../../../Common/Components/Button";
import { SetDataContext } from '../../../lib/context/SetDataContext';
import Toast from '../../../Common/Components/Toast';
function UsersDetailsForm() {
  const { addUser, updateUser, userIdToEdit,setUserIdToEdit, users } = useContext(SetDataContext);

  // State for user data and toast message
  const [txt, setTxt] = useState("Add")
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

  // Effect to update userData based on userIdToEdit
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
                      firstName: profile.firstName || '',
                      lastName: profile.lastName || '',
                      avatar: profile.avatar || '',
                      dateOfBirth: formatDateToInput(profile.dateOfBirth) || '',
                      address: profile.address || '',
                      city: profile.city || '',
                      state: profile.state || '',
                      country: profile.country || '',
                      zipCode: profile.zipCode || '',
                  },
                  roles: roles || 'client'
              });
              setTxt("Edit")
          }
      } else {
          // Reset form fields when userIdToEdit is null (i.e., adding a new user)
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
  }, [userIdToEdit, users]); // Depend on userIdToEdit and users array

  // Function to format date string to YYYY-MM-DD format
  const formatDateToInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
      const day = date.getUTCDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
  };

  // Function to handle input changes in form fields
  const handleInputChange = (e) => {
      const { name, value } = e.target;

      if (name.startsWith('profile.')) {
          // Handle nested profile object update
          const profileField = name.split('.')[1];
          setUserData(prevUserData => ({
              ...prevUserData,
              profile: {
                  ...prevUserData.profile,
                  [profileField]: value
              }
          }));
      } else {
          // Handle top-level user data update
          setUserData(prevUserData => ({
              ...prevUserData,
              [name]: value
          }));
      }
  };

  // Function to handle form submission (adding or updating user)
  const handleAddOrUpdateUser = async (e) => {
      e.preventDefault();
      try {
          if (userIdToEdit) {
              // Update existing user
              await updateUser(userIdToEdit, userData);
              setToast({ show: true, type: 'success', message: 'User updated successfully!' })

          } else {
              // Add new user
              await addUser(userData);
              setToast({ show: true, type: 'success', message: 'User added successfully!' });
              // Reset form fields after successful addition
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
          setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 5000);
        setUserIdToEdit(null)
      } catch (error) {
          setToast({ show: true, type: 'error', message: 'Error updating user. Please try again.' });
      }
  };

  // Function to close toast message
  const handleCloseToast = () => {
      setToast({ ...toast, show: false });
  };


  return (
    <>
      <div className="flex flex-col gap-2 ">
        <div className="themeGlassBg rounded-xl p-6 themeText">
          <span className='text-xl font-bold'>{txt} user:</span>
        </div>

        <form onSubmit={handleAddOrUpdateUser} className='flex flex-col items-center gap-4 themeGlassBg rounded-xl p-4 themeText overflow-y-auto '>
                  
          {/* Form Fields */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="firstName"
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
                name="lastName"
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
                placeholder="Strong Password ..."
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
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaImage />
              </div>
              <input
                type="text"
                name="avatar"
                value={userData.profile.avatar}
                onChange={handleInputChange}
                placeholder="Avatar Link ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
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
                name="dateOfBirth"
                value={userData.profile.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Date of Birth ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaHome />
              </div>
              <input
                type="text"
                name="address"
                value={userData.profile.address}
                onChange={handleInputChange}
                placeholder="Address ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:
next
ChatGPT
jsx
Copy code
              ring-transparent dark:focus:border-transparent"
                required />
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
                name="city"
                value={userData.profile.city}
                onChange={handleInputChange}
                placeholder="City ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaMap />
              </div>
              <input
                type="text"
                name="state"
                value={userData.profile.state}
                onChange={handleInputChange}
                placeholder="State ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
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
                name="country"
                value={userData.profile.country}
                onChange={handleInputChange}
                placeholder="Country ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCode />
              </div>
              <input
                type="text"
                name="zipCode"
                value={userData.profile.zipCode}
                onChange={handleInputChange}
                placeholder="Zip Code ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>

          </div>

          {/* Role Selector */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
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
          </div>


          {/* Submit Button */}
          <Button type="submit" text={`${txt} user`} styleClass="w-full mt-4 h-12 tflex justify-center items-center" />
        </form>
      </div>

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default UsersDetailsForm;