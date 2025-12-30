import React, { useState, useEffect } from 'react';
import api from '../services/api';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Unable to load news. Showing cached headlines.');
      // Even on error, backend returns fallback data
      if (error.response?.data?.data) {
        setNews(error.response.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <section id="news-section" className="section">
      <h2>Latest Environmental News</h2>
      <p className="news-subtitle">
        Live updates from around the web
        {error && <span style={{ color: '#b30000' }}> • {error}</span>}
      </p>
      <ul className="news-list">
        {loading ? (
          <li>Loading latest news...</li>
        ) : news.length === 0 ? (
          <li>No news available at the moment.</li>
        ) : (
          news.map((article, index) => (
            <li key={index}>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
              <span className="news-source">
                Source: {article.source.name} • {formatDate(article.publishedAt)}
              </span>
              {article.description && (
                <p style={{ 
                  fontSize: '0.9em', 
                  color: '#666', 
                  marginTop: '5px' 
                }}>
                  {article.description.substring(0, 150)}...
                </p>
              )}
            </li>
          ))
        )}
      </ul>
      {!loading && news.length > 0 && (
        <button
          onClick={fetchNews}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#0b5d1e',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh News
        </button>
      )}
    </section>
  );
};

export default NewsSection;