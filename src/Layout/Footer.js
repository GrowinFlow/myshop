import Logo from '../Component/Logo';

function Footer() {

  return (
    <>
    <br />
      <nav className="">
        <div className='container px-4 mx-auto'>

  
        <div className=" themeFooter backdrop-blur-sm flex flex-wrap items-center justify-center px-4 pt-4 color-ani themeText">
        <div className="w-full flex flex-wrap items-center justify-center p-2 color-ani themeGlassBg rounded-t-xl">

            <span className='text-sm'>Pwered by &nbsp;</span>
            <Logo color="gray-700" darkColor="white" size="xxl" />
        
        </div>
        </div>
        </div>
      </nav>
    </>
  );
}

export default Footer;
