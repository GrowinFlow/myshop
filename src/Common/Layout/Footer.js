import { useContext } from 'react';
import Button from '../Components/Button';
import Logo from '../Components/Logo';
import { AuthContext } from '../../lib/context/LoginContext';

function Footer() {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <br />
      <nav className="">
        <div className='container px-4 mx-auto mt-20'>
          <div className="themeFooter backdrop-blur-sm flex flex-wrap items-center justify-center px-4 pt-4 color-ani themeText">
            <div className="w-full flex flex-wrap items-center justify-evenly p-2 color-ani themeGlassBg rounded-t-xl">
              <div className="logo flex justify-center items-center">
                <span className='text-sm'>Powered by &nbsp;</span>
                <Logo color="gray-700" darkColor="white" size="xl" />
              </div>
              {user && (
                <div className="logout">
                  <Button text="Logout" function={handleLogout} styleClass="my-0"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Footer;
