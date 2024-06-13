import Footer from "./Footer";


function Main({ children }) {
  return (
    <>
    <div className='h-auto '>
      <main className=' relative top-20 lg:top-24 '>
        {children}
      </main>
      {/* <Footer/> */}
    </div>
    </>
  );
}

export default Main;
