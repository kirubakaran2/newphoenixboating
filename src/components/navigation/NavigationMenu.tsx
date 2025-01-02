import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

interface MenuItem {
  title: string;
  to: string;
  section: string;
}

interface NavigationMenuProps {
  onItemClick: () => void;
}

const menuItems: MenuItem[] = [
  { title: 'Home', to: 'home', section: 'menu' },
  { title: 'About', to: 'about', section: 'menu' },
  { title: 'Services', to: 'services', section: 'menu' },
  { title: 'Feedback', to: 'feedback', section: 'menu' },
  { title: 'Contact', to: 'contact', section: 'menu' },
];

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ onItemClick }) => {
  return (
    <nav className="space-y-8 font-serif px-6">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.to}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ 
            scale: 1.1,
            x: 20,
            transition: { type: "spring", stiffness: 300 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to={item.section}
            spy={true}
            smooth={true}
            offset={-64}
            duration={500}
            className="text-4xl md:text-6xl font-bold text-white flex items-center relative group"
            onClick={() => {
              onItemClick();
              setTimeout(() => {
                const element = document.getElementById(item.to);
                element?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            <span className="relative z-10">
              {item.title}
              <motion.span 
                className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-400 group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
            </span>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};