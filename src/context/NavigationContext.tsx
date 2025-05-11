'use client'; // Context providers are client components

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // For reacting to route changes

// Define overall application view states
export type AppView = 'landing' | 'homeWithNav' | 'pageWithNav' | 'buildingDetail';

interface NavigationState {
  currentView: AppView;
  isCoverPhotoVisible: boolean; // Managed by currentView but kept for clarity for now
  isNavOpen: boolean; // Managed by currentView but kept for clarity
  activeBuildingId: string | null; // Added for building detail
  isMobileMenuOpen: boolean; // Added for mobile dropdown
}

interface NavigationContextType extends NavigationState {
  navigateToHome: () => void;       // From Landing to Home
  navigateToPage: (path: string) => void; // For general page navigation from menu
  navigateToBuilding: (id: string) => void; // Added
  closeBuildingDetail: () => void;        // Added
  toggleMobileMenu: () => void; // Added
}

const defaultState: NavigationState = {
  currentView: 'landing', // Start at landing
  isCoverPhotoVisible: true,
  isNavOpen: false,
  activeBuildingId: null, // Initialize
  isMobileMenuOpen: false, // Initialize
};

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navState, setNavState] = useState<NavigationState>(defaultState);
  const router = useRouter();
  const pathname = usePathname();

  // Effect to sync context state with URL, primarily for browser back/forward or direct URL entry
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    let newView: AppView = 'landing';
    let newIsCoverVisible = true;
    let newIsNavOpen = false; // Desktop nav, closed by default on mobile initially
    let newActiveBuildingId: string | null = null;
    // isMobileMenuOpen is not directly synced with path, it's a manual toggle

    if (pathname === '/') {
      // Default landing state handled by initialization
      newIsNavOpen = false; // Explicitly keep desktop nav closed
    } else if (pathname === '/home') {
      newView = 'homeWithNav';
      newIsCoverVisible = false;
      newIsNavOpen = true; // Desktop nav opens
    } else if (pathname.startsWith('/building/') && pathSegments.length === 2) {
      newView = 'buildingDetail';
      newIsCoverVisible = false;
      newIsNavOpen = true; // Desktop nav remains open
      newActiveBuildingId = pathSegments[1];
    } else if (['/about', '/services', '/contact'].includes(pathname)) {
      newView = 'pageWithNav';
      newIsCoverVisible = false;
      newIsNavOpen = true; // Desktop nav remains open
    }

    setNavState(prevState => ({
      ...prevState, // Preserve isMobileMenuOpen
      currentView: newView,
      isCoverPhotoVisible: newIsCoverVisible,
      isNavOpen: newIsNavOpen, // This will be overridden by media queries for actual display
      activeBuildingId: newActiveBuildingId,
    }));

  }, [pathname]);

  const navigateToHome = () => {
    // This function is called when user clicks on the peek of home page from landing
    setNavState(prev => ({
      ...prev,
      currentView: 'homeWithNav',
      isCoverPhotoVisible: false,
      isNavOpen: true, // Open desktop nav
      activeBuildingId: null,
      isMobileMenuOpen: false, // Close mobile menu on this transition
    }));
    router.push('/home');
  };

  const navigateToPage = (path: string) => {
    // For navigating from the main menu
    setNavState((prev) => ({
      ...prev,
      currentView: path === '/home' ? 'homeWithNav' : 'pageWithNav',
      activeBuildingId: null, // Close building detail if navigating away
      isMobileMenuOpen: false, // Close mobile menu when navigating
    }));
    router.push(path);
  };

  const navigateToBuilding = (id: string) => {
    setNavState((prev) => ({
      ...prev,
      currentView: 'buildingDetail',
      isCoverPhotoVisible: false,
      isNavOpen: true, // Keep desktop nav contextually open
      activeBuildingId: id,
      isMobileMenuOpen: false, // Close mobile menu
    }));
    router.push(`/building/${id}`);
  };

  const closeBuildingDetail = () => {
    // This should navigate back to the home page view
    setNavState((prev) => ({
      ...prev,
      currentView: 'homeWithNav',
      activeBuildingId: null,
      isMobileMenuOpen: false, // Close mobile menu
    }));
    router.push('/home');
  };

  const toggleMobileMenu = () => {
    setNavState((prev) => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  };

  return (
    <NavigationContext.Provider
      value={{
        ...navState,
        navigateToHome,
        navigateToPage,
        navigateToBuilding,
        closeBuildingDetail,
        toggleMobileMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}; 