import { MobileNav } from './navigation/MobileNav';
import { Ship } from 'lucide-react';
import logo from './logo2.png';
import { Link } from 'react-scroll';

export const Navbar = () => {
  const menuItems = [
    { title: 'Home', to: 'home', section: 'home' },
    { title: 'About', to: 'about', section: 'about' },
    { title: 'Services', to: 'services', section: 'services' },
    { title: 'Feedback', to: 'feedback', section: 'feedback' },
    { title: 'Contact', to: 'contact', section: 'contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15">
            <div className="flex items-center">
              <Link
                to="home"
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="flex items-center cursor-pointer group transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('home');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <img src={logo} alt="New Phoenix Boating & Adventures logo" className="h-16 w-16 group-hover:scale-105 transition-transform duration-300" />
                <span className="ml-3 text-2xl font-bold text-white font-['Poppins'] tracking-tight group-hover:text-blue-200 transition-colors duration-300">
                  New Phoenix
                  <span className="block text-sm font-light opacity-90">Boating & Adventures</span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.section}
                    spy={true}
                    smooth={true}
                    offset={-64}
                    duration={500}
                    className="text-gray-200 hover:text-white cursor-pointer font-medium relative group"
                    onClick={() => {
                      const element = document.getElementById(item.to);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <MobileNav />
    </>
  );
};