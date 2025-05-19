import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import RssContext from '../context/RssContext';

const FeedTitle = styled.h1`
  font-size: 3.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.headings};
`;

const FeedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PodcastCard = styled(Card)`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PodcastImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PodcastContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const PodcastControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
`;

function PodcastItem({ episode }) {
  return (
    <PodcastCard>
      <PodcastImage>
        <img src={episode.imageUrl} alt={episode.title} loading="lazy" />
      </PodcastImage>
      <PodcastContent>
        <h3>{episode.title}</h3>
        <p>{new Date(episode.pubDate).toLocaleDateString()}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(episode.description.substring(0, 150) + '...')
          }}
        />
        <PodcastControls>
          <Button as="a" href={episode.audioUrl} target="_blank">
            Listen
          </Button>
          <Button variant="secondary" as="a" href={episode.link} target="_blank">
            View Details
          </Button>
        </PodcastControls>
      </PodcastContent>
    </PodcastCard>
  );
}

function AfropopFeed() {
  const { fetchFeed, loading, error } = useContext(RssContext);
  const [podcasts, setPodcasts] = useState([]);
  const feedUrl = 'https://feeds.feedburner.com/afropop/podcast';

  useEffect(() => {
    fetchFeed(feedUrl)
      .then(data => setPodcasts(data))
      .catch(err => console.error(err));
  }, [fetchFeed]);

  return (
    <div>
      <FeedTitle>Afropop World Podcast</FeedTitle>
      {loading[feedUrl] && <p>Loading podcasts...</p>}
      {error[feedUrl] && (
        <p>
          Couldn't load podcasts.{' '}
          <Button variant="secondary" onClick={() => fetchFeed(feedUrl)}>
            Retry
          </Button>
        </p>
      )}
      <FeedGrid>
        {podcasts.map((episode, idx) => (
          <PodcastItem key={episode.guid || idx} episode={episode} />
        ))}
      </FeedGrid>
    </div>
  );
}

export default AfropopFeed;
