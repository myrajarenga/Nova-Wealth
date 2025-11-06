import React from 'react';

// ClientCenterHeader — page title and subtitle
const ClientCenterHeader = () => {
  return (
    <header className="text-center py-10 md:py-12">
      <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-black">
        Welcome to Your Client Center
      </h1>
      <p className="font-opensans text-[#2C3E50] max-w-2xl mx-auto mt-3">
        Access your portfolio, upload important documents, and connect with your dedicated wealth advisor
        through our secure client portal.
      </p>
    </header>
  );
};

export default ClientCenterHeader;


