import React from 'react';
import styled from 'styled-components';

const PlayerWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

function extractId(input) {
  if (!input) return '';
  const regex = /(?:youtube\.com\/(?:.*v=|v\/|embed\/)|youtu\.be\/)([^?&\s]+)/;
  const match = input.match(regex);
  return match ? match[1] : input;
}

function YouTubePlayer({ videoId, url, ...props }) {
  const id = videoId || extractId(url);
  const src = `https://www.youtube.com/embed/${id}`;
  return (
    <PlayerWrapper {...props}>
      <Iframe
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Player"
      />
    </PlayerWrapper>
  );
}

export default YouTubePlayer;
