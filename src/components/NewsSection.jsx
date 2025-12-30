import React, { useState, useEffect } from 'react';
import api from '../services/api';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const articlesPerPage = 3;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      console.log('News articles fetched:', response.data.data.length);
      setNews(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Unable to load news at the moment.');
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

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const totalPages = Math.ceil(news.length / articlesPerPage);
  const currentArticles = news.slice(
    currentPage * articlesPerPage,
    (currentPage + 1) * articlesPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      document.getElementById('news-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      document.getElementById('news-section').scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="news-section" className="section">
        <h2>Latest Environmental News</h2>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading-spinner"></div>
          <p>Loading latest environmental news...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news-section" className="section">
      <h2>Latest Environmental News</h2>
      <p className="news-subtitle">
        Curated environmental updates from trusted sources worldwide
        {error && <span style={{ color: '#b30000' }}> • {error}</span>}
      </p>

      {news.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No news available at the moment.
        </p>
      ) : (
        <>
          <div className="news-grid">
            {currentArticles.map((article, index) => (
              <article key={index} className="news-card">
                <div className="news-card-image">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <span className="news-card-source">{article.source.name}</span>
                    <span className="news-card-date">{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="news-card-title">
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {truncateText(article.title, 80)}
                    </a>
                  </h3>
                  <p className="news-card-description">
                    {truncateText(article.description, 120)}
                  </p>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="news-card-link"
                  >
                    Read Full Article →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="news-pagination">
              <button 
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="pagination-btn"
              >
                ← Previous
              </button>
              <span className="pagination-info">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="pagination-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NewsSection;