import { motion } from 'framer-motion';
import { tokens } from '../tokens';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  animate = true,
  hover = true,
  ...props
}) => {
  const variants = {
    default: {
      backgroundColor: tokens.colors.neutral[50],
      border: `1px solid ${tokens.colors.neutral[200]}`,
      boxShadow: tokens.shadow.sm,
    },
    elevated: {
      backgroundColor: tokens.colors.neutral[50],
      border: 'none',
      boxShadow: tokens.shadow.lg,
    },
    outline: {
      backgroundColor: 'transparent',
      border: `1px solid ${tokens.colors.neutral[300]}`,
      boxShadow: 'none',
    },
    glass: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: `1px solid rgba(255, 255, 255, 0.2)`,
      backdropFilter: 'blur(10px)',
      boxShadow: tokens.shadow.md,
    },
  };

  const paddings = {
    sm: tokens.spacing[3],
    md: tokens.spacing[4],
    lg: tokens.spacing[6],
    xl: tokens.spacing[8],
  };

  const baseStyles = {
    borderRadius: tokens.borderRadius.xl,
    transition: tokens.transition.base,
    overflow: 'hidden',
    padding: paddings[padding],
    ...variants[variant],
  };

  const hoverStyles = hover ? {
    whileHover: { 
      y: -2,
      boxShadow: tokens.shadow.xl,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  } : {};

  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
    ...hoverStyles,
  } : {};

  return (
    <motion.div
      style={baseStyles}
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;