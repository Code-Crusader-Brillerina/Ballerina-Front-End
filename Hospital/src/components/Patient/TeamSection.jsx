import React from 'react';

const TeamMemberCard = ({ name, role, imageUrl }) => (
  <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm">
    <img src={imageUrl} alt={name} className="w-24 h-24 rounded-full object-cover mb-4" />
    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
    <p className="text-sm text-blue-600">{role}</p>
  </div>
);

const teamMembers = [
  { name: 'Eshan Senadhi', role: 'Founder & CEO', imageUrl: 'https://via.placeholder.com/150' },
  { name: 'Jane Doe', role: 'Chief Technology Officer', imageUrl: 'https://via.placeholder.com/150' },
  { name: 'John Smith', role: 'Head of Product', imageUrl: 'https://via.placeholder.com/150' },
];

const TeamSection = () => (
  <section className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Meet the Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </section>
);

export default TeamSection;