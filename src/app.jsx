import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ModelCard from './components/ModelCard';
import ModelModal from './components/ModelModal';
import './App.css';

const TABS = [
  'Fundamentals',
  'Exploratory Data Analysis',
  'Supervised',
  'Unsupervised',
  'Deep Learning',
  'Graph ML',
  'Probabilistic / Bayesian',
  'Ensemble',
  'Explainability Techniques',
  'Agent AI'
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

  // Load model + resource data
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

  // Search filter
  const handleSearch = (query) => {
    const base = activeTab === 'All'
      ? models
      : models.filter(m => m.Type?.toLowerCase().includes(activeTab.toLowerCase()));

    if (!query) return setFiltered(base);

    const q = query.toLowerCase();
    setFiltered(
      base.filter((m) =>
        Object.values(m).some((val) => val.toLowerCase().includes(q))
      )
    );
  };

  // Tab filter
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'All') {
      setFiltered(models);
    } else {
      setFiltered(models.filter(m => m.Type?.toLowerCase().includes(tab.toLowerCase())));
    }
  };

  // Mark/unmark learned models
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
      
      {/* Topbar */}
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img 
            src={process.env.PUBLIC_URL + "/Signature.png"} 
            alt="Signature" 
            style={{ height: "50px", marginRight: "1rem" }}
          />
          <h1>AI/ML Explorer</h1>
        </div>
      </div>

      {/* Feature Highlights */}
      <section className="feature-section">
  <div className="feature-wrapper">
    <div className="feature-card">
      <span className="emoji">📚</span>
      <h3>AI-ready models</h3>
      <p>Browse standardized ML models with clear tags, complexity, and real-world use cases.</p>
    </div>
    <div className="feature-card">
      <span className="emoji">🧰</span>
      <h3>Explainability Toolkit</h3>
      <p>Discover model interpretation techniques like SHAP, LIME, PDP with evaluation insights.</p>
    </div>
    <div className="feature-card">
      <span className="emoji">🚀</span>
      <h3>Deployment Ready</h3>
      <p>Learn which models are fast, interpretable, and best for production deployment paths.</p>
    </div>
  </div>
</section>

      {/* Hero + Search */}
      <div className="hero">
        <h2>Search, Filter, and Learn AI Models – for Students & Practitioners 🚀</h2>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Tab Filters */}
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

      {/* Model Cards */}
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

      {/* Modal */}
      <ModelModal
        model={selectedModel}
        onClose={() => setSelectedModel(null)}
        resources={resources}
      />
    </div>
  );
}


export default App;