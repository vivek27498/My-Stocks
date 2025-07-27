import { motion } from 'framer-motion';
import { tokens } from '../tokens';

const Typography = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className = '',
  animate = false,
  ...props
}) => {
  const variants = {
    h1: {
      fontSize: tokens.typography.fontSize['4xl'],
      lineHeight: tokens.typography.lineHeight.tight,
      fontWeight: tokens.typography.fontWeight.bold,
    },
    h2: {
      fontSize: tokens.typography.fontSize['3xl'],
      lineHeight: tokens.typography.lineHeight.tight,
      fontWeight: tokens.typography.fontWeight.bold,
    },
    h3: {
      fontSize: tokens.typography.fontSize['2xl'],
      lineHeight: tokens.typography.lineHeight.tight,
      fontWeight: tokens.typography.fontWeight.semibold,
    },
    h4: {
      fontSize: tokens.typography.fontSize.xl,
      lineHeight: tokens.typography.lineHeight.tight,
      fontWeight: tokens.typography.fontWeight.semibold,
    },
    body: {
      fontSize: tokens.typography.fontSize.base,
      lineHeight: tokens.typography.lineHeight.normal,
      fontWeight: tokens.typography.fontWeight.normal,
    },
    small: {
      fontSize: tokens.typography.fontSize.sm,
      lineHeight: tokens.typography.lineHeight.normal,
      fontWeight: tokens.typography.fontWeight.normal,
    },
    caption: {
      fontSize: tokens.typography.fontSize.xs,
      lineHeight: tokens.typography.lineHeight.normal,
      fontWeight: tokens.typography.fontWeight.normal,
    },
  };

  const colors = {
    primary: tokens.colors.neutral[900],
    secondary: tokens.colors.neutral[600],
    muted: tokens.colors.neutral[400],
    success: tokens.colors.success[600],
    danger: tokens.colors.danger[600],
    white: tokens.colors.neutral[50],
  };

  const weights = {
    normal: tokens.typography.fontWeight.normal,
    medium: tokens.typography.fontWeight.medium,
    semibold: tokens.typography.fontWeight.semibold,
    bold: tokens.typography.fontWeight.bold,
  };

  const baseStyles = {
    fontFamily: tokens.typography.fontFamily.sans.join(', '),
    color: colors[color],
    textAlign: align,
    margin: 0,
    fontWeight: weights[weight],
    ...variants[variant],
  };

  const MotionComponent = motion[getTag(variant)];

  const animationProps = animate ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  } : {};

  return (
    <MotionComponent
      style={baseStyles}
      className={className}
      {...animationProps}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

function getTag(variant) {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      return variant;
    case 'body':
    case 'small':
    case 'caption':
    default:
      return 'p';
  }
}

export default Typography;