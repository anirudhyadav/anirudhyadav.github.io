import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ModelCard from './components/ModelCard';
import FilterSidebar from './components/FilterSidebar';
import ModelModal from './components/ModelModal';
import './App.css';

function App() {
  const [models, setModels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [learnedModels, setLearnedModels] = useState(() => {
    return JSON.parse(localStorage.getItem('learnedModels')) || [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [resources, setResources] = useState([]);
  const [resourceMap, setResourceMap] = useState({}); // 🔧 new lookup map

  useEffect(() => {
    const fetchData = async () => {
      const modelRes = await fetch(process.env.PUBLIC_URL + '/Complete_ML_AI.json');
      const resourceRes = await fetch(process.env.PUBLIC_URL + '/resource_links.json');

      const modelData = await modelRes.json();
      const resourceData = await resourceRes.json();

      // 🔧 Build a quick lookup map where show === 'Y'
      const visibleResources = {};
      resourceData.forEach(r => {
        if (r.show === 'Y') {
          visibleResources[r.Algorithm] = r;
        }
      });

      setResources(resourceData);
      setResourceMap(visibleResources);

      // 🔧 Filter model list where Algorithm is in resourceMap
      const filteredModels = modelData.filter(m => visibleResources[m.Algorithm]);

      setModels(filteredModels);
      setFiltered(filteredModels);
    };

    fetchData();
  }, [learnedModels]);

  const handleSearch = (query) => {
    if (!query) return setFiltered(models);
    const q = query.toLowerCase();
    setFiltered(models.filter((m) =>
      Object.values(m).some((val) => String(val).toLowerCase().includes(q))
    ));
  };

  const toggleLearned = (algorithm) => {
    const updated = learnedModels.includes(algorithm)
      ? learnedModels.filter(item => item !== algorithm)
      : [...learnedModels, algorithm];
    setLearnedModels(updated);
    localStorage.setItem('learnedModels', JSON.stringify(updated));
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <div className="topbar">
        <h1>🧠 AI/ML Model Explorer</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="hero">
        <h2>Search, Filter, and Learn AI Models – for Students & Practitioners 🚀</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="explorer-layout">
        <div className="sidebar">
          <FilterSidebar data={models} setFiltered={setFiltered} />
        </div>

        <div className="content">
          <div className="model-grid">
            {filtered.map((model, idx) => (
              <ModelCard
                key={idx}
                model={model}
                onClick={setSelectedModel}
                isLearned={learnedModels.includes(model.Algorithm)}
                toggleLearned={toggleLearned}
              />
            ))}
          </div>
        </div>
      </div>

      <ModelModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
        resources={resources}
      />
    </div>
  );
}

export default App;