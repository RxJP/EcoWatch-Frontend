import React, { useState } from 'react';

const TimeSlider = () => {
  const [year, setYear] = useState(2024);

  return (
    <section className="section slider-section">
      <h2>Past → Present → Future</h2>
      <input
        type="range"
        min="2000"
        max="2050"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        id="timeSlider"
      />
      <p id="timeLabel">Year: {year}</p>
      <p style={{ fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
        {year < 2024 
          ? '📊 Historical environmental data' 
          : year === 2024 
          ? '📍 Current environmental status' 
          : '🔮 Projected environmental scenarios'}
      </p>
    </section>
  );
};

export default TimeSlider;
