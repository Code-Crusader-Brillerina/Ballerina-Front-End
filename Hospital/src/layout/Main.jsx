import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Patient/Header';
import Footer from '../components/Footer';
import GradientBackground from '../components/Patient/GradientBackground';


const Main = () => {
  return (
    <GradientBackground>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-5 bg-transparent"> {/* Add bg-transparent */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Main;