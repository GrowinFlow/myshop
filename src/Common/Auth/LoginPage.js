import React, { useContext, useState } from 'react';
import { FaUser, FaLock, FaPaperPlane } from 'react-icons/fa';
import GlassCard from '../Components/GlassCard';
import Button from '../Components/Button';
import { AuthContext } from '../../lib/context/LoginContext';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const { login, isError, isLoading } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ usernameOrEmail: '', password: '' });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials.usernameOrEmail, credentials.password);
    setRedirect(true);
  };

  return (
    <div className='container mx-auto px-4 py-8 flex flex-col justify-center items-center'>
      <GlassCard styleClass="container mx-auto px-4 py-6 flex flex-col justify-center items-center">

        <div className="heading mb-4 p-4 text-2xl font-bold flex justify-center items-center">
          <h1>Login</h1>
        </div>
        
        <div className="form p-4 text-2xl font-bold flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
           

            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="usernameOrEmail"
                value={credentials.usernameOrEmail}
                onChange={handleChange}
                placeholder="Enter Your Username or Email . . ."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" 
                required />
            </div>

            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaLock />
              </div>
              <input
               type="password"
               name="password"
               value={credentials.password}
               onChange={handleChange}
               placeholder="Enter Your Password . . ."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" 
                required />
            </div>

            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
            <Button
                text={isLoading ? "Logging In..." : "Login"}
                icon={<FaPaperPlane />}
                type="submit"
                disabled={isLoading}
                styleClass="block w-full h-12 ps-10 text-sm flex justify-center items-center gap-2"
              />
            </div>


            {isError && <p className="text-red-500">Login failed. Please try again.</p>}
          </form>
        </div>
      </GlassCard>
      {redirect && <Navigate to="/" replace />}
    </div>
  );
}

export default LoginPage;
