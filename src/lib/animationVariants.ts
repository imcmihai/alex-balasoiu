import { Variants } from 'framer-motion';

/**
 * Reusable Animation Variants for Framer Motion
 *
 * Define variants here to be imported and used across components.
 * This helps maintain consistency in animations.
 */

// Example: Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5, // Default duration, can be overridden
      ease: "easeOut", // Default ease, can be overridden
    },
  },
};

// Example: Slide In From Left
export const slideInLeft: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, -0.01, 0.9], // Example custom cubic bezier
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
        duration: 0.5,
        ease: "easeIn"
    }
  }
};

// Example: Cover Photo Retraction (as per PRD 2.1.2, 2.2.1)
export const coverPhotoRetract: Variants = {
  initial: { x: '0%' }, // Assuming it starts at its normal position
  retracted: {
    x: '-100%', // Slides out of viewport to the left
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

// Example: Navigation Menu Slide In (as per PRD 2.1.2, 2.2.1, modified by user request)
export const navMenuSlideIn: Variants = {
  hidden: { x: '-100%', opacity: 0 }, // Starts off-screen to its own left, and transparent
  visible: {
    x: '0%', // Slides into its designated 50% space from its left
    opacity: 1,
    transition: {
      duration: 0.8, // PRD 2.2.1
      ease: 'easeInOut', // PRD 2.2.1
    },
  },
  exit: {
    x: '-100%', // Slides back out to its own left
    opacity: 0,
    transition: {
      duration: 0.5, // Slightly faster exit or match PRD for consistency
      ease: "easeInOut"
    }
  }
};

// Example: Fade In (updated with exit for page transitions)
export const fadeInWithExit: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5, // PRD 2.1.5: Page fade transitions: 0.5s
      ease: "easeOut", // PRD 2.1.5: "ease"
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5, // Slightly faster exit, or match 0.5s
      ease: "easeIn",
    },
  },
};

// Updated and new variants for building detail page transition
export const navMenuComprehensive = {
  initialHiddenRight: { x: "100%", zIndex: 100 }, // Default starting position (off-screen right), ensure zIndex is high
  visible: { x: "0%", zIndex: 100, transition: { duration: 0.8, ease: "easeInOut" } },
  hiddenLeft: { x: "-100%", zIndex: -1, transition: { duration: 0.8, ease: "easeInOut" } }, // For building detail transition, send to back
  exitToRight: { x: "100%", zIndex: 100, transition: { duration: 0.8, ease: "easeInOut" } }, // Default exit, ensure zIndex is high
  visibleAfterDetail: { // New variant for returning from detail view
    x: "0%", 
    zIndex: 100, 
    transition: { duration: 0.8, ease: "easeInOut", delay: 0 } // Changed delay to 0
  },
};

export const contentAreaAnimateWidth = {
  normal: { width: '50%', transition: { duration: 0.5, ease: 'easeInOut'} },
  expandedTo80: {
    width: '80%',
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.5 }, // 0.5s delay from menu animation start
  },
  normalAfterDetail: { // New variant for returning from detail view
    width: '50%',
    transition: { duration: 0.8, ease: 'easeInOut', delay: 0 }, // Changed delay to 0 and duration to 0.8s
  },
};

export const buildingDetailSlideInDefault = { // Renamed from buildingDetailSlideIn
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

export const buildingDetailSlideInDelayed = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut', delay: 0.6 }, // 0.5s (content area delay) + 0.1s
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeInOut' }, // Standard exit for now
  },
};

// Add more variants as defined in the PRD (e.g., Building Detail Slide, Page Fade)
export const buildingDetailSlideIn: Variants = {
  hidden: {
    x: '-100%', // Start fully to the left of its container
    opacity: 0.8, // Can start slightly visible or fully transparent
  },
  visible: {
    x: '0%', // End position (relative to its container)
    opacity: 1,
    transition: {
      duration: 0.8, // PRD 2.2.1: Building detail slide: 0.8s
      ease: 'easeInOut', // PRD 2.2.1
    },
  },
  exit: {
    x: '-100%', // Slide out to the left
    opacity: 0,
    transition: {
      duration: 0.6, // Slightly faster or match 0.8s
      ease: 'easeInOut',
    },
  },
}; 