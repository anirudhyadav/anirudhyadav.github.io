import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ModelCard from './components/ModelCard';
import FilterSidebar from './components/FilterSidebar';
import ModelModal from './components/ModelModal';

function App() {
  const [models, setModels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);


  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/Complete_ML_AI.json')
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query) return setFiltered(models);
    const q = query.toLowerCase();
    setFiltered(models.filter((m) =>
      Object.values(m).some((val) =>
        val.toLowerCase().includes(q)
      )
    ));
  };

  return (
    <div style={{ display: 'flex' }}>
      <FilterSidebar data={models} setFiltered={setFiltered} />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h1>🧠 AI/ML Model Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {filtered.map((model, idx) => (
            <ModelCard key={idx} model={model} onClick={setSelectedModel} />
          ))}
        </div>
  
        {/* ✅ Modal for full model info */}
        <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} />
      </div>
    </div>
  );
}

export default App;