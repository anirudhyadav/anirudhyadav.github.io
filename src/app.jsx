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

  // useEffect(() => {
  //   fetch(process.env.PUBLIC_URL + '/Complete_ML_AI.json')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setModels(data);
  //       setFiltered(data);
  //     });
  // }, []);
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/resource_links.json')
      .then(res => res.json())
      .then(data => {
        setResources(data);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const modelRes = await fetch(process.env.PUBLIC_URL + '/Complete_ML_AI.json');
      const resourceRes = await fetch(process.env.PUBLIC_URL + '/resource_links.json');
  
      const modelData = await modelRes.json();
      const resourceData = await resourceRes.json();
  
      setModels(modelData);
      setResources(resourceData);
  
      // ✅ Filter models where Algorithm has show === 'Y'
      const allowed = resourceData.filter(r => r.show === 'Y').map(r => r.Algorithm);
      const filteredModels = modelData.filter(m => allowed.includes(m.Algorithm));
  
      setFiltered(filteredModels);
    };
  
    fetchData();
  }, [learnedModels]);

  const handleSearch = (query) => {
    if (!query) return setFiltered(models);
    const q = query.toLowerCase();
    setFiltered(models.filter((m) =>
      Object.values(m).some((val) => val.toLowerCase().includes(q))
    ));
  };

  const toggleLearned = (algorithm) => {
    setLearnedModels(prev => prev.includes(algorithm)
      ? prev.filter(item => item !== algorithm)
      : [...prev, algorithm]);
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

      {/* <ModelModal model={selectedModel} onClose={() => setSelectedModel(null)} /> */}
      <ModelModal
  model={selectedModel}
  onClose={() => setSelectedModel(null)}
  resources={resources}
      />
    </div>
  );
}

export default App;