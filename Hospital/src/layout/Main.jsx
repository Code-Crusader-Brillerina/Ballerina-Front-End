import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Patient/Header';
import Footer from '../components/Footer';

const Main = () => {
  return (

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-transparent">
          <Outlet />
        </main>
        <Footer />
      </div>

  );
};

export default Main;