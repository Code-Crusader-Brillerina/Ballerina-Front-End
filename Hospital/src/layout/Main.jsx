import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Patient/Header';
import Footer from '../components/Footer';
import ChatButton from '../components/ChatButton';

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-transparent">
        <Outlet />
      </main>
      <Footer />

      {/* Chatbot Button */}
      <ChatButton/>
    </div>
  );
};

export default Main;
