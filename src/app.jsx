import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ModelCard from './components/ModelCard';
import ModelModal from './components/ModelModal';
import './App.css';

const TABS = [
  'All',
  'Supervised',
  'Unsupervised',
  'Deep Learning',
  'Generative AI',
  'Reinforcement Learning',
  'Graph ML',
  'Probabilistic / Bayesian',
  'Ensemble',
  'Explainability Techniques'
];

function App() {
  const [models, setModels] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [learnedModels, setLearnedModels] = useState(() => {
    return JSON.parse(localStorage.getItem('learnedModels')) || [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      const modelRes = await fetch(process.env.PUBLIC_URL + '/Complete_ML_AI.json');
      const resourceRes = await fetch(process.env.PUBLIC_URL + '/resource_links.json');

      const modelData = await modelRes.json();
      const resourceData = await resourceRes.json();

      setResources(resourceData);

      const allowed = resourceData.filter(r => r.show === 'Y').map(r => r.Algorithm);
      const filteredModels = modelData.filter(m => allowed.includes(m.Algorithm));

      setModels(filteredModels);
      setFiltered(filteredModels);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    const base = activeTab === 'All' ? models : models.filter(m => m.Type?.toLowerCase().includes(activeTab.toLowerCase()));
    if (!query) return setFiltered(base);
    const q = query.toLowerCase();
    setFiltered(base.filter((m) =>
      Object.values(m).some((val) => val.toLowerCase().includes(q))
    ));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFiltered(models);
    } else {
      setFiltered(models.filter(m => m.Type?.toLowerCase().includes(tab.toLowerCase())));
    }
  };

  const toggleLearned = (algorithm) => {
    setLearnedModels(prev => {
      const updated = prev.includes(algorithm)
        ? prev.filter(item => item !== algorithm)
        : [...prev, algorithm];
      localStorage.setItem('learnedModels', JSON.stringify(updated));
      return updated;
    });
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

      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
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

      <ModelModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
        resources={resources}
      />
    </div>
  );
}

export default App;