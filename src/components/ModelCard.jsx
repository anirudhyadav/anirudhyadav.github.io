import React from 'react';

function ModelCard({ model, onClick, isLearned, toggleLearned }) {
  return (
    <div
      onClick={() => onClick(model)}
      className={`model-card ${isLearned ? 'learned' : ''}`}
    >
      <h3>🧠 {model.Algorithm}</h3>
      <p><strong>Type:</strong> {model.Type}</p>
      <p><strong>Use Case:</strong> {model['Best Use Case']}</p>
      <p><strong>Complexity:</strong> {model['Complexity (Low/Med/High)']}</p>
      <button onClick={(e) => {
        e.stopPropagation();  // prevent modal opening
        toggleLearned(model.Algorithm);
      }}>
        {isLearned ? '✅ Learned' : '📘 Mark as Learned'}
      </button>
    </div>
  );
}

export default ModelCard;