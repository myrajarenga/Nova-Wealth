import React from 'react';
import storyImg from '../../assets/images/wealth-meeting.jpg';

// OurStory — two-column layout with narrative and highlighted stats card
const OurStory = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-14">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold">Our Story</h2>
        <div className="border-b border-[#D4AF37] w-24 my-5" aria-hidden="true" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <figure className="order-last md:order-first">
            <img
              src={storyImg}
              alt="Clients meeting with Nova Wealth advisor"
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow"
            />
          </figure>

          <article className="font-opensans space-y-4 text-gray-800">
            <p>
              Founded in 2025, Nova Wealth LLP emerged from a simple yet powerful vision: to democratize access to
              sophisticated wealth management strategies that were traditionally reserved for institutional investors.
            </p>
            <p>
              Our journey began when our founding partners recognized a significant gap in the financial advisory
              landscape. Too many individuals and families were receiving generic advice that failed to account for
              their unique circumstances, goals, and values.
            </p>
            <p>
              As a new firm, we are dedicated to building trust through transparency, disciplined risk management, and
              personalized planning designed around what matters most to you.
            </p>
          </article>
          
        </div>
      </div>
    </section>
  );
};

export default OurStory;