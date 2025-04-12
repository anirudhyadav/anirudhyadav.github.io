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

        {/* ✅ Links shown only if resource is ready */}
        {matched?.show === 'Y' && (
          <div style={{ marginTop: '1rem' }}>
            <p>📘 <a href={matched.Medium} target='_blank' rel='noreferrer'>Read on Medium</a></p>
            <p>💻 <a href={matched.GitHub} target='_blank' rel='noreferrer'>Open GitHub Notebook</a></p>
          </div>
        )}

        {/* Optional: Coming Soon Label */}
        {matched?.show === 'N' && (
          <div style={{ marginTop: '1rem', color: 'orange' }}>
            🚧 Learning resources for this model coming soon!
          </div>
        )}
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