import axios from 'axios';

// Enhanced RSS parser
export async function fetchRss(feedUrl, options = {}) {
  const proxy = 'https://api.allorigins.win/raw?url=';
  try {
    const response = await axios.get(`${proxy}${encodeURIComponent(feedUrl)}`);
    const parser = new DOMParser();
    const xml = parser.parseFromString(response.data, 'application/xml');

    return Array.from(xml.querySelectorAll('item')).map(item => {
      // Extract image from media:content or itunes:image
      const mediaContent = item.querySelector('media\\:content, content');
      const itunesImage = item.querySelector('itunes\\:image, image');
      const enclosureElement = item.querySelector('enclosure');

      // Check for image in content
      let imgSrc = null;
      const description = item.querySelector('description')?.textContent || '';
      const imgMatch = description.match(/<img[^>]+src="([^">]+)"/i);

      // Find the best available image
      const imageUrl =
        (mediaContent && mediaContent.getAttribute('url')) ||
        (itunesImage && itunesImage.getAttribute('href')) ||
        (imgMatch && imgMatch[1]) ||
        '/default-episode-artwork.jpg';

      return {
        title: item.querySelector('title')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        description: description,
        pubDate: item.querySelector('pubDate')?.textContent || '',
        imageUrl: imageUrl,
        audioUrl: enclosureElement?.getAttribute('url') || '',
        duration: item.querySelector('itunes\\:duration')?.textContent || '',
        author: item.querySelector('itunes\\:author')?.textContent || '',
        categories: Array.from(item.querySelectorAll('category')).map(cat => cat.textContent),
        guid: item.querySelector('guid')?.textContent || ''
      };
    });
  } catch (err) {
    console.error('RSS fetch failed', err);
    return [];
  }
}
