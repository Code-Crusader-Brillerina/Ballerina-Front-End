import React from 'react';
import AboutSection from '../../components/Patient/aboutusPage/AboutSection';
import MissionSection from '../../components/Patient/aboutusPage/MissionSection';
import TeamSection from '../../components/Patient/aboutusPage/TeamSection';



const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      <AboutSection />
      <MissionSection />
      <TeamSection />
    </div>
  );
};

export default AboutUs;