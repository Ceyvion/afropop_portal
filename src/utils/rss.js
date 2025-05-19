import axios from 'axios';

/**
 * List of available CORS proxies to try in order
 */
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://thingproxy.freeboard.io/fetch/'
];

/**
 * Simple browser-friendly XML parser for RSS feeds
 * @param {string} xml - XML string to parse
 * @returns {Array} Array of feed items
 */
function parseRss(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'application/xml');
  
  // Check for parsing errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    console.error('Error parsing XML', parseError);
    return [];
  }
  
  // Extract items
  const items = Array.from(doc.querySelectorAll('item')).map(item => {
    // Get enclosure data if available
    let enclosure = null;
    const enclosureEl = item.querySelector('enclosure');
    if (enclosureEl) {
      enclosure = {
        url: enclosureEl.getAttribute('url') || '',
        type: enclosureEl.getAttribute('type') || '',
        length: enclosureEl.getAttribute('length') || ''
      };
    }
    
    // Get categories
    const categories = Array.from(item.querySelectorAll('category'))
      .map(cat => cat.textContent.trim());
    
    // Extract all needed data
    return {
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || '',
      guid: item.querySelector('guid')?.textContent || '',
      creator: item.querySelector('dc\\:creator')?.textContent || 
               item.querySelector('creator')?.textContent || 
               item.querySelector('author')?.textContent || '',
      enclosure: enclosure,
      categories: categories
    };
  });
  
  return items;
}

/**
 * Fetch and parse an RSS feed with multiple CORS proxy fallbacks
 * @param {string} feedUrl The RSS feed URL
 * @returns {Promise<Array>} Array of feed items
 */
export async function fetchRss(feedUrl) {
  // Try each proxy in order until one works
  for (const proxy of CORS_PROXIES) {
    try {
      console.log(`Trying to fetch RSS feed with proxy: ${proxy}`);
      const proxyUrl = `${proxy}${encodeURIComponent(feedUrl)}`;
      const response = await axios.get(proxyUrl);
      
      // Parse the XML content
      const items = parseRss(response.data);
      
      console.log(`Successfully fetched RSS feed from ${feedUrl} using proxy: ${proxy}`);
      return items;
    } catch (err) {
      console.warn(`Failed to fetch with proxy ${proxy}: ${err.message}`);
      // Continue to the next proxy
    }
  }
  
  // All proxies failed
  console.error('All CORS proxies failed to fetch RSS feed', feedUrl);
  return [];
}
