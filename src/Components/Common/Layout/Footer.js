
import Button from '../../Common/CustomMIniComponents/Button';
import Logo from '../../Common/CustomMIniComponents/Logo';

function Footer() {

  return (
    <>
      <footer className=" bottom-0 w-full">
        <div className='w-full mx-auto mt-2 px-4 py-3'>
          <div className="themeFooter backdrop-blur-sm flex flex-wrap items-center justify-center px-4 pt-4 color-ani themeText">
            <div className="w-full flex flex-wrap items-center justify-evenly p-2 color-ani themeGlassBg rounded-t-xl">
              <div className="logo flex justify-center items-center">
                <span className='text-sm'>Powered by &nbsp;</span>
                <Logo color="gray-700" darkColor="white" size="lg" />
              </div>
              {/* {user && (
                <div className="logout">
                  <Button text="Logout" onClick={handleLogout} styleClass="my-0 my-0"/>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
