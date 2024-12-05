import React, { useEffect, useState } from 'react';
import { Menu, ChevronLeft, ChevronRight, X, Rocket, Clock } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Mars',
    description: 'Experience the red planet with our premium Mars expedition. Witness the red landscapes and explore ancient river valleys.',
    duration: '8 months',
    price: '$25M',
    image: 'mars.webp',
    distance: '225M km'
  },
  {
    id: 2,
    name: 'Moon',
    description: 'Classic lunar adventures with Earth views included. Walk where the first astronauts made history.',
    duration: '5 days',
    price: '$12M',
    image: 'moon.webp',
    distance: '384K km'
  },
  {
    id: 3,
    name: 'Venus',
    description: 'Explore the morning star in our advanced thermal capsules. Experience the most extreme environment.',
    duration: '12 months',
    price: '$35M',
    image: 'venus.webp',
    distance: '170M km'
  }
];

const DestinationCard = ({ destination }) => (
  <div 
    className="bg-[#0A0E17]/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 md:p-6 transform hover:scale-105 transition-all duration-300 group"
    style={{
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}
  >
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg md:text-2xl font-bold text-white mb-1">
            {destination.name}
          </h3>
          <span className="text-xs text-gray-400">{destination.distance} from Earth</span>
        </div>
        <span className="text-blue-400 font-semibold text-sm md:text-base">
          {destination.price}
        </span>
      </div>

      <p className="text-gray-400 text-xs md:text-sm mb-4 flex-grow">
        {destination.description}
      </p>

      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-start md:items-center gap-2 mt-auto">
        <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
          <Clock className="w-4 h-4" />
          <span>{destination.duration}</span>
        </div>
        <button className="w-full md:w-auto bg-transparent border border-blue-500 text-blue-500 px-3 py-1.5 rounded-full text-xs md:text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group">
          <Rocket className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const SpaceLanding = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cometPosition, setCometPosition] = useState(-200);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const floatAnimation = () => {
      const time = Date.now() / 2000;
      setPosition({
        x: Math.sin(time) * 10,
        y: Math.cos(time) * 10
      });
    };

    const cometAnimation = () => {
      setCometPosition(prev => {
        if (prev > window.innerWidth + 200) {
          return -200;
        }
        return prev + 3.15;
      });
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
    };

    const astronautFrame = setInterval(floatAnimation, 50);
    const cometFrame = setInterval(cometAnimation, 16);

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      clearInterval(astronautFrame);
      clearInterval(cometFrame);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'tours', label: 'Tours' },
    { id: 'planets', label: 'Planets' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleMenuClick = (sectionId) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0E17]">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-[#0A0E17] z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-80"
          onLoadedData={() => setIsLoading(false)}
          style={{ filter: 'brightness(0.7)' }}
        >
          <source src={`${window.location.pathname}videos/Tierra.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-[#0A0E17] opacity-70" />

      <div 
        className="absolute z-[5] transition-transform duration-300"
        style={{
          left: `${cometPosition}px`,
          top: '20%',
          transform: 'rotate(-45deg)',
        }}
      >
        <img 
          src={`${window.location.pathname}images/Superman.png`}
          alt="Superman"
          loading="lazy"
          className="w-24 md:w-32 h-auto opacity-80"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.7))'
          }}
        />
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-[#0A0E17] p-6 transform transition-transform duration-300">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-6 mt-16">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`text-left text-lg ${
                    activeSection === item.id ? 'text-white' : 'text-gray-400'
                  } hover:text-white transition-colors duration-300`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 h-full pb-32 md:pb-40">
        <nav className="flex justify-between items-center px-4 md:px-8 py-4 md:py-6">
          <div className="text-white text-xl md:text-2xl font-bold">UT</div>
          
          <div className="hidden md:flex space-x-12">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`relative ${
                  activeSection === item.id ? 'text-white' : 'text-gray-400'
                } hover:text-white transition-colors duration-300 group`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 transition-transform duration-300 ${
                  activeSection === item.id ? 'scale-x-100' : ''
                } group-hover:scale-x-100`} />
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white md:hidden hover:text-gray-300 transition-colors duration-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        <main className="flex flex-col md:flex-row min-h-[calc(100vh-320px)] px-4 md:px-8">
          <div className="flex-1 flex flex-col justify-center items-center md:items-start z-20 mt-8 md:mt-0">
            <div 
              className="relative w-full max-w-[300px] md:max-w-[600px]"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`
              }}
            >
              <img 
                src={`${window.location.pathname}images/Floating_astronaut.png`}
                alt="Floating astronaut"
                className="w-full h-auto animate-float"
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left mt-8 md:mt-0">
            <h1 className="text-white text-4xl md:text-7xl font-bold mb-6">
              Universe
              <br />
              travel
            </h1>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0 mb-8">
              UT is a leading space travel company. It deals with 
              the transportation of passengers to the planets of 
              solar system.
            </p>
          </div>
        </main>

        <div className="px-4 md:px-8 mt-8 md:mt-16 z-20 relative">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>

        <div className="fixed bottom-4 md:bottom-8 left-4 md:left-8 z-30">
          <div className="text-gray-500 text-sm md:text-base">
            <div className="mb-2 md:mb-4">
              <div className="text-xs md:text-sm">OFFICE</div>
              <div>Mars G2 24r</div>
            </div>
            <div>
              <div className="text-xs md:text-sm">GET IN TOUCH</div>
              <div>+1 555 123 4567</div>
              <div>info@ut.com</div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-30 flex space-x-4">
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceLanding;