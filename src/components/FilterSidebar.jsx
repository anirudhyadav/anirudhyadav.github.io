import React from 'react';

function FilterSidebar({ data, setFiltered }) {
  const types = [...new Set(data.map((d) => d.Type))];
  const complexities = [...new Set(data.map((d) => d['Complexity (Low/Med/High)']))];

  const filterBy = (type, complexity) => {
    let filtered = data;
    if (type) filtered = filtered.filter((d) => d.Type === type);
    if (complexity) filtered = filtered.filter((d) => d['Complexity (Low/Med/High)'] === complexity);
    setFiltered(filtered);
  };

  return (
    <div>
      <div>
        <label><strong>📘 Type:</strong></label><br />
        <select onChange={(e) => filterBy(e.target.value, null)} style={{ width: '100%' }}>
          <option value="">All</option>
          {types.map((type, idx) => (
            <option key={idx}>{type}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label><strong>🍀 Complexity:</strong></label><br />
        <select onChange={(e) => filterBy(null, e.target.value)} style={{ width: '100%' }}>
          <option value="">All</option>
          {complexities.map((comp, idx) => (
            <option key={idx}>{comp}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;