import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInput = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      <input
        type="text"
        placeholder="🔍 Search models, metrics, use cases..."
        value={query}
        onChange={handleInput}
        style={{ width: '100%', padding: '0.5rem' }}
      />
    </div>
  );
}

export default SearchBar;