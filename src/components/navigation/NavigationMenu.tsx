import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Mail, Instagram } from 'lucide-react'; // Importing the Mail and Instagram icons
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'; // Phone and WhatsApp icons from react-icons

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
  { title: 'Gallery', to: 'gallery', section: 'menu' },
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
            transition: { type: 'spring', stiffness: 300 },
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

      <div className="flex space-x-6 justify-center pt-8">
        <motion.a
          href="mailto:newphoenixboatingadventures@gmail.com"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          <Mail size={32} />
        </motion.a>

        {/* Phone link with FaPhoneAlt from react-icons */}
        <motion.a
          href="tel:+919092446092" // Phone number link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          <FaPhoneAlt size={32} /> {/* Phone icon from react-icons */}
        </motion.a>

        {/* WhatsApp link with FaWhatsapp from react-icons */}
        <motion.a
          href="https://wa.me/9087396092" // WhatsApp link
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          <FaWhatsapp size={32} /> {/* WhatsApp icon from react-icons */}
        </motion.a>

        <motion.a
          href="https://www.instagram.com/newphoenixboatingpy/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-white"
        >
          <Instagram size={32} />
        </motion.a>
      </div>
    </nav>
  );
};
