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
    <div style={{ width: '250px', padding: '1rem', borderRight: '1px solid #eee' }}>
      <h3>🔎 Filters</h3>
      <div>
        <label>📘 Type:</label>
        <select onChange={(e) => filterBy(e.target.value, null)}>
          <option value=''>All</option>
          {types.map((t, idx) => <option key={idx}>{t}</option>)}
        </select>
      </div>
      <div>
        <label>🍀 Complexity:</label>
        <select onChange={(e) => filterBy(null, e.target.value)}>
          <option value=''>All</option>
          {complexities.map((c, idx) => <option key={idx}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;