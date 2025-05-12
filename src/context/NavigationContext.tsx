'use client'; // Context providers are client components

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // For reacting to route changes

// Define overall application view states
export type AppView = 'landing' | 'homeWithNav' | 'pageWithNav' | 'buildingDetail';

interface NavigationState {
  currentView: AppView;
  previousView: AppView | null; // Added previousView
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
  previousView: null, // Initialize previousView
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

  // Helper to update state while setting previousView
  const updateNavState = (updater: (prevState: NavigationState) => NavigationState) => {
    setNavState(prev => {
      const newState = updater(prev);
      return { ...newState, previousView: prev.currentView };
    });
  };

  // Effect to sync context state with URL, primarily for browser back/forward or direct URL entry
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    let newView: AppView = 'landing';
    let newIsCoverVisible = true;
    let newIsNavOpen = false; // Desktop nav, closed by default on mobile initially
    let newActiveBuildingId: string | null = null;
    // isMobileMenuOpen is not directly synced with path, it's a manual toggle

    const homeCopyRegex = /^\/home-copy-\d+$/; // Regex for /home-copy-1, /home-copy-2, etc.

    if (pathname === '/') {
      // Default landing state handled by initialization
      newIsNavOpen = false; // Explicitly keep desktop nav closed
    } else if (pathname === '/home' || homeCopyRegex.test(pathname)) {
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

    // Update state, preserving previousView logic if this effect is setting initial state
    // For direct URL navigation, previousView might be less relevant or set to current if truly initial
    setNavState(prevState => {
      // If currentView is different, then existing prevState.currentView becomes the new previousView
      const newPreviousView = prevState.currentView !== newView ? prevState.currentView : prevState.previousView;
      return {
        ...prevState,
        currentView: newView,
        previousView: newPreviousView, // Set previousView
        isCoverPhotoVisible: newIsCoverVisible,
        isNavOpen: newIsNavOpen,
        activeBuildingId: newActiveBuildingId,
      };
    });

  }, [pathname]);

  const navigateToHome = () => {
    updateNavState(prev => ({
      ...prev,
      currentView: 'homeWithNav',
      isCoverPhotoVisible: false,
      isNavOpen: true, 
      activeBuildingId: null,
      isMobileMenuOpen: false, 
    }));
    router.push('/home');
  };

  const navigateToPage = (path: string) => {
    updateNavState((prev) => {
      const homeCopyRegex = /^\/home-copy-\d+$/;
      return {
        ...prev,
        currentView: (path === '/home' || homeCopyRegex.test(path)) ? 'homeWithNav' : 'pageWithNav',
        activeBuildingId: null, 
        isMobileMenuOpen: false, 
      };
    });
    router.push(path);
  };

  const navigateToBuilding = (id: string) => {
    updateNavState((prev) => ({
      ...prev,
      currentView: 'buildingDetail',
      isCoverPhotoVisible: false,
      isNavOpen: true, 
      activeBuildingId: id,
      isMobileMenuOpen: false, 
    }));
    router.push(`/building/${id}`);
  };

  const closeBuildingDetail = () => {
    updateNavState((prev) => ({
      ...prev,
      currentView: 'homeWithNav',
      activeBuildingId: null,
      isMobileMenuOpen: false, 
    }));
    router.push('/home');
  };

  const toggleMobileMenu = () => {
    // For toggles, previousView is not as critical in the same way as navigation
    // but we still update it if currentView were to change, which it doesn't here.
    setNavState((prev) => ({ ...prev, previousView: prev.currentView, isMobileMenuOpen: !prev.isMobileMenuOpen }));
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