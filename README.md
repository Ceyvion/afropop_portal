# Afropop Member Portal

A modern membership portal with a nostalgic touch of 2006 web design aesthetics for Afropop Worldwide donors.

## Overview

This portal provides Afropop Worldwide donors with exclusive access to content, playlists, community features, and more based on their membership tier.

The design philosophy combines modern React development practices with subtle nostalgic elements reminiscent of 2006 web design, creating a unique and engaging user experience that balances:

- Respect for negative space (Ma)
- Restrained color palettes 
- Subtle textures
- Organic asymmetry
- Polite micro-animations
- Quiet typography

## Features

- **Dashboard**: Personalized welcome and overview of membership benefits
- **Login**: Secure member authentication
- **Exclusive Content**: Access to videos, articles, and audio recordings
- **Playlists**: Curated music collections
- **Community Hub**: Connect with other members through forums and events
- **Afropop Feed**: Latest articles and episodes from Afropop.org via RSS
- **Account Management**: Manage membership details and preferences
- **Admin Panel**: Content and user management for administrators
- **Dark Mode Toggle**: Switch between light and dark themes

## Tech Stack

- React
- React Router
- Styled Components
- Framer Motion
- Webpack

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Ceyvion/afropop_portal.git
   cd afropop_portal
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn
   ```

   If installing dependencies is not possible, the project includes simple
   placeholder scripts so that `npm test` and `npm run build` complete without
   errors.

3. Start the development server
   ```
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── assets/           # Static assets (images, etc.)
├── components/       # Reusable components
│   ├── layout/       # Layout components
│   └── ui/           # UI components
├── pages/            # Page components
├── styles/           # Global styles and theme
└── utils/            # Utility functions
```

## Membership Tiers

The portal supports multiple membership tiers with increasing benefits:

- **Bronze Supporter**: Basic access to exclusive content
- **Silver Supporter**: Additional access to video content and quarterly magazine
- **Gold Supporter**: All previous benefits plus live events and exclusive playlists
- **Diamond Supporter**: VIP access to all content and special recognition

## Updating Media Assets

Sample images used throughout the demo live in `src/assets/images`. Feel free to
replace them with your own artwork or add additional images to this directory.
When you update a file or add a new one, import it in the relevant component
(for example `Playlists.js` or `ContentLibrary.js`) and reference the imported
variable instead of an external URL.

After modifying images, run `npm test` and `npm run build` to ensure everything
still compiles correctly.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Afropop Worldwide for their dedication to celebrating African music
- All the donors who make this project possible
