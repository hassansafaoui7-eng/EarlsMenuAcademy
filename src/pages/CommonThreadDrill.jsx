import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllItems, getImageUrl } from '../data/menuData';

function CommonThreadDrill() {
  const navigate = useNavigate();
  const [drillActive, setDrillActive] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const startDrill = () => {
    const generatedScenarios = generateScenarios();
    setScenarios(generatedScenarios);
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setFeedback(null);
    setSelectedOption(null);
    setDrillActive(true);
  };

  const generateScenarios = () => {
    const foods = getAllItems().filter(i => i.type === 'food' && i.ingredients && i.ingredients.length > 0);
    
    // Map all ingredients to the dishes that contain them
    const ingredientMap = {};
    const allIngredients = new Set();
    
    foods.forEach(food => {
      food.ingredients.forEach(ing => {
        // Clean up ingredient strings slightly to improve matching
        const cleanIng = ing.trim().replace(/\.$/, ''); 
        if (!ingredientMap[cleanIng]) ingredientMap[cleanIng] = [];
        // Prevent duplicate dishes for the same ingredient if an ingredient is listed twice
        if (!ingredientMap[cleanIng].some(d => d.id === food.id)) {
          ingredientMap[cleanIng].push(food);
        }
        allIngredients.add(cleanIng);
      });
    });

    // Find ingredients shared by at least 2 dishes, preferably 3
    const sharedIngredients = Object.keys(ingredientMap).filter(ing => ingredientMap[ing].length >= 2);
    
    const rounds = [];
    const usedIngredients = new Set();
    const allIngArray = Array.from(allIngredients);

    for (let i = 0; i < 10; i++) {
      let availableShared = sharedIngredients.filter(ing => !usedIngredients.has(ing));
      if (availableShared.length === 0) availableShared = sharedIngredients; 
      
      const targetIngredient = availableShared[Math.floor(Math.random() * availableShared.length)];
      usedIngredients.add(targetIngredient);
      
      // Pick 2 or 3 dishes that share it
      const dishesWithTarget = ingredientMap[targetIngredient].sort(() => 0.5 - Math.random()).slice(0, 3);
      
      // Generate 3 wrong options
      const wrongOptions = new Set();
      while(wrongOptions.size < 3) {
        const wrong = allIngArray[Math.floor(Math.random() * allIngArray.length)];
        // Ensure the wrong option is NOT actually in all selected dishes
        const isActuallyShared = dishesWithTarget.every(dish => dish.ingredients.some(ing => ing.trim().replace(/\.$/, '') === wrong));
        if (!isActuallyShared && wrong !== targetIngredient) {
          wrongOptions.add(wrong);
        }
      }

      const options = [targetIngredient, ...Array.from(wrongOptions)].sort(() => 0.5 - Math.random());
      
      rounds.push({
        targetIngredient,
        dishes: dishesWithTarget,
        options
      });
    }
    return rounds;
  };

  const handleAnswer = (option) => {
    if (feedback) return; // Prevent multiple clicks
    
    const currentScenario = scenarios[currentIndex];
    const isCorrect = option === currentScenario.targetIngredient;
    
    setSelectedOption(option);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));

    setTimeout(() => {
      setFeedback(null);
      setSelectedOption(null);
      if (currentIndex + 1 < scenarios.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setDrillActive(false); // End of drill
      }
    }, 2500);
  };

  if (!drillActive && score.total > 0) {
    return (
      <div style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2 className="text-serif" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--earls-primary)' }}>Drill Complete</h2>
        <div className="glass-panel" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>You correctly identified</p>
          <p className="text-serif" style={{ fontSize: '3rem', color: score.correct >= 8 ? '#52c41a' : 'var(--earls-accent)' }}>
            {score.correct} / {score.total}
          </p>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Shared Ingredients</p>
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
        <h2 className="text-serif" style={{ marginBottom: 'var(--spacing-sm)' }}>The Common Thread</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Memorization is easier when you recognize patterns. You will be shown up to 3 dishes. Your job is to identify the single core ingredient that they all share.
        </p>
        <button className="btn-primary" onClick={startDrill} style={{ width: '100%', padding: '16px' }}>
          Start Drill (10 Scenarios)
        </button>
      </div>
    );
  }

  const currentScenario = scenarios[currentIndex];

  return (
    <div style={{ padding: 'var(--spacing-md) 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Score: {score.correct}/{score.total}</span>
        <span style={{ fontWeight: 'bold', color: 'var(--earls-accent)' }}>{currentIndex + 1} / {scenarios.length}</span>
      </div>

      <div className="glass-panel" style={{
        flex: 1,
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTop: feedback === 'correct' ? '6px solid #52c41a' : feedback === 'incorrect' ? '6px solid #ff4d4f' : '6px solid var(--earls-accent)',
        transition: 'border-color 0.3s'
      }}>
        
        <h3 className="text-serif" style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)', textAlign: 'center' }}>
          What ingredient do these share?
        </h3>

        {/* Dishes Display */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-xl)', 
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {currentScenario.dishes.map((dish, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30%', minWidth: '90px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                marginBottom: '8px',
                borderRadius: '50%', // Circle avatar
                overflow: 'hidden',
                border: '2px solid var(--glass-border)',
                backgroundColor: 'rgba(0,0,0,0.2)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img 
                  src={getImageUrl(dish)} 
                  alt={dish.menu_item_name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', textAlign: 'center', fontWeight: 'bold', lineHeight: 1.2 }}>
                {dish.menu_item_name}
              </span>
            </div>
          ))}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {currentScenario.options.map((option, idx) => {
            let bgColor = 'rgba(255, 255, 255, 0.05)';
            let borderColor = 'var(--glass-border)';
            
            if (feedback) {
              if (option === currentScenario.targetIngredient) {
                bgColor = 'rgba(82, 196, 26, 0.2)'; // Green for correct answer
                borderColor = '#52c41a';
              } else if (option === selectedOption) {
                bgColor = 'rgba(255, 77, 79, 0.2)'; // Red if they picked the wrong one
                borderColor = '#ff4d4f';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={feedback !== null}
                style={{
                  padding: '16px',
                  fontSize: '1.1rem',
                  borderRadius: 'var(--radius-md)',
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                  color: 'var(--text-primary)',
                  cursor: feedback ? 'default' : 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s'
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback text */}
        {feedback && (
          <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center', animation: 'fadeIn 0.3s ease-in' }}>
            {feedback === 'correct' ? (
              <p style={{ color: '#52c41a', fontWeight: 'bold', fontSize: '1.2rem' }}>Spot on! ✅</p>
            ) : (
              <p style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '1.2rem' }}>Not quite. ❌</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommonThreadDrill;
