import React from 'react';

function FilterSidebar({ data, setFiltered }) {
  const types = [...new Set(data.map((d) => d.Type))];
  const complexities = [...new Set(data.map((d) => d['Complexity (Low/Med/High)']))];

  const filterBy = (type, comp) => {
    let filtered = data;
    if (type) filtered = filtered.filter((d) => d.Type === type);
    if (comp) filtered = filtered.filter((d) => d['Complexity (Low/Med/High)'] === comp);
    setFiltered(filtered);
  };

  return (
    <>
      <div style={{ marginBottom: '1.5rem' }}>
        <label><strong>📘 Type:</strong></label><br />
        <select onChange={(e) => filterBy(e.target.value, null)} style={{ width: '100%', padding: '0.5rem' }}>
          <option value=''>All</option>
          {types.map((t, idx) => <option key={idx}>{t}</option>)}
        </select>
      </div>
      <div>
        <label><strong>🍀 Complexity:</strong></label><br />
        <select onChange={(e) => filterBy(null, e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
          <option value=''>All</option>
          {complexities.map((c, idx) => <option key={idx}>{c}</option>)}
        </select>
      </div>
    </>
  );
}

export default FilterSidebar;