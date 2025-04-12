// src/components/ModelModal.jsx
import React from 'react';

function ModelModal({ model, onClose }) {
  if (!model) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtnStyle} onClick={onClose}>❌ Close</button>
        <h2>{model.Algorithm}</h2>
        <p><strong>Type:</strong> {model.Type}</p>
        <p><strong>Best Use Case:</strong> {model['Best Use Case']}</p>
        <p><strong>Key Fundamentals:</strong> {model['Key Fundamentals to Know']}</p>
        <p><strong>Libraries:</strong> {model.Libraries}</p>
        <p><strong>Real-World Example:</strong> {model['Real-World Example']}</p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
};

const modalStyle = {
  backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '500px', maxHeight: '80vh', overflowY: 'auto'
};

const closeBtnStyle = {
  float: 'right', cursor: 'pointer', background: 'red', color: '#fff', padding: '0.3rem 0.7rem', border: 'none', borderRadius: '5px'
};

export default ModelModal;