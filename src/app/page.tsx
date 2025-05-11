'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { coverPhotoRetract } from '@/lib/animationVariants';
import styles from './page.module.css'; // Import the CSS module

// Placeholder for the Cover Photo component
const CoverPhoto = () => (
  <motion.div
    style={{
      width: '60%', // PRD 2.1.1: Cover photo 60% screen width
      height: '100vh',
      backgroundColor: '#ccc', // Placeholder color
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10, // Ensure it can be above other elements if needed
    }}
    variants={coverPhotoRetract}
    // Animate prop will be controlled by isCoverPhotoVisible from context
  >
    <h2>Cover Photo Area (60%)</h2>
  </motion.div>
);

export default function LandingPage() {
  const { navigateToHome, isCoverPhotoVisible, currentView } = useNavigation();

  // Only render landing page specific content if currentView is 'landing'
  // This helps in transitioning out when navigateToHome is called
  if (currentView !== 'landing') {
    // When transitioning away from landing, this component might unmount or render nothing
    // to allow the next page (/home) to take over within MainAppLayout.
    // The actual animation of the cover photo is handled by its own animate prop.
    return null; 
  }

  return (
    <div className={styles.landingContainer}>
      <AnimatePresence>
        {isCoverPhotoVisible && (
          <motion.div
            key="cover-photo-wrapper"
            className={styles.coverPhotoMotionWrapper} // Wrapper for positioning and animation
            variants={coverPhotoRetract} // This variant makes it slide left
            initial="initial"
            animate={isCoverPhotoVisible ? "initial" : "retracted"}
            exit="retracted"
          >
            <div className={styles.coverPhotoArea}>
              <h2>Cover Photo Area</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={styles.homePeekArea}
        onClick={navigateToHome}
      >
        <h3>Home Page Peek</h3>
        <p>Click here to enter the site.</p>
      </div>

      
    </div>
  );
}
