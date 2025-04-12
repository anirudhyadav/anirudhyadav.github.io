import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <input
      type="text"
      placeholder="🔍 Search models, metrics, use cases..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
      }}
      style={{
        width: '100%', padding: '0.8rem', marginTop: '1rem',
        fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc'
      }}
    />
  );
}

export default SearchBar;