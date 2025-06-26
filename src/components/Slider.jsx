import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Slider = () => {
  const navigate = useNavigate();

  // Carousel data with navigation paths
  const slides = [
    {
      id: 1,
      text: "Small Tasks, Big Opportunities.",
      bg: "bg-gradient-to-br from-purple-600 to-blue-500",
      emoji: "💼🌟",
      path: ""
    },
    {
      id: 2,
      text: "Connecting Skills with Needs.",
      bg: "bg-gradient-to-br from-orange-500 to-pink-600",
      emoji: "🤝🔧",
      path: ""
    },
    {
      id: 3,
      text: "Post. Bid. Get It Done.",
      bg: "bg-gradient-to-br from-green-500 to-lime-400",
      emoji: "📝💲✅",
      path: ""
    },
    {
      id: 4,
      text: "Your Marketplace for Everyday Tasks.",
      bg: "bg-gradient-to-br from-cyan-500 to-blue-600",
      emoji: "🛒📋",
      path: ""
    },
    {
      id: 5,
      text: "Find Help. Find Work. Fast.",
      bg: "bg-gradient-to-br from-red-500 to-amber-500",
      emoji: "⚡⏱️",
      path: ""
    }
  ];

  // Initialize carousel (similar to Flowbite's JS)
  useEffect(() => {
    const initCarousel = () => {
      const items = document.querySelectorAll('[data-carousel-item]');
      const buttons = document.querySelectorAll('[data-carousel-slide-to]');
      const prevButton = document.querySelector('[data-carousel-prev]');
      const nextButton = document.querySelector('[data-carousel-next]');
      
      let currentIndex = 0;

      const showSlide = (index) => {
        items.forEach((item, i) => {
          item.classList.toggle('hidden', i !== index);
          item.classList.toggle('block', i === index);
        });
        
        buttons.forEach((button, i) => {
          button.setAttribute('aria-current', i === index);
          button.classList.toggle('bg-white/50', i === index);
          button.classList.toggle('bg-white/30', i !== index);
        });
      };

      const nextSlide = () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
      };

      const prevSlide = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
      };

      buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
          currentIndex = index;
          showSlide(currentIndex);
        });
      });

      prevButton?.addEventListener('click', prevSlide);
      nextButton?.addEventListener('click', nextSlide);

      // Auto-rotate if needed
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    };

    initCarousel();
  }, []);

  return (
    <div id="indicators-carousel" className="relative w-full max-w-6xl mx-auto" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`duration-700 ease-in-out ${index === 0 ? 'block' : 'hidden'}`}
            data-carousel-item={index === 0 ? 'active' : ''}
            onClick={() => navigate(slide.path)}
          >
            <div className={`absolute inset-0 flex flex-col items-center justify-center w-full h-full ${slide.bg} text-white p-8 cursor-pointer`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4 drop-shadow-lg">
                {slide.text}
              </h2>
              <div className="text-3xl animate-bounce sm:text-4xl">
                {slide.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {slides.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-white/50' : 'bg-white/30'}`}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      
      {/* Slider controls */}
      <button 
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button 
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white/70">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Slider;