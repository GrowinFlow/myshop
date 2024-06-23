import React, { useContext, useState } from 'react';
import { FaUser, FaLock, FaPaperPlane } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
import GlassCard from '../Components/GlassCard'; // Adjust path as needed
import Button from '../Components/Button'; // Adjust path as needed
import { AuthContext } from '../../lib/context/Auth'; // Adjust path as needed
import img from '../../assets/images/loginImg.png'; // Adjust path as needed
import Footer from '../../Common/Layout/Footer'; // Adjust path as needed

function LoginPage() {
  const { user, login, isError, setIsError, isLoading , setIsLoading, } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({ ...prevState, [name]: value }));
  };
console.log(user, "+++++++++++++++++", user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await login(credentials.identifier, credentials.password);
      if (response) {
        setRedirect(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center items-center ">
      <GlassCard styleClass="container mx-auto px-4 py-6 flex flex-col justify-center items-center gap-4">
        <div className="heading themeGlassBg w-full rounded-xl mb-4 p-4 text-2xl font-bold flex justify-center items-center">
          <h1>Login</h1>
        </div>

        <div className="themeGlassBg w-full rounded-xl form p-4 text-2xl font-bold grid grid-cols-1 md:grid-cols-5 items-center">
          <div className="img col-span-2">
            <img src={img} alt="loginImg" />
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4 col-span-3">
            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="identifier"
                value={credentials.identifier}
                onChange={handleChange}
                placeholder="Enter Your Username or Email . . ."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required
              />
            </div>

            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <div className="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter Your Password . . ."
                className="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required
              />
            </div>

            <div className="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full">
              <Button
                text={isLoading ? 'Logging In...' : 'Login'}
                icon={<FaPaperPlane />}
                type="submit"
                disabled={isLoading}
                styleClass="block w-full h-12 ps-10 text-sm flex justify-center items-center gap-2"
              />
            </div>

            {isError && <p className="text-red-500">Login failed. Please try again.</p>}
          </form>
        </div>

        <div className="themeGlassBg w-full rounded-xl form p-4 text-2xl font-bold flex justify-center items-center">
          <p className='text-sm flex items-center'> 
            Don't have an account?{' '}
            <Link to="/register" >
              <span className="themeSpeText">
            &nbsp;  Register here
              </span>
            </Link>
          </p>
        </div>
      </GlassCard>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default LoginPage;
