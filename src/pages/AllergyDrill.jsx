import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, getImageUrl } from '../data/menuData';

const ALLERGEN_POOL = ['Gluten', 'Dairy', 'Nut', 'Peanut', 'Soy', 'Shellfish', 'Egg', 'Sesame'];

function AllergyDrill() {
  const navigate = useNavigate();
  const [drillActive, setDrillActive] = useState(false);
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startDrill = () => {
    // For now, use all food items. We will generate mock allergens if they don't exist.
    const pool = getAllItems().filter(item => item.type === 'food');
    const shuffled = pool.sort(() => 0.5 - Math.random()).slice(0, 10);
    setItems(shuffled);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setDrillActive(true);
    generateScenario(shuffled[0]);
  };

  // Helper to guess allergens if the JSON data is missing them
  const getMockAllergens = (item) => {
    if (item.allergens && item.allergens.length > 0) return item.allergens;
    
    const allergens = [];
    const ingString = (item.ingredients || []).join(' ').toLowerCase();
    
    if (ingString.includes('cheese') || ingString.includes('cream') || ingString.includes('butter') || ingString.includes('milk')) allergens.push('Dairy');
    if (ingString.includes('bun') || ingString.includes('bread') || ingString.includes('flour') || ingString.includes('noodle')) allergens.push('Gluten');
    if (ingString.includes('peanut') || ingString.includes('almond') || ingString.includes('walnut')) allergens.push('Nut');
    if (ingString.includes('shrimp') || ingString.includes('prawn') || ingString.includes('crab')) allergens.push('Shellfish');
    if (ingString.includes('soy') || ingString.includes('tofu') || ingString.includes('edamame')) allergens.push('Soy');
    if (ingString.includes('egg') || ingString.includes('mayo')) allergens.push('Egg');
    
    return allergens;
  };

  const generateScenario = (item) => {
    if (!item) return;
    
    const itemAllergens = getMockAllergens(item);
    
    // 50% chance to test an allergen it ACTUALLY has (Unsafe)
    // 50% chance to test a random other allergen (Safe)
    const isUnsafeScenario = Math.random() > 0.5 && itemAllergens.length > 0;
    
    let testedAllergen = '';
    if (isUnsafeScenario) {
      testedAllergen = itemAllergens[Math.floor(Math.random() * itemAllergens.length)];
    } else {
      const safeAllergens = ALLERGEN_POOL.filter(a => !itemAllergens.some(itemA => itemA.toLowerCase().includes(a.toLowerCase())));
      testedAllergen = safeAllergens[Math.floor(Math.random() * safeAllergens.length)];
    }

    setCurrentScenario({
      item,
      allergen: testedAllergen,
      isUnsafe: isUnsafeScenario,
      actualAllergens: itemAllergens
    });
  };

  const handleAnswer = (userSaidUnsafe) => {
    const isCorrect = userSaidUnsafe === currentScenario.isUnsafe;
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < items.length) {
        setCurrentIndex(prev => prev + 1);
        generateScenario(items[currentIndex + 1]);
      } else {
        setDrillActive(false); // End of drill
      }
    }, 2000);
  };

  if (!drillActive && score.total > 0) {
    return (
      <div style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2 className="text-serif" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--earls-primary)' }}>Shift Complete</h2>
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>You successfully identified</p>
          <p className="text-serif" style={{ fontSize: '3rem', color: score.correct === score.total ? '#52c41a' : 'var(--earls-accent)' }}>
            {score.correct} / {score.total}
          </p>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Allergy Scenarios</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
          <button className="btn-secondary" onClick={() => navigate('/drills')}>Back to Drills</button>
          <button className="btn-primary" onClick={startDrill}>Play Again</button>
        </div>
      </div>
    );
  }

  if (!drillActive) {
    return (
      <div style={{ padding: 'var(--spacing-md) 0' }}>
        <h2 className="text-serif" style={{ marginBottom: 'var(--spacing-sm)' }}>Allergy Minefield</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Guest safety is our top priority. You will be presented with a dish and a guest's severe allergy. You must quickly determine if the dish is Safe or Unsafe.
        </p>
        <button className="btn-primary" onClick={startDrill} style={{ width: '100%', padding: '16px' }}>
          Start Shift (10 Scenarios)
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--spacing-md) 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Score: {score.correct}/{score.total}</span>
        <span style={{ fontWeight: 'bold', color: 'var(--earls-accent)' }}>{currentIndex + 1} / {items.length}</span>
      </div>

      <div className="glass-panel" style={{
        flex: 1,
        padding: 'var(--spacing-xl)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '450px',
        borderTop: feedback === 'correct' ? '6px solid #52c41a' : feedback === 'incorrect' ? '6px solid #ff4d4f' : '6px solid var(--earls-accent)',
        transition: 'border-color 0.3s'
      }}>
        
        {/* Scenario Header */}
        <div style={{ background: 'rgba(255, 77, 79, 0.1)', border: '1px solid rgba(255, 77, 79, 0.3)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)', width: '100%' }}>
          <p style={{ color: '#ff4d4f', fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>⚠️ Guest Profile</p>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
            Severe <strong>{currentScenario.allergen}</strong> Allergy
          </p>
        </div>

        <div style={{
          width: '160px',
          height: '160px',
          marginBottom: 'var(--spacing-md)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--glass-border)',
          backgroundColor: 'rgba(0,0,0,0.2)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img 
            src={getImageUrl(currentScenario.item)} 
            alt={currentScenario.item.menu_item_name}
            onError={(e) => { e.target.style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <h1 className="text-serif" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xl)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          {currentScenario.item.menu_item_name}
        </h1>

        {feedback ? (
          <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
            {feedback === 'correct' ? (
              <h2 style={{ color: '#52c41a', fontSize: '2rem' }}>Correct!</h2>
            ) : (
              <div>
                <h2 style={{ color: '#ff4d4f', fontSize: '2rem', marginBottom: '8px' }}>Incorrect</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {currentScenario.isUnsafe 
                    ? `This dish contains ${currentScenario.actualAllergens.join(', ')}.` 
                    : `This dish does not contain ${currentScenario.allergen}.`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', width: '100%', justifyContent: 'center' }}>
            <button 
              onClick={() => handleAnswer(false)} 
              style={{ flex: 1, maxWidth: '150px', padding: '20px', fontSize: '1.25rem', fontWeight: 'bold', borderRadius: 'var(--radius-md)', background: 'rgba(82, 196, 26, 0.1)', color: '#52c41a', border: '2px solid #52c41a', cursor: 'pointer' }}
            >
              ✅ Safe
            </button>
            <button 
              onClick={() => handleAnswer(true)} 
              style={{ flex: 1, maxWidth: '150px', padding: '20px', fontSize: '1.25rem', fontWeight: 'bold', borderRadius: 'var(--radius-md)', background: 'rgba(255, 77, 79, 0.1)', color: '#ff4d4f', border: '2px solid #ff4d4f', cursor: 'pointer' }}
            >
              🚫 Unsafe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllergyDrill;
