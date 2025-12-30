import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ImpactAnalysis = ({ selectedZone }) => {
  const [analysis, setAnalysis] = useState(
    'Click a risk zone on the map to see AI-powered impact analysis.'
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedZone) {
      analyzeZone(selectedZone);
    } else {
      setAnalysis('Click a risk zone on the map to see AI-powered impact analysis.');
    }
  }, [selectedZone]);

  const analyzeZone = async (zone) => {
    setLoading(true);
    setAnalysis('🤖 AI is analyzing satellite data & ecological reports...');

    try {
      const response = await api.post('/ai/analyze', { zone });
      setAnalysis(response.data.data);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis(
        `<strong style="color:red">⚠️ Analysis Error:</strong> ${
          error.response?.data?.message || error.message
        }<br><br>Please try again or check your API configuration.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="impact-section" className="section">
      <h2>Environmental Impact Analysis</h2>
      <div 
        id="impact" 
        dangerouslySetInnerHTML={{ __html: analysis }}
        style={{ opacity: loading ? 0.6 : 1 }}
      />
    </section>
  );
};

export default ImpactAnalysis;
