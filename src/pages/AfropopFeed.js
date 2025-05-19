import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import { fetchRss } from '../utils/rss';
import { motion } from 'framer-motion';

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FeedTitle = styled.h1`
  font-size: 3.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.headings};
`;

const EpisodeCard = styled(Card)`
  position: relative;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Thumbnail = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

// Format the date in a more readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

function AfropopFeed() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the Afropop podcast feed URL from the feedburner source
    const fetchPodcast = async () => {
      setLoading(true);
      try {
        console.log('Fetching Afropop podcast feed...');
        const data = await fetchRss('https://feeds.feedburner.com/afropop/podcast');
        console.log('Podcast data:', data);
        setEpisodes(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch podcast feed:', err);
        setError('Failed to load the podcast feed. Please try again later.');
        setLoading(false);
      }
    };

    fetchPodcast();
  }, []);

  if (error) {
    return (
      <div>
        <FeedTitle>Afropop Podcast</FeedTitle>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FeedTitle>Afropop Podcast</FeedTitle>
      
      {loading ? (
        <LoadingIndicator>
          <p>Loading podcast episodes...</p>
        </LoadingIndicator>
      ) : (
        <FeedContainer>
          {episodes.map((item, idx) => (
            <EpisodeCard 
              key={`ep-${idx}`} 
              title={item.title} 
              subtitle={formatDate(item.pubDate)}
            >
              {/* Show episode thumbnail if available */}
              {item.enclosure && item.enclosure.url && (
                <Thumbnail 
                  src={item.enclosure.url.includes('.jpg') || item.enclosure.url.includes('.png') 
                    ? item.enclosure.url 
                    : '/assets/default-episode-artwork.jpg'} 
                  alt={item.title}
                  onError={(e) => {e.target.src = '/assets/default-episode-artwork.jpg'}}
                />
              )}
              
              {/* Show categories if available */}
              {item.categories && item.categories.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  {item.categories.map((category, catIdx) => (
                    <CategoryTag key={`cat-${idx}-${catIdx}`}>{category}</CategoryTag>
                  ))}
                </div>
              )}
              
              {/* Episode description */}
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              
              {/* Audio player if enclosure is available */}
              {item.enclosure && item.enclosure.url && item.enclosure.type && item.enclosure.type.startsWith('audio/') && (
                <AudioPlayer controls>
                  <source src={item.enclosure.url} type={item.enclosure.type} />
                  Your browser does not support the audio element.
                </AudioPlayer>
              )}
              
              <div style={{ marginTop: '1rem' }}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  View Episode Page
                </a>
              </div>
            </EpisodeCard>
          ))}
        </FeedContainer>
      )}
    </motion.div>
  );
}

export default AfropopFeed;
