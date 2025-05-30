import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

// Pages
import Dashboard from './pages/Dashboard';
import ContentLibrary from './pages/ContentLibrary';
import Playlists from './pages/Playlists';
import Account from './pages/Account';
import CommunityHub from './pages/CommunityHub';
import AdminPanel from './pages/AdminPanel';
import AfropopFeed from './pages/AfropopFeed';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

const AppWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  /* Soft background accents */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(255, 87, 34, 0.05) 0%, transparent 200px),
      radial-gradient(circle at 80% 80%, rgba(38, 166, 154, 0.05) 0%, transparent 300px);
    z-index: -1;
  }
`;

function App() {
  // Simulated authentication state - would come from an auth context in a real app
  const isAuthenticated = true;
  const location = useLocation();
  const hideSidebar = location.pathname === '/login';
  const userProfile = {
    name: 'Djamila',
    membershipLevel: 'Gold Supporter',
    avatarUrl: 'https://via.placeholder.com/150',
    joinDate: '2023-05-10'
  };

  return (
    <AppWrapper>
      {!hideSidebar && <Sidebar userProfile={userProfile} />}
      <MainContent>
        <Routes>
          <Route path="/" element={<Dashboard userProfile={userProfile} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/content" element={<ContentLibrary />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/account" element={<Account userProfile={userProfile} />} />
          <Route path="/feed" element={<AfropopFeed />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContent>
    </AppWrapper>
  );
}

export default App;
