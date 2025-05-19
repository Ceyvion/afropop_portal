import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Grid from '../components/ui/Grid';
import Input from '../components/ui/Input';

const PageHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.headings};
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

// Admin Navigation styles
const AdminTabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
`;

const TabButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: none;
  border: none;
  font-size: 1.6rem;
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ active }) => active ? 1 : 0};
    transition: opacity ${({ theme }) => theme.transitions.default};
  }
`;

const TabIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Dashboard Stats styles
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatValue = styled.div`
  font-size: 4.8rem;
  font-weight: bold;
  color: ${({ theme, color }) => color || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatChange = styled.div`
  font-size: 1.4rem;
  color: ${({ isPositive, theme }) => isPositive ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Content Management styles
const ContentTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: ${({ theme }) => `${theme.colors.primary}10`};
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  transition: background-color ${({ theme }) => theme.transitions.quick};

  &:nth-child(even) {
    background-color: ${({ theme }) => `${theme.colors.primary}03`};
  }

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}08`};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: 1.4rem;
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: left;
  font-size: 1.4rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
`;

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

function AdminPanel() {
  // Tab state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  
  // Simulated data for admin panel
  const stats = [
    {
      id: 'members',
      value: 248,
      label: 'Total Members',
      change: '+12%',
      isPositive: true,
      color: '#4a7c59'
    },
    {
      id: 'donations',
      value: '$8,239',
      label: 'Monthly Donations',
      change: '+5%',
      isPositive: true,
      color: '#4CAF50'
    },
    {
      id: 'content',
      value: 86,
      label: 'Content Pieces',
      change: '+3',
      isPositive: true,
      color: '#2196F3'
    },
    {
      id: 'events',
      value: 12,
      label: 'Upcoming Events',
      change: '-2',
      isPositive: false,
      color: '#FFC107'
    },
    {
      id: 'signups',
      value: 32,
      label: 'New Signups',
      change: '+8%',
      isPositive: true,
      color: '#9C27B0'
    },
    {
      id: 'activeSubs',
      value: 192,
      label: 'Active Subs',
      change: '+2%',
      isPositive: true,
      color: '#00BCD4'
    }
  ];
  
  const contentItems = [
    { 
      id: 1, 
      title: 'Fela Kuti: The Legacy Lives On', 
      type: 'Article', 
      author: 'Editorial Team', 
      publishDate: '2023-05-15', 
      status: 'published'
    },
    { 
      id: 2, 
      title: 'Desert Blues: Sounds of the Sahara', 
      type: 'Video', 
      author: 'Sahel Productions', 
      publishDate: '2023-05-10', 
      status: 'published'
    },
    { 
      id: 3, 
      title: 'Interview with Angelique Kidjo', 
      type: 'Audio', 
      author: 'Podcast Team', 
      publishDate: '2023-06-01', 
    status: 'scheduled'
    }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'content', label: 'Content', icon: '📄' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  const filteredContent = contentItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <PageTitle>Admin Panel</PageTitle>
        </motion.div>
      </PageHeader>
      
      <AdminTabs>
        {tabs.map(tab => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <TabIcon>{tab.icon}</TabIcon>
            {tab.label}
          </TabButton>
        ))}
      </AdminTabs>
      
      <motion.div variants={fadeInUp}>
        <SectionTitle>Portal Overview</SectionTitle>
        <StatsGrid>
          {stats.map(stat => (
            <StatCard key={stat.id}>
              <StatValue color={stat.color}>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
              <StatChange isPositive={stat.isPositive}>
                {stat.isPositive ? "↑ " : "↓ "}
                {stat.change}
              </StatChange>
            </StatCard>
          ))}
        </StatsGrid>
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <SectionTitle>Recent Content</SectionTitle>
        <SearchBar>
          <Input
            placeholder="Search content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '30rem' }}
          />
        </SearchBar>
        <ContentTable>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>Title</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Author</TableHeader>
                <TableHeader>Publish Date</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {filteredContent.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                    No content found
                  </TableCell>
                </TableRow>
              ) : (
                filteredContent.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell>{item.publishDate}</TableCell>
                    <TableCell>
                      <Badge>{item.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </tbody>
          </Table>
        </ContentTable>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button>View All Content</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminPanel;
