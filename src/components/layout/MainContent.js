import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MainContentWrapper = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  position: relative;
`;

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.2
    } 
  }
};

function MainContent({ children }) {
  return (
    <MainContentWrapper>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={contentVariants}
      >
        {children}
      </motion.div>
    </MainContentWrapper>
  );
}

export default MainContent;
