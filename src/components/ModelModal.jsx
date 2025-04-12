import React from 'react';

function ModelModal({ model, onClose, resources }) {
  if (!model) return null;

  const matched = resources?.find(r => r.Algorithm === model.Algorithm);

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

        {matched?.show === 'Y' && (
          <>
            <p>📘 <a href={matched.Medium} target="_blank" rel="noreferrer">Read on Medium</a></p>
            <p>💻 <a href={matched.GitHub} target="_blank" rel="noreferrer">View GitHub Notebook</a></p>
          </>
        )}

        {matched?.show === 'N' && (
          <p style={{ color: 'orange' }}>🚧 Learning content coming soon!</p>
        )}
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalStyle = {
  background: '#fff', padding: '2rem', borderRadius: '8px',
  maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto'
};

const closeBtnStyle = {
  float: 'right', background: 'red', color: '#fff',
  border: 'none', padding: '0.4rem 1rem', borderRadius: '5px', cursor: 'pointer'
};

export default ModelModal;