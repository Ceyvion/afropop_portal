import axios from 'axios';

/**
 * Fetch and parse an RSS feed.
 * @param {string} feedUrl The RSS feed URL.
 * @returns {Promise<Array>} Array of feed items.
 */
export async function fetchRss(feedUrl) {
  const proxyTransforms = [
    url => url,
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
  ];

  for (const transform of proxyTransforms) {
    try {
      const response = await axios.get(transform(feedUrl));
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
      console.warn('RSS fetch failed with proxy', transform(feedUrl), err);
    }
  }

  console.error('RSS fetch failed with all proxies');
  return [];
}
