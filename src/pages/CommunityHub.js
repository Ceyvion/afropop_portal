import React from 'react';
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

const PageDescription = styled.p`
  font-size: 1.8rem;
  max-width: 80rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  margin: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
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

// Upcoming Events Section
const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const EventCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EventCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(5, 1fr);
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  width: 60px;
  height: 60px;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const CalendarHeader = styled.div`
  grid-column: 1 / -1;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  padding: 2px 0;
  text-transform: uppercase;
`;

const CalendarDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.isEvent ? '1.4rem' : '0.8rem'};
  font-weight: ${props => props.isEvent ? 'bold' : 'normal'};
  color: ${props => props.isEvent ? props.theme.colors.primary : props.theme.colors.textLight};
  background-color: ${props => props.isEvent ? 'rgba(255, 87, 34, 0.1)' : 'transparent'};
  border-radius: ${props => props.isEvent ? '50%' : '0'};
`;

const DancingIcon = styled(motion.div)`
  font-size: 2.4rem;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const EventTitle = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

const EventDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const EventDetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EventActions = styled.div`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.md};
`;

// Member Playlists Section
const PlaylistsScrollContainer = styled.div`
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

const PlaylistsScroll = styled.div`
  display: flex;
  overflow-x: auto;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.primary} ${theme.colors.divider}`};
  
  /* Custom scrollbar */
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
  width: 180px;
  margin-right: ${({ theme }) => theme.spacing.md};
  
  &:last-child {
    margin-right: 0;
  }
`;

const PlaylistCover = styled.div`
  width: 180px;
  height: 180px;
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

// Recent Donors Section
const DonorsCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DonorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DonorItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const DonorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const DonorName = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const DonorThankYou = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

// Forum Section
const ForumCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ForumList = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ForumItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.quick};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const ForumBubble = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50% 50% 0 50%;
  margin-right: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ForumContent = styled.div`
  flex: 1;
`;

const ForumTitle = styled.h4`
  font-size: 1.6rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
  transition: color ${({ theme }) => theme.transitions.quick};
  
  ${ForumItem}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ForumMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  span {
    display: flex;
    align-items: center;
    margin-right: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
    
    svg {
      margin-right: ${({ theme }) => theme.spacing.xxs};
      width: 14px;
      height: 14px;
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

function CommunityHub() {
  // Mock data for Upcoming Events
  const upcomingEvents = [
    {
      id: 1,
      title: "Live Q&A with Seun Kuti",
      date: "2023-06-15",
      time: "19:00 EST",
      location: "Virtual - Zoom",
      description: "Join us for an exclusive live Q&A session with Seun Kuti, discussing his father's legacy and the future of Afrobeat.",
      type: "Livestream"
    },
    {
      id: 2,
      title: "Sahel Sounds Documentary Watch Party",
      date: "2023-06-22",
      time: "20:00 EST",
      location: "Virtual - Member Portal",
      description: "Watch the critically acclaimed documentary exploring the vibrant music scene of the Sahel region, followed by a discussion.",
      type: "Virtual"
    },
    {
      id: 3,
      title: "Members Mixer: NYC Edition",
      date: "2023-07-08",
      time: "18:30 EST",
      location: "Harlem Jazz Club, New York",
      description: "Meet fellow Afropop enthusiasts in person at our NYC members mixer, featuring live DJ sets and networking.",
      type: "In-person"
    }
  ];

  // Mock data for Member Playlists
  const memberPlaylists = [
    { id: 1, title: "Desert Blues Mix", curator: "DJ Sahel", coverImage: "https://via.placeholder.com/180x180" },
    { id: 2, title: "Afrobeat Essentials", curator: "Legacy Curator", coverImage: "https://via.placeholder.com/180x180" },
    { id: 3, title: "Highlife Classics", curator: "Gold Coast Sound", coverImage: "https://via.placeholder.com/180x180" },
    { id: 4, title: "Soukous Dance Party", curator: "Congo Beat", coverImage: "https://via.placeholder.com/180x180" },
    { id: 5, title: "Ethio-Jazz Explorations", curator: "Addis Groove", coverImage: "https://via.placeholder.com/180x180" },
    { id: 6, title: "Modern Afropop Hits", curator: "New Wave", coverImage: "https://via.placeholder.com/180x180" },
    { id: 7, title: "Mbalax Rhythms", curator: "Dakar Grooves", coverImage: "https://via.placeholder.com/180x180" }
  ];

  // Mock data for Recent Donors
  const recentDonors = [
    { id: 1, name: "Linda", amount: "$50", avatar: "https://via.placeholder.com/80x80" },
    { id: 2, name: "Michael", amount: "$100", avatar: "https://via.placeholder.com/80x80" },
    { id: 3, name: "Karim", amount: "$75", avatar: "https://via.placeholder.com/80x80" },
    { id: 4, name: "Sofia", amount: "$150", avatar: "https://via.placeholder.com/80x80" },
    { id: 5, name: "Jake", amount: "$25", avatar: "https://via.placeholder.com/80x80" },
    { id: 6, name: "Amara", amount: "$200", avatar: "https://via.placeholder.com/80x80" }
  ];

  // Mock data for Forum Highlights
  const forumHighlights = [
    { 
      id: 1, 
      title: "Your favorite African music documentary?", 
      author: "MusicExplorer", 
      replies: 24, 
      views: 128, 
      lastActive: "2 hours ago",
      excerpt: "I recently watched 'Searching for Sugar Man' and loved it. What are some great documentaries focusing specifically on African music scenes and artists?"
    },
    { 
      id: 2, 
      title: "Recommendations for modern Afrobeat artists", 
      author: "NewListener", 
      replies: 18, 
      views: 95, 
      lastActive: "5 hours ago",
      excerpt: "I'm familiar with the classics like Fela Kuti, but who are the exciting new Afrobeat artists I should be listening to?"
    },
    { 
      id: 3, 
      title: "The evolution of Mbalax - discussion thread", 
      author: "SenegalFan", 
      replies: 9, 
      views: 62, 
      lastActive: "1 day ago",
      excerpt: "Let's discuss how Mbalax has evolved from its traditional roots to its current form. What are the key changes you've noticed?"
    },
    { 
      id: 4, 
      title: "Desert Blues playlist recommendations", 
      author: "SaharaGrooves", 
      replies: 15, 
      views: 84, 
      lastActive: "2 days ago",
      excerpt: "I'm creating a comprehensive Desert Blues playlist and looking for must-include tracks. Any suggestions beyond the obvious choices?"
    }
  ];

  // Helper function to create calendar display
  const renderCalendar = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    // Create array of day numbers for display
    const days = Array.from({ length: 31 }, (_, i) => i + 1).slice(0, daysInMonth);
    
    return (
      <CalendarGrid>
        <CalendarHeader>{month}</CalendarHeader>
        {days.slice(0, 7).map((d, i) => (
          <CalendarDay key={i} isEvent={d === day}>{d}</CalendarDay>
        ))}
      </CalendarGrid>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <PageTitle>Community Hub</PageTitle>
          <PageDescription>
            Connect with fellow Afropop enthusiasts, discover member-curated playlists, browse upcoming events, and join the conversation in our forums.
          </PageDescription>
        </motion.div>
      </PageHeader>

      {/* Upcoming Events Section */}
      <motion.div variants={fadeInUp}>
        <SectionTitle>
          <DancingIcon animate="animate" variants={dancingAnimation} style={{ display: 'inline-block', marginRight: '8px' }}>
            💃
          </DancingIcon>
          Upcoming Community Events
        </SectionTitle>
        
        <EventsGrid>
          {upcomingEvents.map(event => {
            const date = new Date(event.date);
            
            return (
              <EventCard key={event.id}>
                <EventCardHeader>
                  {renderCalendar(event.date)}
                  <EventTitle>{event.title}</EventTitle>
                </EventCardHeader>
                
                <EventDetails>
                  <EventDetailItem>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                  </EventDetailItem>
                  
                  <EventDetailItem>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </EventDetailItem>
                  
                  <EventDetailItem>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{event.type}</span>
                  </EventDetailItem>
                  
                  <p>{event.description}</p>
                </EventDetails>
                
                <EventActions>
                  <Button variant="primary">RSVP</Button>
                </EventActions>
              </EventCard>
            );
          })}
        </EventsGrid>
      </motion.div>

      {/* Member Playlists Section */}
      <motion.div variants={fadeInUp}>
        <SectionTitle>Member Playlists</SectionTitle>
        
        <PlaylistsScrollContainer>
          <PlaylistsScroll>
            {memberPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id}>
                <PlaylistCover src={playlist.coverImage} />
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <PlaylistSubtitle>Curated by {playlist.curator}</PlaylistSubtitle>
              </PlaylistCard>
            ))}
          </PlaylistsScroll>
        </PlaylistsScrollContainer>
      </motion.div>

      {/* Recent Donors Section */}
      <motion.div variants={fadeInUp}>
        <SectionTitle>Recent Donor Shout-outs</SectionTitle>
        
        <DonorsCard>
          <DonorsGrid>
            {recentDonors.map(donor => (
              <DonorItem key={donor.id}>
                <DonorAvatar src={donor.avatar} />
                <DonorName>{donor.name}</DonorName>
                <DonorThankYou>Thanks for {donor.amount}!</DonorThankYou>
              </DonorItem>
            ))}
          </DonorsGrid>
        </DonorsCard>
      </motion.div>

      {/* Forum Highlights Section */}
      <motion.div variants={fadeInUp}>
        <SectionTitle>Forum Highlights</SectionTitle>
        
        <ForumCard>
          <ForumList>
            {forumHighlights.map(thread => (
              <ForumItem key={thread.id}>
                <ForumBubble>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </ForumBubble>
                
                <ForumContent>
                  <ForumTitle>{thread.title}</ForumTitle>
                  <p>{thread.excerpt}</p>
                  <ForumMeta>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {thread.author}
                    </span>
                    
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      {thread.replies} replies
                    </span>
                    
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {thread.views} views
                    </span>
                    
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {thread.lastActive}
                    </span>
                  </ForumMeta>
                </ForumContent>
              </ForumItem>
            ))}
          </ForumList>
          
          <Button variant="secondary" style={{ width: '100%' }}>
            Visit Community Forum
          </Button>
        </ForumCard>
      </motion.div>
    </motion.div>
  );
}

export default CommunityHub;
