import axios from 'axios';

/**
 * Fetch and parse an RSS feed.
 * @param {string} feedUrl The RSS feed URL.
 * @returns {Promise<Array>} Array of feed items.
 */
export async function fetchRss(feedUrl) {
  const proxy = 'https://api.allorigins.win/raw?url=';
  try {
    const response = await axios.get(`${proxy}${encodeURIComponent(feedUrl)}`);
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item')).map(item => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
      pubDate: item.querySelector('pubDate')?.textContent || ''
    }));
    return items;
  } catch (err) {
    console.error('RSS fetch failed', err);
    return [];
  }
}
