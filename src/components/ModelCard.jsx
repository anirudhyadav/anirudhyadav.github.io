import React from 'react';

function ModelCard({ model }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      width: '300px',
      background: '#f8f8f8'
    }}>
      <h3>🧠 {model.Algorithm}</h3>
      <p><strong>Type:</strong> {model.Type}</p>
      <p><strong>Use Case:</strong> {model['Best Use Case']}</p>
      <p><strong>Complexity:</strong> {model['Complexity (Low/Med/High)']}</p>
    </div>
  );
}

export default ModelCard;