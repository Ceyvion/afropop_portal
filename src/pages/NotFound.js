import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxxl};
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 6rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.headings};
`;

const Message = styled.p`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const DrumIcon = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: ${({ theme }) => theme.spacing.lg} auto;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

function NotFound() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NotFoundContainer>
        <motion.div variants={itemVariants}>
          <Title>404</Title>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Subtitle>Page Not Found</Subtitle>
        </motion.div>
        
        <DrumIcon 
          variants={pulseVariants}
          animate="pulse"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="#FF5722" />
            <ellipse cx="50" cy="50" rx="20" ry="30" fill="none" stroke="#FFF" strokeWidth="3" />
            <line x1="30" y1="30" x2="70" y2="30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="70" x2="70" y2="70" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </DrumIcon>
        
        <motion.div variants={itemVariants}>
          <Message>
            Sorry, the page you're looking for doesn't exist or has been moved.
            Our rhythm seems to be off on this one.
          </Message>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Link to="/">
            <Button size="large">
              Return to Dashboard
            </Button>
          </Link>
        </motion.div>
      </NotFoundContainer>
    </motion.div>
  );
}

export default NotFound;
