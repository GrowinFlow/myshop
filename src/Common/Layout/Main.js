import Footer from "./Footer";


function Main({ children }) {
  return (
    <>
    <div className='h-auto '>
      <main className=' relative top-24 lg:top-32 '>
        {children}
      </main>
      {/* <Footer/> */}
    </div>
    </>
  );
}

export default Main;
