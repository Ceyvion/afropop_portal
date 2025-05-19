import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import { fetchRss } from '../utils/rss';

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

function AfropopFeed() {
  const [posts, setPosts] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchRss('https://afropop.org/feed'),
      fetchRss('https://afropop.org/podcasts/feed')
    ]).then(([postData, episodeData]) => {
      setPosts(postData);
      setEpisodes(episodeData);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <FeedTitle>Afropop Latest Posts</FeedTitle>
      {loading && <p>Loading feed...</p>}
      {!loading && (
        <FeedContainer>
          {posts.map((item, idx) => (
            <Card key={`post-${idx}`} title={item.title} subtitle={new Date(item.pubDate).toLocaleDateString()}>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </Card>
          ))}
        </FeedContainer>
      )}

      <FeedTitle style={{ marginTop: '4rem' }}>Latest Episodes</FeedTitle>
      {loading && <p>Loading episodes...</p>}
      {!loading && (
        <FeedContainer>
          {episodes.map((item, idx) => (
            <Card key={`ep-${idx}`} title={item.title} subtitle={new Date(item.pubDate).toLocaleDateString()}>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <a href={item.link} target="_blank" rel="noopener noreferrer">Listen</a>
            </Card>
          ))}
        </FeedContainer>
      )}
    </div>
  );
}

export default AfropopFeed;
