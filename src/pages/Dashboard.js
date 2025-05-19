import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Grid from '../components/ui/Grid';

// SVG for the drum icon
const DrumIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" fill="#4a7c59" />
    <ellipse cx="50" cy="50" rx="20" ry="30" fill="none" stroke="#FFF" strokeWidth="3" />
    <line x1="30" y1="30" x2="70" y2="30" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="70" x2="70" y2="70" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="20" x2="50" y2="80" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Styled Components
const PageHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  overflow: visible;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const WelcomeTextContainer = styled.div`
  flex: 1;
`;

const WelcomeName = styled.h1`
  font-size: 4.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.headings};
`;

const WelcomeMessage = styled.p`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  max-width: 60rem;
`;

const ProgressContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
  width: 100%;
  max-width: 60rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
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
`;

const DrumIconContainer = styled.div`
  margin-left: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    margin-top: ${({ theme }) => theme.spacing.md};
  }
  
  svg {
    display: block;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MediaCard = styled(motion.div)`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  position: relative;
  
  &::before {
    content: '';
    display: block;
    padding-top: 56.25%; /* 16:9 aspect ratio */
  }
`;

const MediaThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: transform ${({ theme }) => theme.transitions.default};
  
  ${MediaCard}:hover & {
    transform: scale(1.05);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  }
`;

const MediaInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.md};
  color: white;
  z-index: 1;
`;

const MediaTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const MediaSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const PlayIconOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 87, 34, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};
  
  ${MediaCard}:hover & {
    opacity: 1;
  }
  
  /* Play icon */
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 16px solid white;
    margin-left: 4px;
  }
`;

const HorizontalScrollContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  /* Shadow indicators for overflow */
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    z-index: 1;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.background}, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, ${({ theme }) => theme.colors.background}, transparent);
  }
`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.primary} ${theme.colors.divider}`};
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.divider};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const PlaylistCard = styled.div`
  flex: 0 0 auto;
  width: 160px;
  margin-right: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-right: 0;
  }
`;

const PlaylistCover = styled.div`
  width: 160px;
  height: 160px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:hover::after {
    opacity: 1;
  }
  
  /* Hover overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlaylistTitle = styled.h4`
  font-size: 1.4rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlaylistSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventsCalendarCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CalendarIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const CalendarMonth = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const CalendarDay = styled.div`
  font-size: 2.4rem;
  font-weight: bold;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.h4`
  font-size: 1.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const EventDetails = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const EventListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DancingIcon = styled(motion.div)`
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: 2.4rem;
`;

const ShoutoutContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ShoutoutItem = styled.div`
  display: flex;
  align-items: center;
`;

const ShoutoutAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.spacing.xs};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ShoutoutText = styled.p`
  font-size: 1.4rem;
`;

const ForumList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ForumListItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  cursor: pointer;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    h4 {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ForumIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ForumItemContent = styled.div`
  flex: 1;
`;

const ForumItemTitle = styled.h4`
  font-size: 1.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  transition: color ${({ theme }) => theme.transitions.quick};
`;

const ForumItemMeta = styled.div`
  display: flex;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  span {
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.spacing.md};
    
    &:last-child {
      margin-right: 0;
    }
  }
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

const dancingAnimation = {
  animate: {
    rotate: [0, 10, -10, 10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

function Dashboard({ userProfile }) {
  // Mock data - in a real app, this would come from an API
  const livePerformances = [
    { id: 1, title: "Afrobeat Pioneers Live", artist: "Fela Kuti Tribute Band", thumbnail: "https://via.placeholder.com/400x225" },
    { id: 2, title: "Malian Desert Blues", artist: "Tinariwen", thumbnail: "https://via.placeholder.com/400x225" },
    { id: 3, title: "South African Jazz Fusion", artist: "Hugh Masekela Legacy", thumbnail: "https://via.placeholder.com/400x225" },
    { id: 4, title: "Highlife Classics", artist: "The Lagos Allstars", thumbnail: "https://via.placeholder.com/400x225" }
  ];
  
  const artistInterviews = [
    { id: 1, title: "Youssou N'Dour on Global Influences", duration: "24:15", thumbnail: "https://via.placeholder.com/400x225" },
    { id: 2, title: "Angelique Kidjo's Creative Process", duration: "18:42", thumbnail: "https://via.placeholder.com/400x225" }
  ];
  
  const memberPlaylists = [
    { id: 1, title: "Desert Blues Mix", curator: "DJ Sahel", coverImage: "https://via.placeholder.com/160x160" },
    { id: 2, title: "Afrobeat Essentials", curator: "Legacy Curator", coverImage: "https://via.placeholder.com/160x160" },
    { id: 3, title: "Highlife Classics", curator: "Gold Coast Sound", coverImage: "https://via.placeholder.com/160x160" },
    { id: 4, title: "Soukous Dance Party", curator: "Congo Beat", coverImage: "https://via.placeholder.com/160x160" },
    { id: 5, title: "Ethio-Jazz Explorations", curator: "Addis Groove", coverImage: "https://via.placeholder.com/160x160" },
    { id: 6, title: "Modern Afropop Hits", curator: "New Wave", coverImage: "https://via.placeholder.com/160x160" }
  ];
  
  const upcomingEvents = [
    { id: 1, title: "Live Q&A with Seun Kuti", date: "2023-06-15", time: "19:00 EST", type: "Livestream" },
    { id: 2, title: "Sahel Sounds Documentary Watch Party", date: "2023-06-22", time: "20:00 EST", type: "Virtual" },
    { id: 3, title: "Members Mixer: NYC Edition", date: "2023-07-08", time: "18:30 EST", type: "In-person" }
  ];
  
  const recentDonors = [
    { id: 1, name: "Linda", avatar: "https://via.placeholder.com/40x40" },
    { id: 2, name: "Michael", avatar: "https://via.placeholder.com/40x40" },
    { id: 3, name: "Karim", avatar: "https://via.placeholder.com/40x40" },
    { id: 4, name: "Sofia", avatar: "https://via.placeholder.com/40x40" },
    { id: 5, name: "Jake", avatar: "https://via.placeholder.com/40x40" }
  ];
  
  const forumHighlights = [
    { id: 1, title: "Your favorite African music documentary?", replies: 24, lastActive: "2 hours ago" },
    { id: 2, title: "Recommendations for modern Afrobeat artists", replies: 18, lastActive: "5 hours ago" },
    { id: 3, title: "The evolution of Mbalax - discussion thread", replies: 9, lastActive: "1 day ago" }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <WelcomeCard>
            <WelcomeTextContainer>
              <WelcomeName>Welcome, {userProfile.name}</WelcomeName>
              <WelcomeMessage>
                Thank you for your support! Your contributions help us continue to celebrate and preserve the rich musical heritage of Africa.
              </WelcomeMessage>
              
              <ProgressContainer>
                <ProgressBar progress="65%" />
                <ProgressLabel>
                  <span>Current tier: {userProfile.membershipLevel}</span>
                  <span>Next tier: Diamond Supporter</span>
                </ProgressLabel>
              </ProgressContainer>
              
              <Button>Donate Again</Button>
            </WelcomeTextContainer>
            
            <DrumIconContainer>
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
              >
                <DrumIcon />
              </motion.div>
            </DrumIconContainer>
          </WelcomeCard>
        </motion.div>
      </PageHeader>
      
      <Grid columns={12} gap="large">
        <Grid.Item span={8}>
          <motion.div variants={fadeInUp}>
            <SectionTitle>Live Performance Videos</SectionTitle>
            <MediaGrid>
              {livePerformances.map(performance => (
                <MediaCard key={performance.id} whileHover={{ y: -5 }}>
                  <MediaThumbnail src={performance.thumbnail} />
                  <MediaInfo>
                    <MediaTitle>{performance.title}</MediaTitle>
                    <MediaSubtitle>{performance.artist}</MediaSubtitle>
                  </MediaInfo>
                  <PlayIconOverlay />
                </MediaCard>
              ))}
            </MediaGrid>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionTitle>Artist Interviews</SectionTitle>
            <MediaGrid>
              {artistInterviews.map(interview => (
                <MediaCard key={interview.id} whileHover={{ y: -5 }}>
                  <MediaThumbnail src={interview.thumbnail} />
                  <MediaInfo>
                    <MediaTitle>{interview.title}</MediaTitle>
                    <MediaSubtitle>{interview.duration}</MediaSubtitle>
                  </MediaInfo>
                  <PlayIconOverlay />
                </MediaCard>
              ))}
            </MediaGrid>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionTitle>Member Playlists</SectionTitle>
            <HorizontalScrollContainer>
              <HorizontalScroll>
                {memberPlaylists.map(playlist => (
                  <PlaylistCard key={playlist.id}>
                    <PlaylistCover src={playlist.coverImage} />
                    <PlaylistTitle>{playlist.title}</PlaylistTitle>
                    <PlaylistSubtitle>Curated by {playlist.curator}</PlaylistSubtitle>
                  </PlaylistCard>
                ))}
              </HorizontalScroll>
            </HorizontalScrollContainer>
          </motion.div>
        </Grid.Item>
        
        <Grid.Item span={4}>
          <motion.div variants={fadeInUp}>
            <SectionTitle>Upcoming Community Events</SectionTitle>
            <EventsCalendarCard>
              {upcomingEvents.map(event => {
                const date = new Date(event.date);
                const month = date.toLocaleString('default', { month: 'short' });
                const day = date.getDate();
                
                return (
                  <EventListItem key={event.id}>
                    <DancingIcon animate="animate" variants={dancingAnimation}>
                      💃
                    </DancingIcon>
                    <CalendarIcon>
                      <CalendarMonth>{month}</CalendarMonth>
                      <CalendarDay>{day}</CalendarDay>
                    </CalendarIcon>
                    <EventInfo>
                      <EventTitle>{event.title}</EventTitle>
                      <EventDetails>{event.time} • {event.type}</EventDetails>
                    </EventInfo>
                  </EventListItem>
                );
              })}
              <Button variant="secondary" style={{ marginTop: '16px', width: '100%' }}>
                View All Events
              </Button>
            </EventsCalendarCard>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionTitle>Recent Donor Shout-outs</SectionTitle>
            <ShoutoutContainer>
              {recentDonors.map(donor => (
                <ShoutoutItem key={donor.id}>
                  <ShoutoutAvatar>
                    <img src={donor.avatar} alt={`${donor.name}'s avatar`} />
                  </ShoutoutAvatar>
                  <ShoutoutText>{donor.name}, thanks!</ShoutoutText>
                </ShoutoutItem>
              ))}
            </ShoutoutContainer>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SectionTitle>Forum Highlights</SectionTitle>
            <ForumList>
              {forumHighlights.map(thread => (
                <ForumListItem key={thread.id}>
                  <ForumIcon>💬</ForumIcon>
                  <ForumItemContent>
                    <ForumItemTitle>{thread.title}</ForumItemTitle>
                    <ForumItemMeta>
                      <span>💬 {thread.replies} replies</span>
                      <span>⏱️ {thread.lastActive}</span>
                    </ForumItemMeta>
                  </ForumItemContent>
                </ForumListItem>
              ))}
              <Button variant="tertiary" style={{ marginTop: '16px' }}>
                Visit Community Forum
              </Button>
            </ForumList>
          </motion.div>
        </Grid.Item>
      </Grid>
    </motion.div>
  );
}

export default Dashboard;
