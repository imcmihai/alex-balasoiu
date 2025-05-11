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
          <div className={styles.contentAreaContainer}>
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
                  variants={buildingDetailSlideIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {children}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {isNavOpen && (
              <motion.aside
                className={styles.navMenuArea}
                variants={navMenuSlideIn}
                initial="hidden"
                animate="visible"
                exit="exit"
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
                  variants={buildingDetailSlideIn}
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