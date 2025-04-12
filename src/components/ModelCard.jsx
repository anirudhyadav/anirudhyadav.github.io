import React from 'react';

function ModelCard({ model, onClick }) {
    return (
      <div
        onClick={() => onClick(model)}
        style={{
          width: '300px',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '1rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
          cursor: 'pointer'
        }}
      >
        <h3>🧠 {model.Algorithm}</h3>
        <p><strong>Type:</strong> {model.Type}</p>
        <p><strong>Use Case:</strong> {model['Best Use Case']}</p>
        <p><strong>Complexity:</strong> {model['Complexity (Low/Med/High)']}</p>
      </div>
    );
  }
export default ModelCard;