import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';

const SidebarWrapper = styled.aside`
  width: 260px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  /* Wave decoration at bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%2326A69A'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%2326A69A'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%2326A69A'%3E%3C/path%3E%3C/svg%3E");
    background-size: cover;
    background-position: center top;
    z-index: 0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
  
  img {
    width: 80px;
    height: auto;
  }
  
  h1 {
    font-size: 2.8rem;
    color: white;
    margin: 0;
    letter-spacing: 1px;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Username = styled.h2`
  color: white;
  font-size: 2.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  text-align: center;
`;

const MembershipLevel = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.xxs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Navigation = styled.nav`
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
  z-index: 1;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: white;
    }
  }
`;

const NavIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const NavText = styled.span`
  position: relative;
  z-index: 1;
`;

const Footer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  position: relative;
  z-index: 1;
`;

// Animation variants for page transitions
const sidebarVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

function Sidebar({ userProfile }) {
  return (
    <SidebarWrapper>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        <LogoContainer>
          <motion.img src={logo} alt="Afropop Logo" whileHover={{ rotate: 10 }} />
        </LogoContainer>
        
        <UserSection>
          <Avatar src={userProfile.avatarUrl} />
          <Username>{userProfile.name}</Username>
          <MembershipLevel>{userProfile.membershipLevel}</MembershipLevel>
        </UserSection>
        
        <Navigation>
          <NavList>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/">
                  <NavIcon>⭐</NavIcon>
                  <NavText>Overview</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/content">
                  <NavIcon>📺</NavIcon>
                  <NavText>Exclusive Content</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/playlists">
                  <NavIcon>🎵</NavIcon>
                  <NavText>Playlists</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/community">
                  <NavIcon>👥</NavIcon>
                  <NavText>Community Hub</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/account">
                  <NavIcon>👤</NavIcon>
                  <NavText>My Account</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
            <NavItem>
              <motion.div variants={itemVariants}>
                <StyledNavLink to="/admin">
                  <NavIcon>⚙️</NavIcon>
                  <NavText>Admin Panel</NavText>
                </StyledNavLink>
              </motion.div>
            </NavItem>
          </NavList>
        </Navigation>
        
        <Footer>
          <p>© {new Date().getFullYear()} Afropop Worldwide</p>
        </Footer>
      </motion.div>
    </SidebarWrapper>
  );
}

export default Sidebar;
