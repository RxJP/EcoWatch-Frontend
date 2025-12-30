import React, { useState } from 'react';
import api from '../services/api';

const QASection = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setShowAnswer(true);
    setAnswer('🤖 Consulting environmental database and research papers...');

    try {
      const response = await api.post('/ai/ask', { question });
      const formattedAnswer = response.data.data.replace(
        /\*\*(.*?)\*\*/g, 
        '<strong>$1</strong>'
      );
      setAnswer(`<strong>Answer:</strong><br><br>${formattedAnswer}`);
    } catch (error) {
      console.error('Q&A error:', error);
      setAnswer(
        `<strong style="color: #b30000;">⚠️ Error:</strong> ${
          error.response?.data?.message || error.message
        }<br><br>Please try again or check your API configuration.`
      );
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const sampleQuestions = [
    "How does deforestation affect local water cycles?",
    "What are the main causes of ocean acidification?",
    "How do microplastics impact marine ecosystems?",
    "What is the greenhouse effect?"
  ];

  const handleSampleClick = (q) => {
    setQuestion(q);
  };

  return (
    <section id="qa-section" className="section qa-section">
      <h2>🤖 Ask an Eco-Expert</h2>
      <div className="qa-container">
        {showAnswer && (
          <div 
            className="qa-response" 
            dangerouslySetInnerHTML={{ __html: answer }}
            style={{ opacity: loading ? 0.6 : 1 }}
          />
        )}
        <form onSubmit={handleSubmit} className="qa-form">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="E.g., How does deforestation affect local water cycles?"
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Thinking...' : 'Ask Gemini'}
          </button>
        </form>
        <div style={{ marginTop: '15px' }}>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '8px' }}>
            Try these sample questions:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSampleClick(q)}
                style={{
                  padding: '6px 12px',
                  background: 'white',
                  border: '1px solid #0b5d1e',
                  borderRadius: '15px',
                  fontSize: '0.85em',
                  cursor: 'pointer',
                  color: '#0b5d1e'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QASection;
