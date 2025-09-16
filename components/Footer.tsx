
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-16 border-t">
      <div className="container mx-auto px-6 py-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Tabriz SportZone. All rights reserved.</p>
        <p className="text-sm mt-2">Your premier destination for sports reservations in Tabriz.</p>
      </div>
    </footer>
  );
};

export default Footer;
