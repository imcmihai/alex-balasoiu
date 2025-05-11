import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import styles from './Container.module.css'; // We'll create this next

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType; // Allow rendering as a different HTML element (e.g., section, main)
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Example max-width presets
}

// Combine our props with MotionProps for Framer Motion capabilities
type MotionContainerProps = ContainerProps & MotionProps;

const Container: React.FC<MotionContainerProps> = ({
  children,
  className,
  as: Component = 'div', // Default to a div element
  maxWidth = 'lg',
  ...props // Spread the rest of the props, including motion props
}) => {
  const containerClasses = `
    ${styles.containerBase}
    ${maxWidth && styles[maxWidth]}
    ${className || ''}
  `;

  return (
    <motion.custom
      as={Component} // Use the 'as' prop correctly with framer-motion for custom components
      className={containerClasses.trim()}
      {...props} // Spread the rest of the props
    >
      {children}
    </motion.custom>
  );
};

export default Container; 