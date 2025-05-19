import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import Grid from '../components/ui/Grid';
import Modal from '../components/ui/Modal';
import YouTubePlayer from '../components/ui/YouTubePlayer';

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

const CategoryTitle = styled.h2`
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

function ContentLibrary() {
  const [activeVideo, setActiveVideo] = useState(null);

  // Mock data - in a real app, this would come from an API
  const videoCategories = [
    {
      id: 1,
      title: "Live Performances",
      items: [
        { id: 1, title: "Fela Kuti Tribute Concert", duration: "1:12:34", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "dQw4w9WgXcQ" },
        { id: 2, title: "Malian Desert Blues Festival", duration: "48:22", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "xvFZjo5PgG0" },
        { id: 3, title: "Pan-African Jazz Showcase", duration: "58:45", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "tVj0ZTS4WF4" }
      ]
    },
    {
      id: 2,
      title: "Artist Interviews",
      items: [
        { id: 1, title: "Conversation with Youssou N'Dour", duration: "24:15", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "8ZcmTl_1ER8" },
        { id: 2, title: "Angelique Kidjo on Cultural Influences", duration: "18:42", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "k85mRPqvMbE" },
        { id: 3, title: "Baaba Maal: The Voice of Senegal", duration: "32:10", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "Eo-KmOd3i7s" }
      ]
    },
    {
      id: 3,
      title: "Documentaries",
      items: [
        { id: 1, title: "The Story of Afrobeat", duration: "1:35:20", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "vfkqZb8NpXg" },
        { id: 2, title: "African Music in the Digital Age", duration: "42:18", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "oUMwu_gXK7Q" },
        { id: 3, title: "Traditional Instruments of West Africa", duration: "50:45", thumbnail: "https://via.placeholder.com/300x169", youtubeId: "vJQ9gZm8RE0" }
      ]
    }
  ];

  const VideoCard = styled(Card)`
    position: relative;
    cursor: pointer;
    overflow: hidden;
    
    img {
      width: 100%;
      height: auto;
      transition: transform ${({ theme }) => theme.transitions.default};
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    &:hover .play-icon {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  `;

  const PlayIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 60px;
    height: 60px;
    background-color: rgba(255, 87, 34, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all ${({ theme }) => theme.transitions.default};
    z-index: 2;
    
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

  const Duration = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.2rem;
    z-index: 1;
  `;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <PageHeader>
        <motion.div variants={fadeInUp}>
          <PageTitle>Exclusive Content Library</PageTitle>
          <PageDescription>
            Explore our collection of exclusive performances, interviews, and documentaries celebrating the rich musical heritage of Africa.
          </PageDescription>
        </motion.div>
      </PageHeader>

      {videoCategories.map(category => (
        <motion.div key={category.id} variants={fadeInUp}>
          <CategoryTitle>{category.title}</CategoryTitle>
          <Grid columns={3} gap="large" mobileColumns={1}>
            {category.items.map(item => (
              <Grid.Item key={item.id}>
                <VideoCard onClick={() => setActiveVideo(item)}>
                  <img src={item.thumbnail} alt={item.title} />
                  <PlayIcon className="play-icon" />
                  <Duration>{item.duration}</Duration>
                  <h3>{item.title}</h3>
                </VideoCard>
              </Grid.Item>
            ))}
          </Grid>
        </motion.div>
      ))}

      <Modal isOpen={!!activeVideo} onClose={() => setActiveVideo(null)}>
        {activeVideo && (
          <div style={{ padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>{activeVideo.title}</h3>
            <YouTubePlayer videoId={activeVideo.youtubeId} />
          </div>
        )}
      </Modal>
    </motion.div>
  );
}

export default ContentLibrary;
