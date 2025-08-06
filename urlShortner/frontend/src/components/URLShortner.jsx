import React, { useState, useEffect } from 'react';
import './URLShortner.css';

const URLShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [allUrls, setAllUrls] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchAllUrls();
  }, []);

  const fetchAllUrls = async () => {
    try {
      const response = await fetch(`${API_BASE}/urls`);
      const data = await response.json();
      setAllUrls(data.urls || []);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!url.trim()) {
      setError('Please enter a valid URL');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(`${API_BASE}/${data.shortId}`);
        setSuccess('Short URL created successfully!');
        setUrl('');
        fetchAllUrls();
      } else {
        setError(data.message || 'Error creating short URL');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSuccess('Copied to clipboard!');
      setTimeout(() => setSuccess(''), 2000);
    });
  };

  const fetchAnalytics = async (shortId) => {
    try {
      const response = await fetch(`${API_BASE}/analytics/${shortId}`);
      const data = await response.json();
      
      if (response.ok) {
        setAnalytics(data);
        setShowAnalytics(true);
      } else {
        setError(data.message || 'Error fetching analytics');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const closeAnalytics = () => {
    setShowAnalytics(false);
    setAnalytics(null);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="url-shortener-container">
      {/* Header */}
      <header className="header">
        <h1 className="title">🔗 URL Shortener</h1>
        <p className="subtitle">Transform long URLs into short, shareable links</p>
      </header>

      {/* Main Form */}
      <div className="main-card">
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className={`url-input ${url ? 'focused' : ''}`}
            disabled={loading}
          />
          <button 
            onClick={handleSubmit}
            className="shorten-button"
            disabled={loading || !url.trim()}
          >
            {loading ? '⏳ Creating...' : '🚀 Shorten URL'}
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="message error-message">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="message success-message">
            ✅ {success}
          </div>
        )}

        {/* Result */}
        {shortUrl && (
          <div className="result-card">
            <h3 className="result-title">🎉 Your Short URL:</h3>
            <div className="result-group">
              <input 
                type="text" 
                value={shortUrl} 
                readOnly 
                className="result-input"
              />
              <button 
                onClick={() => copyToClipboard(shortUrl)}
                className="copy-button"
              >
                📋 Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* URLs List */}
      <div className="urls-list">
        <h2 className="section-title">📊 Your URLs ({allUrls.length})</h2>
        
        {allUrls.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔗</span>
            <p>No URLs created yet. Create your first short URL above! 👆</p>
          </div>
        ) : (
          <div>
            {allUrls.map((urlData, index) => (
              <div 
                key={urlData._id || index} 
                className="url-item"
              >
                <div className="url-info">
                  <div style={{marginBottom: '8px'}}>
                    <span className="url-label">Original:</span>
                    <a 
                      href={urlData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      {urlData.url.length > 60 ? `${urlData.url.substring(0, 60)}...` : urlData.url}
                    </a>
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <span className="url-label">Short:</span>
                    <span className="short-id">
                      {API_BASE.replace('http://', '').replace('https://', '')}/{urlData.shortId}
                    </span>
                  </div>
                  <div className="url-stats">
                    <span>👆 {urlData.visitHistory?.length || 0} clicks</span>
                    <span>📅 {formatDate(urlData.createdAt)}</span>
                  </div>
                </div>
                
                <div className="url-actions">
                  <button 
                    onClick={() => copyToClipboard(`${API_BASE}/${urlData.shortId}`)}
                    className="action-button copy-action-button"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                  <button 
                    onClick={() => fetchAnalytics(urlData.shortId)}
                    className="action-button analytics-action-button"
                    title="View analytics"
                  >
                    📊
                  </button>
                  <a 
                    href={`${API_BASE}/${urlData.shortId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-button visit-action-button"
                    title="Visit URL"
                  >
                    🔗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analytics Modal */}
      {showAnalytics && analytics && (
        <div className="modal" onClick={closeAnalytics}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">📊 Analytics</h2>
              <button 
                onClick={closeAnalytics}
                className="close-button"
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {/* Stats Summary */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{analytics.totalClicks}</div>
                  <div className="stat-label">Total Clicks</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{analytics.clicksLast24Hours || 0}</div>
                  <div className="stat-label">Last 24 Hours</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{analytics.clicksLast7Days || 0}</div>
                  <div className="stat-label">Last 7 Days</div>
                </div>
              </div>
              
              {/* URL Details */}
              <div className="url-details">
                <div className="detail-item">
                  <span className="detail-label">Short ID:</span>
                  <span className="detail-value">{analytics.shortId}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Original URL:</span>
                  <a 
                    href={analytics.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="detail-value link"
                  >
                    {analytics.originalUrl}
                  </a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Created:</span>
                  <span className="detail-value">{formatDate(analytics.createdAt)}</span>
                </div>
              </div>

              {/* Visit History */}
              {analytics.visitHistory && analytics.visitHistory.length > 0 && (
                <div className="history-section">
                  <h3 className="history-title">🕒 Recent Visits</h3>
                  <div className="history-list">
                    {analytics.visitHistory.slice(0, 15).map((visit, index) => (
                      <div key={index} className="history-item">
                        <span className="visit-number">
                          Visit #{analytics.visitHistory.length - index}
                        </span>
                        <span className="visit-time">
                          {formatDate(visit.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {analytics.visitHistory.length > 15 && (
                    <p className="history-more">
                      ... and {analytics.visitHistory.length - 15} more visits
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default URLShortener;