import GlassCard from "../CustomMIniComponents/GlassCard";


function Main({ children }) {
  return (
    <>
<div className="p-4">

        <GlassCard>
      <main className='md:min-h-[81.1vh] max-h-[70vh] lg:max-h-[80.7vh] overflow-y-auto'>

        {children}
      </main>
        </GlassCard>
</div>
    </>
  );
}

export default Main;
