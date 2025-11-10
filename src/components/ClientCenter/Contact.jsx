import React from 'react';
import ContactForm from './ContactForm';
import OfficeDetails from './OfficeDetails';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/images/contact-us-page-image.png")',
          }}
        >
          <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold text-white mb-4">
              Let's Connect
            </h1>
            <p className="font-opensans text-lg md:text-xl text-white/90 max-w-2xl">
              Begin your journey to financial excellence with personalized wealth management solutions tailored to your unique goals.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Content Section */}
        {/* Full-width white band behind the contact content */}
        <div className="relative -mt-20 z-20">
          <div className="bg-white w-full py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <ContactForm />
                
                {/* Office Details */}
                <OfficeDetails />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Contact;