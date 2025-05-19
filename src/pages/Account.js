import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Grid from '../components/ui/Grid';

const PageHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.headings};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: 2.4rem;
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

// Profile Card styles
const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    text-align: left;
  }
`;

const ProfileAvatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 4px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
    margin-right: ${({ theme }) => theme.spacing.xl};
  }
  
  &:hover .edit-overlay {
    opacity: 1;
  }
`;

const EditAvatarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  color: white;
  font-size: 1.4rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 2.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MembershipBadge = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatItem = styled.div`
  min-width: 120px;
`;

const StatValue = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.headings};
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

// Membership Tier styles
const TierCard = styled(Card)`
  position: relative;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  ${props => props.current && `
    border: 2px solid ${props.theme.colors.primary};
  `}
`;

const TierBadge = styled.div`
  position: absolute;
  top: 20px;
  right: -30px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xl}`};
  transform: rotate(45deg);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const TierHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TierIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const TierInfo = styled.div`
  flex: 1;
`;

const TierName = styled.h3`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const TierPrice = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const TierFeatures = styled.ul`
  list-style: none;
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: 0;
`;

const TierFeature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.primary};
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-weight: bold;
  }
`;

const ProgressSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress || '0%'};
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

// Donation History styles
const DonationTable = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
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
  
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}05`};
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
  background-color: ${({ theme, type }) => 
    type === 'one-time' ? `${theme.colors.info}20` : 
    type === 'recurring' ? `${theme.colors.success}20` : 
    `${theme.colors.primary}20`
  };
  color: ${({ theme, type }) => 
    type === 'one-time' ? theme.colors.info : 
    type === 'recurring' ? theme.colors.success : 
    theme.colors.primary
  };
`;

// Account settings styles
const SettingsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.6rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: border-color ${({ theme }) => theme.transitions.quick};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
`;

const SwitchSlider = styled.span`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: 24px;
  margin-right: ${({ theme }) => theme.spacing.md};
  transition: background-color ${({ theme }) => theme.transitions.default};
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    box-shadow: ${({ theme }) => theme.shadows.small};
    transition: transform ${({ theme }) => theme.transitions.default};
  }
  
  ${SwitchInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.primary};
    
    &::after {
      transform: translateX(26px);
    }
  }
`;

const SwitchText = styled.span`
  font-size: 1.6rem;
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

// Tabs for Account Page
const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow-x: auto;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.primary} ${theme.colors.divider}`};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.divider};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
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
  
  &:hover::after {
    opacity: ${({ active }) => active ? 1 : 0.5};
  }
`;

function Account({ userProfile }) {
  // Tab state
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const membershipLevels = [
    {
      id: 'bronze',
      name: 'Bronze Supporter',
      icon: '🥉',
      color: '#CD7F32',
      price: '$5/month',
      features: [
        'Access to exclusive articles',
        'Monthly newsletter',
        'Basic forum access'
      ],
      current: false
    },
    {
      id: 'silver',
      name: 'Silver Supporter',
      icon: '🥈',
      color: '#C0C0C0',
      price: '$10/month',
      features: [
        'All Bronze benefits',
        'Exclusive video content',
        'Quarterly digital magazine',
        'Enhanced forum access'
      ],
      current: false
    },
    {
      id: 'gold',
      name: 'Gold Supporter',
      icon: '🥇',
      color: '#FFD700',
      price: '$25/month',
      features: [
        'All Silver benefits',
        'Access to live virtual events',
        'Exclusive playlists',
        'Ad-free experience',
        'Priority forum status'
      ],
      current: true
    },
    {
      id: 'diamond',
      name: 'Diamond Supporter',
      icon: '💎',
      color: '#B9F2FF',
      price: '$50/month',
      features: [
        'All Gold benefits',
        'VIP access to in-person events',
        'Monthly exclusive artist interviews',
        'Personal thank you in annual report',
        'Direct access to Afropop team',
        'Early access to new features'
      ],
      current: false
    }
  ];
  
  const donationHistory = [
    {
      id: 1,
      date: '2023-05-01',
      amount: '$25.00',
      method: 'Credit Card (****4832)',
      type: 'recurring',
      status: 'Successful'
    },
    {
      id: 2,
      date: '2023-04-01',
      amount: '$25.00',
      method: 'Credit Card (****4832)',
      type: 'recurring',
      status: 'Successful'
    },
    {
      id: 3,
      date: '2023-03-15',
      amount: '$100.00',
      method: 'PayPal (user@example.com)',
      type: 'one-time',
      status: 'Successful'
    },
    {
      id: 4,
      date: '2023-03-01',
      amount: '$25.00',
      method: 'Credit Card (****4832)',
      type: 'recurring',
      status: 'Successful'
    },
    {
      id: 5,
      date: '2023-02-01',
      amount: '$25.00',
      method: 'Credit Card (****4832)',
      type: 'recurring',
      status: 'Successful'
    }
  ];
  
  // Form state (in a real app, this would be connected to the actual user data)
  const [formState, setFormState] = useState({
    email: 'djamila@example.com',
    firstName: 'Djamila',
    lastName: 'Johnson',
    password: '••••••••',
    emailNotifications: true,
    smsNotifications: false,
    contentPreferences: ['Afrobeat', 'Highlife', 'Desert Blues'],
  });
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Current tier info
  const currentTier = membershipLevels.find(tier => tier.current);
  const nextTier = membershipLevels[membershipLevels.findIndex(tier => tier.current) + 1] || null;
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'membership':
        return (
          <>
            <motion.div variants={fadeInUp}>
              <SectionHeader>
                <SectionTitle>Membership Tier</SectionTitle>
              </SectionHeader>
              
              <Grid columns={12} gap="large">
                <Grid.Item span={6} mobileSpan={12}>
                  <TierCard current>
                    <TierBadge>Current</TierBadge>
                    <TierHeader>
                      <TierIcon color={currentTier.color}>{currentTier.icon}</TierIcon>
                      <TierInfo>
                        <TierName>{currentTier.name}</TierName>
                        <TierPrice>{currentTier.price}</TierPrice>
                      </TierInfo>
                    </TierHeader>
                    
                    <TierFeatures>
                      {currentTier.features.map((feature, index) => (
                        <TierFeature key={index}>{feature}</TierFeature>
                      ))}
                    </TierFeatures>
                    
                    <Button variant="secondary" style={{width: '100%'}}>Manage Subscription</Button>
                  </TierCard>
                </Grid.Item>
                
                {nextTier && (
                  <Grid.Item span={6} mobileSpan={12}>
                    <TierCard>
                      <TierHeader>
                        <TierIcon color={nextTier.color}>{nextTier.icon}</TierIcon>
                        <TierInfo>
                          <TierName>{nextTier.name}</TierName>
                          <TierPrice>{nextTier.price}</TierPrice>
                        </TierInfo>
                      </TierHeader>
                      
                      <TierFeatures>
                        {nextTier.features.map((feature, index) => (
                          <TierFeature key={index}>{feature}</TierFeature>
                        ))}
                      </TierFeatures>
                      
                      <ProgressSection>
                        <ProgressBar progress="65%" />
                        <ProgressLabel>
                          <span>65% to {nextTier.name}</span>
                          <span>$75 more to upgrade</span>
                        </ProgressLabel>
                      </ProgressSection>
                      
                      <Button style={{width: '100%'}}>Upgrade Now</Button>
                    </TierCard>
                  </Grid.Item>
                )}
              </Grid>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SectionHeader>
                <SectionTitle>All Membership Tiers</SectionTitle>
              </SectionHeader>
              
              <Grid columns={12} gap="medium">
                {membershipLevels.map(tier => (
                  <Grid.Item key={tier.id} span={3} mobileSpan={6}>
                    <Card>
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>{tier.icon}</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{tier.name}</h3>
                        <div style={{ fontSize: '14px', color: '#666' }}>{tier.price}</div>
                      </div>
                      {tier.current ? (
                        <Button variant="secondary" size="small" style={{width: '100%'}}>Current</Button>
                      ) : (
                        <Button size="small" style={{width: '100%'}}>Select</Button>
                      )}
                    </Card>
                  </Grid.Item>
                ))}
              </Grid>
            </motion.div>
          </>
        );
        
      case 'donations':
        return (
          <motion.div variants={fadeInUp}>
            <SectionHeader>
              <SectionTitle>Donation History</SectionTitle>
              <Button variant="secondary">Download Receipts</Button>
            </SectionHeader>
            
            <DonationTable>
              <Table>
                <TableHead>
                  <tr>
                    <TableHeader>Date</TableHeader>
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Payment Method</TableHeader>
                    <TableHeader>Type</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Receipt</TableHeader>
                  </tr>
                </TableHead>
                <tbody>
                  {donationHistory.map(donation => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.date}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.method}</TableCell>
                      <TableCell>
                        <Badge type={donation.type}>
                          {donation.type === 'recurring' ? 'Recurring' : 'One-time'}
                        </Badge>
                      </TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>
                        <Button variant="tertiary" size="small">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </DonationTable>
            
            <Grid columns={12} gap="large">
              <Grid.Item span={6} mobileSpan={12}>
                <Card>
                  <SectionTitle>Yearly Contribution</SectionTitle>
                  <div style={{ fontSize: '48px', margin: '16px 0', color: '#FF5722' }}>$325</div>
                  <p style={{ marginBottom: '16px' }}>Thank you for your generous support of Afropop Worldwide this year!</p>
                  <Button>Make a Donation</Button>
                </Card>
              </Grid.Item>
              
              <Grid.Item span={6} mobileSpan={12}>
                <Card>
                  <SectionTitle>Payment Methods</SectionTitle>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', padding: '8px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <div style={{ marginRight: '16px', fontSize: '24px' }}>💳</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold' }}>Visa ending in 4832</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Expires 05/2025</div>
                    </div>
                    <div>
                      <Button variant="tertiary" size="small">Edit</Button>
                    </div>
                  </div>
                  <Button variant="secondary">Add Payment Method</Button>
                </Card>
              </Grid.Item>
            </Grid>
          </motion.div>
        );
        
      case 'settings':
        return (
          <motion.div variants={fadeInUp}>
            <Grid columns={12} gap="large">
              <Grid.Item span={6} mobileSpan={12}>
                <SettingsSection>
                  <SectionHeader>
                    <SectionTitle>Account Information</SectionTitle>
                  </SectionHeader>
                  
                  <FormGroup>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormInput 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formState.email} 
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <FormInput 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formState.firstName} 
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <FormInput 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formState.lastName} 
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <div style={{ display: 'flex' }}>
                      <FormInput 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formState.password} 
                        onChange={handleInputChange}
                        style={{ marginRight: '10px' }}
                      />
                      <Button variant="secondary">Change</Button>
                    </div>
                  </FormGroup>
                </SettingsSection>
              </Grid.Item>
              
              <Grid.Item span={6} mobileSpan={12}>
                <SettingsSection>
                  <SectionHeader>
                    <SectionTitle>Notification Preferences</SectionTitle>
                  </SectionHeader>
                  
                  <FormGroup>
                    <SwitchLabel>
                      <SwitchInput 
                        type="checkbox" 
                        name="emailNotifications" 
                        checked={formState.emailNotifications} 
                        onChange={handleInputChange}
                      />
                      <SwitchSlider />
                      <SwitchText>Email Notifications</SwitchText>
                    </SwitchLabel>
                    
                    <SwitchLabel>
                      <SwitchInput 
                        type="checkbox" 
                        name="smsNotifications" 
                        checked={formState.smsNotifications} 
                        onChange={handleInputChange}
                      />
                      <SwitchSlider />
                      <SwitchText>SMS Notifications</SwitchText>
                    </SwitchLabel>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Content Preferences</FormLabel>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {['Afrobeat', 'Highlife', 'Desert Blues', 'Soukous', 'Mbalax', 'Ethio-Jazz', 'Contemporary'].map(genre => (
                        <Badge 
                          key={genre} 
                          type={formState.contentPreferences.includes(genre) ? 'selected' : ''}
                          style={{ cursor: 'pointer' }}
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </FormGroup>
                </SettingsSection>
                
                <SettingsSection>
                  <SectionHeader>
                    <SectionTitle>Privacy Settings</SectionTitle>
                  </SectionHeader>
                  
                  <FormGroup>
                    <SwitchLabel>
                      <SwitchInput 
                        type="checkbox" 
                        name="publicProfile" 
                        checked={true} 
                        onChange={() => {}}
                      />
                      <SwitchSlider />
                      <SwitchText>Public Profile</SwitchText>
                    </SwitchLabel>
                    
                    <SwitchLabel>
                      <SwitchInput 
                        type="checkbox" 
                        name="showDonations" 
                        checked={true} 
                        onChange={() => {}}
                      />
                      <SwitchSlider />
                      <SwitchText>Show My Donations</SwitchText>
                    </SwitchLabel>
                  </FormGroup>
                </SettingsSection>
              </Grid.Item>
            </Grid>
            
            <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <Button variant="secondary">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </motion.div>
        );
        
      default: // Overview tab
        return (
          <>
            <motion.div variants={fadeInUp}>
              <ProfileCard>
                <ProfileAvatar src={userProfile.avatarUrl}>
                  <EditAvatarOverlay className="edit-overlay">Change Photo</EditAvatarOverlay>
                </ProfileAvatar>
                <ProfileInfo>
                  <ProfileName>{userProfile.name}</ProfileName>
                  <MembershipBadge>{userProfile.membershipLevel}</MembershipBadge>
                  <ProfileStats>
                    <StatItem>
                      <StatValue>5</StatValue>
                      <StatLabel>Months as Member</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatValue>$325</StatValue>
                      <StatLabel>Total Donated</StatLabel>
                    </StatItem>
                    <StatItem>
                      <StatValue>12</StatValue>
                      <StatLabel>Events Attended</StatLabel>
                    </StatItem>
                  </ProfileStats>
                  <p>Member since {new Date(userProfile.joinDate).toLocaleDateString()}</p>
                  <div style={{ marginTop: '16px' }}>
                    <Button>Donate Again</Button>
                    <Button variant="secondary" style={{ marginLeft: '10px' }}>Edit Profile</Button>
                  </div>
                </ProfileInfo>
              </ProfileCard>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SectionHeader>
                <SectionTitle>Membership Overview</SectionTitle>
              </SectionHeader>
              
              <Grid columns={12} gap="large">
                <Grid.Item span={6} mobileSpan={12}>
                  <Card>
                    <SectionTitle>Current Tier: {currentTier.name}</SectionTitle>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}>
                      <div style={{ fontSize: '48px', marginRight: '16px' }}>{currentTier.icon}</div>
                      <div>
                        <div style={{ fontSize: '18px' }}>{currentTier.price}</div>
                        <div style={{ fontSize: '14px', color: '#666' }}>Next billing date: June 1, 2023</div>
                      </div>
                    </div>
                    
                    <ProgressSection>
                      <ProgressBar progress="65%" />
                      <ProgressLabel>
                        <span>65% to {nextTier ? nextTier.name : 'Next Tier'}</span>
                        <span>${nextTier ? '75' : '0'} more to upgrade</span>
                      </ProgressLabel>
                    </ProgressSection>
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                      <Button style={{ flex: 1 }}>Upgrade</Button>
                      <Button variant="secondary" style={{ flex: 1 }}>View Benefits</Button>
                    </div>
                  </Card>
                </Grid.Item>
                
                <Grid.Item span={6} mobileSpan={12}>
                  <Card>
                    <SectionTitle>Recent Activity</SectionTitle>
                    <div style={{ margin: '16px 0' }}>
                      {[
                        { date: '2023-05-10', action: 'Attended virtual event: "Highlife History"' },
                        { date: '2023-05-01', action: 'Monthly donation of $25.00' },
                        { date: '2023-04-22', action: 'Commented on forum thread: "Desert Blues artists"' },
                        { date: '2023-04-15', action: 'Added 2 playlists to favorites' }
                      ].map((activity, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          padding: '8px 0',
                          borderBottom: index < 3 ? '1px solid #eee' : 'none'
                        }}>
                          <div style={{ width: '100px', fontSize: '14px', color: '#666' }}>
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                          <div style={{ flex: 1 }}>{activity.action}</div>
                        </div>
                      ))}
                    </div>
                    <Button variant="secondary" style={{ width: '100%' }}>View All Activity</Button>
                  </Card>
                </Grid.Item>
              </Grid>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SectionHeader>
                <SectionTitle>Quick Actions</SectionTitle>
              </SectionHeader>
              
              <Grid columns={12} gap="medium">
                {[
                  { icon: '💰', title: 'Make a Donation', action: 'Donate Now' },
                  { icon: '📅', title: 'Browse Events', action: 'View Events' },
                  { icon: '🎵', title: 'Explore Playlists', action: 'Browse' },
                  { icon: '🔧', title: 'Account Settings', action: 'Settings' }
                ].map((action, index) => (
                  <Grid.Item key={index} span={3} mobileSpan={6}>
                    <Card style={{ textAlign: 'center', padding: '24px 16px' }}>
                      <div style={{ fontSize: '32px', marginBottom: '16px' }}>{action.icon}</div>
                      <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>{action.title}</h3>
                      <Button size="small">{action.action}</Button>
                    </Card>
                  </Grid.Item>
                ))}
              </Grid>
            </motion.div>
          </>
        );
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <PageTitle>My Account</PageTitle>
        </motion.div>
      </PageHeader>
      
      <TabsContainer>
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          active={activeTab === 'membership'} 
          onClick={() => setActiveTab('membership')}
        >
          Membership
        </TabButton>
        <TabButton 
          active={activeTab === 'donations'} 
          onClick={() => setActiveTab('donations')}
        >
          Donation History
        </TabButton>
        <TabButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Account Settings
        </TabButton>
      </TabsContainer>
      
      {renderTabContent()}
    </motion.div>
  );
}

export default Account;
