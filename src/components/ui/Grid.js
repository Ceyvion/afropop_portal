import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 12}, 1fr);
  gap: ${({ theme, gap }) => 
    gap === 'small' ? theme.spacing.sm : 
    gap === 'large' ? theme.spacing.xl : 
    theme.spacing.md
  };
  width: 100%;
  margin-bottom: ${({ theme, marginBottom }) => marginBottom ? theme.spacing[marginBottom] || marginBottom : 0};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${props => props.mobileColumns || 1}, 1fr);
  }
`;

const GridItem = styled.div`
  grid-column: span ${props => props.span || 1};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: span ${props => props.mobileSpan || props.span || 1};
  }
`;

function Grid({ 
  children, 
  columns = 12, 
  gap = 'medium',
  mobileColumns = 1,
  marginBottom,
  ...props 
}) {
  return (
    <GridContainer 
      columns={columns} 
      gap={gap} 
      mobileColumns={mobileColumns}
      marginBottom={marginBottom}
      {...props}
    >
      {children}
    </GridContainer>
  );
}

Grid.Item = GridItem;

export default Grid;
