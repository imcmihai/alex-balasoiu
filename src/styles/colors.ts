/**
 * Color Palette
 *
 * Define your application's color palette here.
 * These can be used in CSS Modules, Tailwind configuration (if extended),
 * or directly in component styles.
 */

export const colors = {
  primary: '#000000', // Example: Black
  secondary: '#FFFFFF', // Example: White
  accent: '#FF0000', // Example: Red for accents
  // Add more colors as needed:
  // neutral: {
  //   lightGray: '#F5F5F5',
  //   mediumGray: '#E0E0E0',
  //   darkGray: '#A0A0A0',
  // },
  // text: {
  //   primary: '#333333',
  //   secondary: '#777777',
  // },
  // background: {
  //   default: '#FFFFFF',
  //   paper: '#F9F9F9',
  // },
};

// Example of how you might type them if you want stricter control
export type ColorKey = keyof typeof colors; 