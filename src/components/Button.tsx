import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import styles from './Button.module.css'; // We'll create this next

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Example variants
  // Add any other specific props for your button
}

// Combine standard button attributes with MotionProps for Framer Motion integration
type MotionButtonProps = ButtonProps & MotionProps;

const Button: React.FC<MotionButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const buttonClasses = `
    ${styles.buttonBase}
    ${variant === 'primary' ? styles.primary : styles.secondary}
    ${className || ''}
  `;

  return (
    <motion.button
      className={buttonClasses.trim()}
      whileHover={{ scale: 1.05 }} // Example hover effect
      whileTap={{ scale: 0.95 }}   // Example tap effect
      {...props} // Spread the rest of the props, including motion props
    >
      {children}
    </motion.button>
  );
};

export default Button; 