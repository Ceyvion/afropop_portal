export const lightTheme = {
  colors: {
    // Main colors from the reference image
    primary: '#FF5722', // Vibrant orange for primary elements
    primaryDark: '#D84315', // Darker orange for hover states
    secondary: '#0D2B45', // Deep blue for navigation/sidebar
    background: '#FFF8E1', // Cream/ivory for content areas
    accent: '#26A69A', // Teal for accents (waves in the image)
    
    // Additional colors for UI elements
    text: '#333333', // Dark gray for regular text
    textLight: '#666666', // Lighter gray for secondary text
    headings: '#802E13', // Brownish red for headings
    divider: '#E0E0E0', // Light gray for dividers
    cardBackground: '#FFFCF5', // Slightly off-white for cards
    buttonText: '#FFFFFF', // White for button text
    
    // Status colors
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"Roboto", sans-serif',
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    circle: '50%',
  },
  
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.07)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    default: '0.3s ease',
    slow: '0.5s ease-in-out',
    quick: '0.15s ease',
  },
  
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#4a7c59',
    primaryDark: '#2c5c37',
    secondary: '#0f1f15',
    accent: '#81b29a',
    background: '#0a0f0a',
    cardBackground: '#121a13',
    text: '#E0E0E0',
    textLight: '#999999',
    headings: '#FFFFFF',
    divider: '#333333'
  }
};
