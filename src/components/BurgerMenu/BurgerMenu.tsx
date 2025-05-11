'use client';

import React from 'react';
import styles from './BurgerMenu.module.css';

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onToggle }) => {
  return (
    <button 
      className={`${styles.burgerButton} ${isOpen ? styles.isOpen : ''}`}
      onClick={onToggle}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
    >
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
      <div className={styles.bar}></div>
    </button>
  );
};

export default BurgerMenu; 