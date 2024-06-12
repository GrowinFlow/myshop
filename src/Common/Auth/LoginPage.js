import React, { useContext, useState } from 'react';
import { FaUser, FaLock, FaPaperPlane } from 'react-icons/fa';
import GlassCard from '../Components/GlassCard';
import Button from '../Components/Button';
import { AuthContext } from '../../lib/context/LoginContext';

function LoginPage() {
  const { login, isError, isLoading } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(usernameOrEmail, password);
  };

  return (
    <div className="container mx-auto px-4 mt-8 flex flex-col justify-center items-center">
      <GlassCard>
        <div className="heading mb-4 p-4 text-2xl font-bold flex justify-center items-center">
          <h1>Login</h1>
        </div>
        <div className="form p-4 text-2xl font-bold flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center gap-4">
            <div className="input-wrapper">
              <FaUser />
              <input
                type="text"
                name="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter Your Username or Email . . ."
                required
              />
            </div>
            <div className="input-wrapper">
              <FaLock />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password . . ."
                required
              />
            </div>
            <div className="input-wrapper">
              <Button
                text={isLoading ? "Logging In..." : "Login"}
                icon={<FaPaperPlane />}
                type="submit"
                disabled={isLoading}
              />
            </div>
            {isError && <p className="text-red-500">Login failed. Please try again.</p>}
          </form>
        </div>
      </GlassCard>
    </div>
  );
}

export default LoginPage;
