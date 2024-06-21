import React from 'react';
import ReactDOMServer from 'react-dom/server'; // Import ReactDOMServer
import Footer from '../../Common/Layout/Footer';
import GlassCard from '../../Common/Components/GlassCard';
import WelcomeCard from './../Component/PreComonents/WelcomeCard';
import Sm from '../../Common/Pages/Sm';
import ManageProducts from './ManageProducts'

function AdminShop() {
  const componentHTML = ReactDOMServer.renderToStaticMarkup(<ManageProducts />);
  
  return (
    <>
      <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col gap-4">
        <WelcomeCard text="Client Side View" />

        <GlassCard>
          <div className="themeGlassBg rounded-2xl p-4 ">
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><title>React Component</title></head><body>${componentHTML} </body></html>`}
              frameborder="0"
              className='w-full min-h-96'
            ></iframe>
          </div>
        </GlassCard>

        <Footer />
      </div>
    </>
  );
}

export default AdminShop;
