'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, AppView } from '@/context/NavigationContext';
import { usePathname } from 'next/navigation';
import styles from './MainAppLayout.module.css';
import {
  navMenuSlideIn,
  fadeInWithExit,
  buildingDetailSlideIn,
  navMenuComprehensive,
  contentAreaAnimateWidth,
  buildingDetailSlideInDelayed,
  buildingDetailSlideInDefault,
} from '@/lib/animationVariants';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

// Simple hook to check if mobile (can be refined with window resize listeners)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const {
    currentView,
    previousView,
    isNavOpen,
    activeBuildingId,
    closeBuildingDetail,
    isMobileMenuOpen,
    toggleMobileMenu,
  } = useNavigation();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isMainLayoutVisible = currentView !== 'landing';
  if (!isMainLayoutVisible) return <>{children}</>;

  // Determine animation targets based on current and previous view
  let contentAnimateTarget = 'normal';
  if (currentView === 'buildingDetail') {
    contentAnimateTarget = 'expandedTo80';
  } else if (previousView === 'buildingDetail' && (currentView === 'homeWithNav' || currentView === 'pageWithNav')) {
    contentAnimateTarget = 'normalAfterDetail';
  }

  let navMenuAnimateTarget = 'visible'; // Default for when isNavOpen is true
  if (currentView === 'buildingDetail') {
    navMenuAnimateTarget = 'hiddenLeft';
  } else if (previousView === 'buildingDetail' && (currentView === 'homeWithNav' || currentView === 'pageWithNav')) {
    navMenuAnimateTarget = 'visibleAfterDetail';
  }
  // Note: The AnimatePresence for navMenuArea handles the isNavOpen for initial appearance/disappearance to/from landing.
  // The initial="initialHiddenRight" and exit="exitToRight" on motion.aside also play a role.

  let mainContent = null;
  if (currentView === 'homeWithNav' || currentView === 'pageWithNav') {
    mainContent = children;
  } else if (currentView === 'buildingDetail') {
    mainContent = null; 
  }

  // Animation for mobile dropdown menu (placeholder - will push content)
  const mobileMenuVariant = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', // Adjust to content size or a fixed max-height
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
  };

  return (
    <div className={styles.appContainer}>
      {!isMobile && (
        // DESKTOP: Left Content Area + Right Nav Menu Panel
        <>
          <motion.div
            className={styles.contentAreaContainer}
            variants={contentAreaAnimateWidth}
            initial="normal"
            animate={contentAnimateTarget}
          >
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname} 
                className={styles.mainPageContent}
                variants={fadeInWithExit}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {mainContent}
              </motion.main>
            </AnimatePresence>

            {currentView === 'buildingDetail' && (
                <div 
                    className={styles.homePeekArea}
                    onClick={closeBuildingDetail}
                >
                </div>
            )}

            <AnimatePresence mode="wait">
              {currentView === 'buildingDetail' && activeBuildingId && (
                <motion.div
                  key={`building-${activeBuildingId}`}
                  className={styles.buildingDetailPanel}
                  variants={buildingDetailSlideInDelayed}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {isNavOpen && (
              <motion.aside
                className={styles.navMenuArea}
                variants={navMenuComprehensive}
                initial="initialHiddenRight"
                animate={navMenuAnimateTarget}
                exit="exitToRight"
              >
                <NavigationMenu />
              </motion.aside>
            )}
          </AnimatePresence>
        </>
      )}

      {isMobile && (
        // MOBILE: Top Bar + Content Area + Animated Dropdown Menu
        <div className={styles.mobileLayoutContainer}>
          <header className={styles.mobileTopBar}>
            <div className={styles.companyName}>Company Name</div>
            <BurgerMenu isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu} />
          </header>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                className={styles.mobileNavDropdown}
                variants={mobileMenuVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NavigationMenu />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Content Area (pushed down by menu) */}
          {/* This styling needs to account for the presence of the dropdown */}
          <div className={`${styles.mobileContentArea} ${isMobileMenuOpen ? styles.contentPushedDown : ''}`}>
            {/* Same logic as desktop for what mainContent or building detail to show, but different wrapper */} 
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname} 
                className={styles.mainPageContent}
                variants={fadeInWithExit}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {mainContent}
              </motion.main>
            </AnimatePresence>
            {/* Building detail for mobile might need different styling or a simplified overlay approach */} 
            <AnimatePresence mode="wait">
              {currentView === 'buildingDetail' && activeBuildingId && (
                <motion.div
                  key={`building-${activeBuildingId}`}
                  className={styles.buildingDetailPanelMobile}
                  variants={buildingDetailSlideInDefault}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
             {/* Mobile doesn't have the homePeekArea div, back arrow on detail page is primary */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAppLayout; 