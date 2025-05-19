import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const BaseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme, size }) => 
    size === 'small' ? `${theme.spacing.xxs} ${theme.spacing.sm}` :
    size === 'large' ? `${theme.spacing.sm} ${theme.spacing.xl}` :
    `${theme.spacing.xs} ${theme.spacing.lg}`
  };
  font-size: ${({ theme, size }) => 
    size === 'small' ? '1.4rem' :
    size === 'large' ? '1.8rem' :
    '1.6rem'
  };
  font-weight: 500;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  

  /* Subtle outline for depth */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${({ theme, iconOnly }) => iconOnly ? '0' : theme.spacing.xs};
  }
`;

const PrimaryButtonStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const SecondaryButtonStyles = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  
  &:hover:not(:disabled) {
    background-color: rgba(255, 87, 34, 0.05);
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const TertiaryButtonStyles = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    display: none;
  }
`;

const IconButtonStyles = css`
  width: ${({ size }) => 
    size === 'small' ? '3rem' :
    size === 'large' ? '5rem' :
    '4rem'
  };
  height: ${({ size }) => 
    size === 'small' ? '3rem' :
    size === 'large' ? '5rem' :
    '4rem'
  };
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
`;

const StyledButton = styled(motion.button)`
  ${BaseButtonStyles}
  
  ${({ variant }) => variant === 'primary' && PrimaryButtonStyles}
  ${({ variant }) => variant === 'secondary' && SecondaryButtonStyles}
  ${({ variant }) => variant === 'tertiary' && TertiaryButtonStyles}
  ${({ iconOnly }) => iconOnly && IconButtonStyles}
`;

// Animation variants
const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  disabled: {
    scale: 1,
    opacity: 0.6
  }
};

// Ripple effect component
const Ripple = styled(motion.span)`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  pointer-events: none;
`;

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon,
  iconOnly = false,
  onClick,
  ...props
}) {
  const [ripples, setRipples] = React.useState([]);
  
  const handleClick = (e) => {
    if (disabled) return;
    
    // Handle ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples((prevRipples) => [...prevRipples, ripple]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter(r => r.id !== ripple.id));
    }, 600);
    
    if (onClick) onClick(e);
  };
  
  return (
    <StyledButton
      disabled={disabled}
      variant={variant}
      size={size}
      iconOnly={iconOnly}
      onClick={handleClick}
      whileHover={!disabled ? "hover" : "disabled"}
      whileTap={!disabled ? "tap" : "disabled"}
      variants={buttonVariants}
      animate={disabled ? "disabled" : ""}
      {...props}
    >
      {icon && icon}
      {(!iconOnly || !icon) && children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <Ripple
          key={ripple.id}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size
          }}
          initial={{ transform: 'scale(0)', opacity: 0.6 }}
          animate={{ transform: 'scale(2)', opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </StyledButton>
  );
}

export default Button;
