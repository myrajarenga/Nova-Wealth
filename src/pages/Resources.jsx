import React from 'react';
import CTASection from '../components/CTASection';

// Placeholder data for articles
const articles = [
  {
    id: 1,
    title: "Best Investment Options for Canadian Expats",
    author: "Best Investment Options for Canadian Expats",
    date: "November 19, 2025",
    excerpt: "Best Investment Options for Canadian Expats",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=Canadian+Expats", 
    link: "#"
  },
  {
    id: 2,
    title: "Sarwa Investment Review",
    author: "Sarwa Investment Review",
    date: "November 18, 2025",
    excerpt: "Sarwa investment review",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=Sarwa+Review",
    link: "#"
  },
  {
    id: 3,
    title: "Investment Advisory Black Friday Offer - November 2025",
    author: "Free Investment Advisory Consultations",
    date: "November 12, 2025",
    excerpt: "Free Investment Advisory Sessions",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=Black+Friday",
    link: "#"
  },
  {
    id: 4,
    title: "CPF For Expats Singapore",
    author: "Nova Wealth Team",
    date: "November 10, 2025",
    excerpt: "Understanding CPF for expatriates in Singapore.",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=Singapore+CPF",
    link: "#"
  },
  {
    id: 5,
    title: "Ardan International Review",
    author: "Nova Wealth Team",
    date: "November 5, 2025",
    excerpt: "Is Ardan International the right platform for you?",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=Ardan+Review",
    link: "#"
  },
  {
    id: 6,
    title: "The Best Investment Options for British Expats",
    author: "Nova Wealth Team",
    date: "November 1, 2025",
    excerpt: "Tailored investment strategies for British expats.",
    image: "https://placehold.co/600x400/1a1a1a/D4AF37?text=British+Expats",
    link: "#"
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Section 1: Hero with Video/Image Background */}
      <div className="relative h-[500px] w-full overflow-hidden bg-black">
         {/* Overlay for better text readability */}
       
        
        {/* Background Image/Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
            {/* Placeholder for the video/image the user will provide */}
            <div className="text-gray-600 text-xl font-bold animate-pulse">
               <video 
        src="/videos/Resources-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
            </div>
             <img 
                src="vidoes/Resources-video" 
                alt="Background Placeholder" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white font-montserrat font-bold text-4xl md:text-6xl tracking-wider mb-6 leading-tight uppercase">
            The Nova Wealth<br />
            Investment Business<br />
            Review
          </h1>
          <p className="text-white font-montserrat font-bold text-xl md:text-2xl tracking-widest uppercase border-t-2 border-[#D4AF37] pt-4 mt-2">
            Investment News and Updates
          </p>
        </div>
      </div>

      {/* Section 2: Articles Grid */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-center text-black font-montserrat font-bold text-3xl md:text-4xl mb-16 uppercase tracking-wide">
          Investment Review Articles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {articles.map((article) => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
              {/* Article Image */}
              <div className="h-56 overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Article Content */}
              <div className="p-8 flex flex-col flex-grow text-center">
                <h3 className="text-black font-montserrat font-bold text-lg mb-4 uppercase leading-snug min-h-[3.5rem]">
                  {article.title}
                </h3>
                
                <div className="text-gray-500 text-xs font-opensans mb-5 uppercase tracking-wide">
                  By {article.author} <span className="mx-2">•</span> {article.date}
                </div>
                
                <p className="text-gray-600 text-sm font-opensans mb-8 flex-grow leading-relaxed">
                  {article.excerpt}
                </p>
                
                <a 
                  href={article.link} 
                  className="text-black font-bold text-sm hover:text-[#D4AF37] transition-colors mt-auto inline-block uppercase tracking-widest border-b-2 border-transparent hover:border-[#D4AF37] pb-1"
                >
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Call to Action */}
      <CTASection />
    </div>
  );
};

export default Resources;
