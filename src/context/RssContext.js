import React, { createContext, useState, useCallback } from 'react';
import { fetchRss } from '../utils/rss';

const RssContext = createContext();

export function RssProvider({ children }) {
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const fetchFeed = useCallback(async (url, options = {}) => {
    const cacheKey = url;
    const cachedData = cache[cacheKey];
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < 15 * 60 * 1000) {
      return cachedData.data;
    }

    setLoading(prev => ({ ...prev, [cacheKey]: true }));

    try {
      const data = await fetchRss(url, options);
      setCache(prev => ({
        ...prev,
        [cacheKey]: { data, timestamp: now }
      }));
      setLoading(prev => ({ ...prev, [cacheKey]: false }));
      return data;
    } catch (err) {
      setError(prev => ({ ...prev, [cacheKey]: err.message }));
      setLoading(prev => ({ ...prev, [cacheKey]: false }));
      throw err;
    }
  }, [cache]);

  return (
    <RssContext.Provider value={{ fetchFeed, loading, error, cache }}>
      {children}
    </RssContext.Provider>
  );
}

export default RssContext;
