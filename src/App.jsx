// ============================================
// client/src/App.jsx (UPDATED - TimeSlider Removed)
// ============================================
import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Map from './components/Map';
import ImpactAnalysis from './components/ImpactAnalysis';
import QASection from './components/QASection';
import Petitions from './components/Petitions';
import NewsSection from './components/NewsSection';
import AuthModal from './components/modals/AuthModal';
import { AuthProvider } from './context/AuthContext';

function AppContent() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [selectedZone, setSelectedZone] = useState(null);

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="App">
      <Navbar onOpenAuth={openAuthModal} />
      <Hero />
      <Map onZoneSelect={setSelectedZone} />
      {/* TimeSlider removed - now integrated into ImpactAnalysis */}
      <ImpactAnalysis selectedZone={selectedZone} />
      <QASection />
      <Petitions onOpenAuth={openAuthModal} />
      <NewsSection />
      
      <footer className="footer">
        <p>© 2025 EcoWatch | Civic-Tech Environmental Platform</p>
        <p style={{ fontSize: '0.85em', marginTop: '5px' }}>
          Built with 💚 for the environment
        </p>
      </footer>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
