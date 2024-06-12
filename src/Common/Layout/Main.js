
function Main({ children }) {

  return (
    <>
    <div className='h-full bg'>
      <main className=' relative top-20 lg:top-24 '>
        {children}
      </main>
    </div>
    </>
  );
}

export default Main;
