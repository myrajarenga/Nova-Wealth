import React from 'react';

// OurStory — narrative on left, highlights on right (no numeric stats)
const OurStory = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-14">
        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-center">Our Story</h2>
        <div className="border-b border-[#D4AF37] w-24 mx-auto my-5" aria-hidden="true" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <article className="font-opensans space-y-4">
            <p className="text-black !text-black">
              Founded in 2025, Nova Wealth LLP emerged from a simple yet powerful vision: to democratize access to
              sophisticated wealth management strategies that were traditionally reserved for institutional investors.
            </p>
            <p className="text-black !text-black">
              Our journey began when our founding partners recognized a significant gap in the financial advisory
              landscape. Too many individuals and families were receiving generic advice that failed to account for
              their unique circumstances, goals, and values.
            </p>
            <p className="text-black !text-black">
              As a new firm, we are dedicated to building trust through transparency, disciplined risk management, and
              personalized planning designed around what matters most to you.
            </p>
          </article>
          <aside className="rounded-xl border border-black/10 bg-white p-6 shadow-sm">
            <ul className="space-y-4">
              {[
                'Personalized Financial Strategies',
                'Client-First Advisory Approach',
                'Commitment to Long-Term Growth',
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-md bg-[#D4AF37] text-black font-bold flex items-center justify-center" aria-hidden="true">★</div>
                  <p className="font-opensans text-[#2C3E50]">{item}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default OurStory;