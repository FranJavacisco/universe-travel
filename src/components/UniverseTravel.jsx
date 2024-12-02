
import React, { useEffect, useState } from 'react';
import { Menu, ChevronLeft, ChevronRight, X } from 'lucide-react';

const SpaceLanding = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cometPosition, setCometPosition] = useState(-200);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    // Animación del astronauta
    const floatAnimation = () => {
      const time = Date.now() / 2000;
      setPosition({
        x: Math.sin(time) * 10,
        y: Math.cos(time) * 10
      });
    };

    // Animación del cometa con velocidad aumentada
    const cometAnimation = () => {
      setCometPosition(prev => {
        if (prev > window.innerWidth + 200) {
          return -200;
        }
        return prev + 3.15;
      });
    };

    const astronautFrame = setInterval(floatAnimation, 50);
    const cometFrame = setInterval(cometAnimation, 16);

    // Observador de secciones para el menú activo
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
    <div className="relative h-screen w-full overflow-hidden bg-[#0A0E17]">
      {/* Background Earth Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url('public/images/backgroundImage.webp')`,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0A0E17] opacity-70" />

      {/* Cometa Imagen */}
      <div 
        className="absolute z-[5] transition-transform duration-300"
        style={{
          left: `${cometPosition}px`,
          top: '20%',
          transform: 'rotate(-45deg)',
        }}
      >
        <img 
          src="public/images/Superman.png" 
          alt="Superman"
          className="w-32 h-auto opacity-80"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.7))'
          }}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-[#0A0E17] p-6">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300"
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

      {/* Content Container */}
      <div className="relative z-10 h-full">
        {/* Navigation */}
        <nav className="flex justify-between items-center px-8 py-6">
          <div className="text-white text-2xl font-bold">UT</div>
          
          {/* Desktop Menu */}
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

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="text-white md:hidden hover:text-gray-300 transition-colors duration-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>

        {/* Main Content */}
        <main className="flex h-[calc(100vh-120px)] px-8">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center z-20">
            <div 
              className="relative"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`
              }}
            >
              <img 
                src="public/images/Floating_astronaut.png" 
                alt="Floating astronaut"
                className="max-w-[600px] animate-float"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-white text-7xl font-bold mb-6">
              Universe
              <br />
              travel
            </h1>
            <p className="text-gray-400 max-w-md mb-8">
              UT is a leading space travel company. It deals with 
              the transportation of passengers to the planets of 
              solar system.
            </p>
          </div>
        </main>

        {/* Footer Content */}
        <div className="absolute bottom-8 left-8">
          <div className="text-gray-500">
            <div className="mb-4">
              <div className="text-sm">OFFICE</div>
              <div>Mars G2 24r</div>
            </div>
            <div>
              <div className="text-sm">GET IN TOUCH</div>
              <div>+1 555 123 4567</div>
              <div>info@ut.com</div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300">
            <ChevronLeft />
          </button>
          <button className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpaceLanding;