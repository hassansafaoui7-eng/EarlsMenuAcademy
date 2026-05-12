import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import MenuLibrary from './pages/MenuLibrary';
import Drills from './pages/Drills';
import Profile from './pages/Profile';
import ActiveRecallDrill from './pages/ActiveRecallDrill';
import DinnerRushDrill from './pages/DinnerRushDrill';
import AllergyDrill from './pages/AllergyDrill';
import CommonThreadDrill from './pages/CommonThreadDrill';
import ItemDetail from './pages/ItemDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main style={{ flex: 1, padding: 'var(--spacing-md)' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/library" element={<MenuLibrary />} />
            <Route path="/library/item/:id" element={<ItemDetail />} />
            <Route path="/drills" element={<Drills />} />
            <Route path="/drills/active-recall" element={<ActiveRecallDrill />} />
            <Route path="/drills/dinner-rush" element={<DinnerRushDrill />} />
            <Route path="/drills/allergy-minefield" element={<AllergyDrill />} />
            <Route path="/drills/common-thread" element={<CommonThreadDrill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
        
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
