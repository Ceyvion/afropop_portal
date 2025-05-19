import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Grid from '../components/ui/Grid';
import playlistFeature from '../assets/images/playlist-feature.svg';
import playlistDefault from '../assets/images/playlist-default.svg';

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

const FilterTabs = styled.div`
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

const FilterTab = styled.button`
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

const PlaylistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const PlaylistCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PlaylistCover = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.7) 100%);
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.default};
  }
  
  ${PlaylistCard}:hover &::after {
    opacity: 1;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${({ theme }) => theme.transitions.default};
  z-index: 1;
  
  ${PlaylistCard}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 20px solid white;
    margin-left: 5px;
  }
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlaylistTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: ${({ theme }) => theme.spacing.xxs};
`;

const PlaylistMeta = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PlaylistDescription = styled.p`
  font-size: 1.4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const PlaylistTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: auto;
`;

const PlaylistTag = styled.span`
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1.2rem;
  white-space: nowrap;
`;

const FeaturedSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturedTitle = styled.h2`
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

const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
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

function Playlists() {
  // Filter tabs state
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data
  const filterCategories = [
    { id: 'all', label: 'All Playlists' },
    { id: 'featured', label: 'Featured' },
    { id: 'staff-picks', label: 'Staff Picks' },
    { id: 'member-curated', label: 'Member Curated' },
    { id: 'most-played', label: 'Most Played' },
    { id: 'recent', label: 'Recently Added' }
  ];
  
  const featuredPlaylist = {
    id: 'featured-1',
    title: 'Essential Afrobeat Classics',
    curator: 'Afropop Editorial Team',
    date: '2023-05-01',
    plays: 15420,
    songs: 24,
    duration: '1h 42m',
    coverImage: playlistFeature,
    description: 'The definitive collection of groundbreaking Afrobeat tracks that defined a genre and changed music forever.',
    tags: ['Afrobeat', 'Classics', 'Fela Kuti', 'Tony Allen', 'Highlife']
  };
  
  const playlists = [
    {
      id: 1,
      title: 'Desert Blues Explorations',
      curator: 'DJ Sahel',
      date: '2023-05-12',
      plays: 8745,
      songs: 18,
      duration: '1h 15m',
      coverImage: playlistDefault,
      description: 'A journey through the hypnotic sounds of Saharan blues from Mali, Niger, and beyond.',
      tags: ['Desert Blues', 'Mali', 'Tuareg', 'Tinariwen']
    },
    {
      id: 2,
      title: 'Highlife Golden Era',
      curator: 'Gold Coast Sound',
      date: '2023-04-25',
      plays: 6230,
      songs: 20,
      duration: '1h 22m',
      coverImage: playlistDefault,
      description: 'Classic Ghanaian and Nigerian highlife tracks from the 1960s and 70s that defined an era.',
      tags: ['Highlife', 'Ghana', 'Nigeria', 'Classic']
    },
    {
      id: 3,
      title: 'Ethio-Jazz Gems',
      curator: 'Addis Groove',
      date: '2023-05-03',
      plays: 4982,
      songs: 15,
      duration: '58m',
      coverImage: playlistDefault,
      description: 'The unique sound of Ethiopian jazz with its distinctive scales and arrangements.',
      tags: ['Ethio-Jazz', 'Mulatu Astatke', 'Ethiopia']
    },
    {
      id: 4,
      title: 'Modern Afropop Hits',
      curator: 'New Wave',
      date: '2023-05-18',
      plays: 12450,
      songs: 25,
      duration: '1h 35m',
      coverImage: playlistDefault,
      description: 'Contemporary African pop music that\'s dominating charts globally.',
      tags: ['Afropop', 'Contemporary', 'Hits']
    },
    {
      id: 5,
      title: 'Soukous Dance Party',
      curator: 'Congo Beat',
      date: '2023-04-10',
      plays: 5678,
      songs: 16,
      duration: '1h 8m',
      coverImage: playlistDefault,
      description: 'High-energy Congolese soukous tracks guaranteed to get you dancing.',
      tags: ['Soukous', 'Congo', 'Dance']
    },
    {
      id: 6,
      title: 'Mbalax Rhythms',
      curator: 'Dakar Sounds',
      date: '2023-03-28',
      plays: 3421,
      songs: 14,
      duration: '52m',
      coverImage: playlistDefault,
      description: 'Senegalese mbalax with its distinctive sabar drums and energetic rhythms.',
      tags: ['Mbalax', 'Senegal', 'Youssou N\'Dour']
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <PageTitle>Music Playlists</PageTitle>
          <PageDescription>
            Discover curated collections of African music, from traditional sounds to contemporary hits, 
            created by our staff and fellow members.
          </PageDescription>
        </motion.div>
      </PageHeader>
      
      <motion.div variants={fadeInUp}>
        <FilterTabs>
          {filterCategories.map(category => (
            <FilterTab 
              key={category.id}
              active={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
            >
              {category.label}
            </FilterTab>
          ))}
        </FilterTabs>
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <FeaturedSection>
          <FeaturedTitle>Featured Playlist</FeaturedTitle>
          <Grid columns={12} gap="large">
            <Grid.Item span={5}>
              <PlaylistCover src={featuredPlaylist.coverImage}>
                <PlayButton />
              </PlaylistCover>
            </Grid.Item>
            <Grid.Item span={7}>
              <PlaylistInfo>
                <PlaylistTitle>{featuredPlaylist.title}</PlaylistTitle>
                <PlaylistMeta>
                  Curated by {featuredPlaylist.curator} • {featuredPlaylist.songs} songs • {featuredPlaylist.duration} • {featuredPlaylist.plays.toLocaleString()} plays
                </PlaylistMeta>
                <PlaylistDescription>
                  {featuredPlaylist.description}
                </PlaylistDescription>
                <PlaylistTags>
                  {featuredPlaylist.tags.map(tag => (
                    <PlaylistTag key={tag}>{tag}</PlaylistTag>
                  ))}
                </PlaylistTags>
                <div style={{ marginTop: '20px' }}>
                  <Button>Play Playlist</Button>
                  <Button variant="secondary" style={{ marginLeft: '10px' }}>Add to Library</Button>
                </div>
              </PlaylistInfo>
            </Grid.Item>
          </Grid>
        </FeaturedSection>
      </motion.div>
      
      <motion.div variants={fadeInUp}>
        <FeaturedTitle>All Playlists</FeaturedTitle>
        <PlaylistGrid>
          {playlists.map(playlist => (
            <PlaylistCard key={playlist.id}>
              <PlaylistCover src={playlist.coverImage}>
                <PlayButton />
              </PlaylistCover>
              <PlaylistInfo>
                <PlaylistTitle>{playlist.title}</PlaylistTitle>
                <PlaylistMeta>
                  By {playlist.curator} • {playlist.duration}
                </PlaylistMeta>
                <PlaylistDescription>
                  {playlist.description}
                </PlaylistDescription>
                <PlaylistTags>
                  {playlist.tags.slice(0, 3).map(tag => (
                    <PlaylistTag key={tag}>{tag}</PlaylistTag>
                  ))}
                </PlaylistTags>
              </PlaylistInfo>
            </PlaylistCard>
          ))}
        </PlaylistGrid>
        
        <LoadMoreContainer>
          <Button variant="secondary">Load More Playlists</Button>
        </LoadMoreContainer>
      </motion.div>
    </motion.div>
  );
}

export default Playlists;
