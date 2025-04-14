import React, { useEffect, useState } from 'react';

const EDACards = () => {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/eda_scenarios.json')
      .then(res => res.json())
      .then(data => setScenarios(data));
  }, []);

  return (
    <div className="eda-section">
      <h2>🔍 Exploratory Data Analysis Scenarios</h2>
      <div className="eda-grid">
        {scenarios.map((item, idx) => (
          <div className="eda-card" key={idx}>
            <h3>{item.title}</h3>
            <p><strong>Target:</strong> {item.target}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p>{item.description}</p>
            <div className="eda-actions">
                {item.dataset && (
                    <a href={item.dataset} target="_blank" rel="noopener noreferrer">📂 Dataset</a>
                )}
                {item.notebook && (
                    <a href={item.notebook} target="_blank" rel="noopener noreferrer">📂 notebook</a>
                )}
                <a href={`/reports/${item.report}`} target="_blank" rel="noopener noreferrer">📊 AutoEDA</a>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EDACards;