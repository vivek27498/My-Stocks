import { motion } from 'framer-motion';
import { tokens } from '../tokens';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const variants = {
    primary: {
      backgroundColor: tokens.colors.primary[500],
      color: tokens.colors.neutral[50],
      border: `1px solid ${tokens.colors.primary[500]}`,
      '&:hover': {
        backgroundColor: tokens.colors.primary[600],
      },
    },
    secondary: {
      backgroundColor: 'transparent',
      color: tokens.colors.primary[500],
      border: `1px solid ${tokens.colors.primary[500]}`,
      '&:hover': {
        backgroundColor: tokens.colors.primary[50],
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: tokens.colors.neutral[600],
      border: 'none',
      '&:hover': {
        backgroundColor: tokens.colors.neutral[100],
      },
    },
  };

  const sizes = {
    sm: {
      padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
      fontSize: tokens.typography.fontSize.sm,
      borderRadius: tokens.borderRadius.md,
    },
    md: {
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      fontSize: tokens.typography.fontSize.base,
      borderRadius: tokens.borderRadius.md,
    },
    lg: {
      padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
      fontSize: tokens.typography.fontSize.lg,
      borderRadius: tokens.borderRadius.lg,
    },
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: tokens.typography.fontFamily.sans.join(', '),
    fontWeight: tokens.typography.fontWeight.medium,
    lineHeight: tokens.typography.lineHeight.tight,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: tokens.transition.base,
    opacity: disabled ? 0.6 : 1,
    ...variants[variant],
    ...sizes[size],
  };

  return (
    <motion.button
      style={baseStyles}
      className={className}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;