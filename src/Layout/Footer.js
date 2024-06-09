import Logo from '../Component/Logo';

function Footer() {

  return (
    <>
    <br />
      <nav className="">
        <div className='container px-4 mx-auto'>

  
        <div className=" themeFooter backdrop-blur-sm flex flex-wrap items-center justify-center p-2 py-2 color-ani themeText">
            <span>Pwered by &nbsp;</span>
            <Logo color="gray-700" darkColor="white" size="xxl" />
        
        </div>
        </div>
      </nav>
    </>
  );
}

export default Footer;
