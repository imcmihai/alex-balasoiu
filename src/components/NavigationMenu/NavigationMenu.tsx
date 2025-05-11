'use client';

import React from 'react';
import Link from 'next/link'; // Using Next.js Link for client-side navigation benefits
import { useNavigation } from '@/context/NavigationContext';
import styles from './NavigationMenu.module.css';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', path: '/home' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
  // Add other navigation items if any
];

const NavigationMenu: React.FC = () => {
  const { navigateToPage } = useNavigation();

  const handleLinkClick = (path: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    navigateToPage(path); // Use context to handle navigation and state changes
  };

  return (
    <nav className={styles.navMenuContainer}>
      <div className={styles.logoPlaceholder}>
        {/* PRD 2.3.3: Company logo/name at top */}
        <Link href="/" onClick={(e) => handleLinkClick('/', e)} className={styles.logoLink}>
          Company Logo/Name
        </Link>
      </div>

      <ul className={styles.navList}>
        {navItems.map((item) => (
          <motion.li
            key={item.path}
            className={styles.navItem}
            whileHover={{ scale: 1.05 }} // Subtle hover effect
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link 
              href={item.path} 
              onClick={(e) => handleLinkClick(item.path, e)}
              className={styles.navLink}
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>

      <div className={styles.contactInfoPlaceholder}>
        {/* PRD 2.3.3: Contact information at bottom (optional) */}
        <p>Contact: info@example.com</p>
        <p>+1 234 567 8900</p>
      </div>
    </nav>
  );
};

export default NavigationMenu; 