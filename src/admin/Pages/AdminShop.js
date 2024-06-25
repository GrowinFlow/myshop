import React from 'react';
import Footer from '../../Common/Layout/Footer';
import GlassCard from '../../Common/Components/GlassCard';
import WelcomeCard from './../Component/PreComonents/WelcomeCard';
import Shop from '../../user/Pages/Shop'; // Assuming Shop is a React component

function AdminShop() {
  return (
    <div className="container mx-auto min-h-[75vh] px-4 h-auto flex flex-col gap-4">
      <WelcomeCard text="Client Side View" />

      <GlassCard>
        <div className="themeGlassBg rounded-2xl p-4">
          <Shop />
        </div>
      </GlassCard>

      <Footer />
    </div>
  ); 
} 

export default AdminShop;
