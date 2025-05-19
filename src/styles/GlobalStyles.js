import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%; /* 1rem = 10px */
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.6rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    color: ${({ theme }) => theme.colors.headings};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h1 {
    font-size: 3.2rem;
  }
  
  h2 {
    font-size: 2.6rem;
  }
  
  h3 {
    font-size: 2.2rem;
  }
  
  h4 {
    font-size: 2rem;
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.quick};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  /* List styles */
  ul, ol {
    margin-left: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  /* Utility classes */
  .container {
    max-width: 120rem;
    width: 90%;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  /* Minimal custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
`;

export default GlobalStyles;
