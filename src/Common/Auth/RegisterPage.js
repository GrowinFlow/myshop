import React, { useState, useContext } from 'react';
import { AuthContext } from '../../lib/context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../Components/GlassCard';
import Button from '../Components/Button';
import { FaUser, FaEnvelope, FaLock, FaImage, FaMap, FaCity, FaRegCalendar, FaZhihu, FaCode, FaUsersRays, FaUserTie } from 'react-icons/fa6';
import { FaHome, FaGlobeAfrica, FaTimes } from 'react-icons/fa'; 


function RegisterPage() {
  const { registerUser, isLoading, setIsLoading, isError, setIsError } = useContext(AuthContext);
  const [formData, setFormData] = useState({
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('profile.')) {
      const profileField = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [profileField]: value
        }
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false); // Reset isError state before each registration attempt
  
    try { 
      const response = await registerUser(formData);
      setIsLoading(false);
  
      // Check if response contains necessary user information
    console.log('User registered successfully:', response);
        // Redirect to login page after successful registration
        navigate('/login');
     
    } catch (error) {
      console.error('Register User Error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center items-center">
      <GlassCard styleClass="container mx-auto px-4 py-6 flex flex-col gap-4 justify-center items-center">
        <div className="heading themeGlassBg w-full rounded-xl  p-4 text-2xl font-bold flex justify-center items-center">
          <h1>Register</h1>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-4 themeGlassBg rounded-xl p-4 themeText overflow-y-auto w-full'>
          {/* First Name and Last Name */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="profile.firstName"
                value={formData.profile.firstName}
                onChange={handleChange}
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
                value={formData.profile.lastName}
                onChange={handleChange}
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
                value={formData.username}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.profile.avatar}
                onChange={handleChange}
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
                value={formData.profile.dateOfBirth}
                onChange={handleChange}
                placeholder="Date of Birth ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaMap />
              </div>
              <input
                type="text"
                name="profile.address"
                value={formData.profile.address}
                onChange={handleChange}
                placeholder="Address ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* City, State, and Country */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCity />
              </div>
              <input
                type="text"
                name="profile.city"
                value={formData.profile.city}
                onChange={handleChange}
                placeholder="City ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaGlobeAfrica />
              </div>
              <input
                type="text"
                name="profile.country"
                value={formData.profile.country}
                onChange={handleChange}
                placeholder="Country ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          {/* Zip Code and Roles */}
          <div className='flex w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCode />
              </div>
              <input
                type="text"
                name="profile.zipCode"
                value={formData.profile.zipCode}
                onChange={handleChange}
                placeholder="Zip Code ..."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUsersRays />
              </div>
              <select
                name="roles"
                value={formData.roles}
                onChange={handleChange}
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              >
                <option value="client">Client</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            text={isLoading ? 'Registering...' : 'Register'}
            type="submit"
            disabled={isLoading}
            styleClass="block w-full h-12 text-sm"
          />
        </form>

        {isError && <p className="text-red-500">Registration failed. Please try again.</p>}
        <div className="themeGlassBg w-full rounded-xl form p-4 text-2xl font-medium flex justify-center items-center">
          <p className='text-sm flex items-center'> 
          Already have an account?  {' '}
            <Link to="/login" >
              <span className="themeSpeText font-bold">
            &nbsp;  Login
              </span>
            </Link>
          </p>
        </div>
      </GlassCard>

    </div>
  );
}

export default RegisterPage;

