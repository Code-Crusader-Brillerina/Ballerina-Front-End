import React from 'react';
import { Stethoscope, Lightbulb, Users, ArrowRight } from 'lucide-react';

// Enhanced About Section Component
const AboutSection = () => (
    <section className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl mb-8 overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Background gradient shape */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                    Innovating Health with <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Halgouce</span>
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    Halgouce is a leading digital healthcare platform dedicated to simplifying and improving access to medical services. Founded in 2025, our mission is to empower patients by providing a seamless and transparent way to manage their health, from finding the right doctor to getting prescriptions delivered to their doorstep.
                </p>
                <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
                <div className="relative w-full max-w-sm aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
                    <Stethoscope className="w-2/5 h-2/5 text-white" />
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full animate-ping-slow"></div>
                </div>
            </div>
        </div>
    </section>
);

// Enhanced Mission Section Component
const MissionSection = () => (
    <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <Lightbulb className="w-12 h-12 text-white" />
                </div>
            </div>
            <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    Our mission is to create a connected healthcare ecosystem where patients, doctors, and pharmacies can interact efficiently and effectively. We strive to be the most trusted and user-friendly platform for all your health-related needs. We believe that technology can break down barriers to quality healthcare, and we are committed to making a difference in our community.
                </p>
            </div>
        </div>
    </section>
);

// Enhanced Team Section Component
const TeamMemberCard = ({ name, role, imageUrl }) => (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <div className="relative w-32 h-32 mb-4">
            <img src={imageUrl} alt={name} className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" />
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                <Users className="w-4 h-4" />
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-blue-600 font-medium">{role}</p>
    </div>
);

const teamMembers = [
    { name: 'Eshan Senadhi', role: 'Founder & CEO', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Jane Doe', role: 'Chief Technology Officer', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'John Smith', role: 'Head of Product', imageUrl: 'https://via.placeholder.com/150' },
];

const TeamSection = () => (
    <section className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} {...member} />
            ))}
        </div>
    </section>
);

// Main About Us Page Component
const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4 md:px-8">
                {/* Main Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Story</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Learn about our journey, mission, and the people behind Halgouce.
                    </p>
                </div>

                {/* Main Content Sections */}
                <AboutSection />
                <MissionSection />
                <TeamSection />
            </div>
        </div>
    );
};

export default AboutUs;