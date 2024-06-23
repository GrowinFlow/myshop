import React, { useState, useContext } from 'react';
import { AuthContext } from '../../lib/context/Auth';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../Components/GlassCard';
import Button from '../Components/Button';
import Footer from '../../Common/Layout/Footer';

function RegisterPage() {
  const { registerUser, isLoading, setIsLoading, isError, setIsError } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await registerUser(formData);
      setIsLoading(false);
  
      // Check if response contains necessary user information
      if (response && (response.username || response.email)) {
        console.log('User registered successfully:', response);
        // Example: navigate('/login'); // Redirect to login page after successful registration
      } else {
        console.error('Registration failed. No valid user data returned.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Register User Error:', error);
      setIsError(true); // Set isError state for error message display
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="container mx-auto px-4 flex flex-col justify-center items-center">
      <GlassCard styleClass="container mx-auto px-4 py-6 flex flex-col justify-center items-center">
        <div className="heading themeGlassBg w-full rounded-xl mb-4 p-4 text-2xl font-bold flex justify-center items-center">
          <h1>Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Your Username . . ."
            required
            className="block w-full p-4 text-sm rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email . . ."
            required
            className="block w-full p-4 text-sm rounded-lg"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Your Password . . ."
            required
            className="block w-full p-4 text-sm rounded-lg"
          />
          <Button
            text={isLoading ? 'Registering...' : 'Register'}
            type="submit"
            disabled={isLoading}
            styleClass="block w-full h-12 text-sm"
          />
        </form>

        {isError && <p className="text-red-500">Registration failed. Please try again.</p>}
      </GlassCard>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default RegisterPage;
