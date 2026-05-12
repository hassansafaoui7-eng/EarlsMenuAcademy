import React, { useState, useEffect, useRef } from 'react';
import { getAllItems } from '../data/menuData';

function DinnerRushDrill() {
  const [gameState, setGameState] = useState('start'); // start, playing, end
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [currentInput, setCurrentInput] = useState('');
  const [foundIngredients, setFoundIngredients] = useState([]);
  const [score, setScore] = useState(0);
  const [isRevealingSkip, setIsRevealingSkip] = useState(false);
  
  const inputRef = useRef(null);

  const startGame = () => {
    // Get 15 random items
    const allItems = getAllItems();
    const randomItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 15);
    
    setItems(randomItems);
    setCurrentIndex(0);
    setTimeLeft(120);
    setFoundIngredients([]);
    setScore(0);
    setCurrentInput('');
    setIsRevealingSkip(false);
    setGameState('playing');
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('end');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  // Focus input automatically when playing
  useEffect(() => {
    if (gameState === 'playing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentIndex]);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && currentInput.trim().length > 2) {
      checkIngredient(currentInput.trim());
    }
  };

  const checkIngredient = (input) => {
    const currentItem = items[currentIndex];
    const lowerInput = input.toLowerCase();
    
    // Check if input is a substring of any ingredient that hasn't been found yet
    const matchedIndex = currentItem.ingredients.findIndex((ing, idx) => 
      !foundIngredients.includes(idx) && ing.toLowerCase().includes(lowerInput)
    );

    if (matchedIndex !== -1) {
      const newFound = [...foundIngredients, matchedIndex];
      setFoundIngredients(newFound);
      setCurrentInput('');
      setScore(score + 10); // 10 points per ingredient
      
      // Check if dish is complete
      if (newFound.length === currentItem.ingredients.length) {
        handleNextDish();
      }
    } else {
      // Flash input red or shake? (Simplified: just clear it or leave it to user)
      setCurrentInput('');
    }
  };

  const handleNextDish = () => {
    setIsRevealingSkip(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFoundIngredients([]);
      setCurrentInput('');
      setScore(score + 50); // 50 bonus points for finishing dish
    } else {
      setGameState('end');
    }
  };

  const handleSkip = () => {
    setIsRevealingSkip(true);
    setTimeout(() => {
      // Don't award bonus points for skipping
      setIsRevealingSkip(false);
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFoundIngredients([]);
        setCurrentInput('');
      } else {
        setGameState('end');
      }
    }, 2500); // Wait 2.5 seconds to read
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (gameState === 'start') {
    return (
      <div style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-serif" style={{ fontSize: '2.5rem', color: 'var(--earls-primary)', marginBottom: 'var(--spacing-md)' }}>Dinner Rush</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)', maxWidth: '400px', margin: '0 auto var(--spacing-lg)' }}>
          You have <strong>2 minutes</strong> to type out the ingredients for 15 random dishes. Type an ingredient and hit Enter. Partial matches are accepted!
        </p>
        <button className="btn-primary" onClick={startGame} style={{ fontSize: '1.25rem', padding: '16px 32px' }}>
          Start Shift
        </button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2 className="text-serif" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Shift Over!</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xs)' }}>Final Score: <strong>{score}</strong></p>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
          Dishes Completed: {currentIndex} / 15
        </p>
        <button className="btn-primary" onClick={startGame}>
          Play Again
        </button>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  // Safe check in case item doesn't have ingredients array
  const totalIngredients = currentItem?.ingredients?.length || 0;

  return (
    <div style={{ padding: 'var(--spacing-md) 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ backgroundColor: 'var(--earls-charcoal)', color: 'white', padding: '8px 16px', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>
          Score: {score}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: timeLeft <= 30 ? '#cf1322' : 'var(--earls-charcoal)' }}>
          ⏱️ {formatTime(timeLeft)}
        </div>
        <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>
          Dish {currentIndex + 1}/15
        </div>
      </div>

      {/* Main Game Area */}
      <div className="glass-panel" style={{
        flex: 1,
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        borderTop: `6px solid var(--earls-accent)`
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{currentItem.category}</p>
          <h2 className="text-serif" style={{ fontSize: '1.75rem' }}>{currentItem.menu_item_name}</h2>
        </div>

        {/* Ingredients Progress */}
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 'var(--spacing-md)' }}>
          <p style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-sm)' }}>
            Ingredients ({foundIngredients.length}/{totalIngredients}):
          </p>
          <div style={{ display: 'grid', gap: '8px' }}>
            {currentItem.ingredients?.map((ing, idx) => {
              const isFound = foundIngredients.includes(idx);
              return (
                <div key={idx} style={{
                  padding: '12px',
                  backgroundColor: isFound ? 'rgba(183, 235, 143, 0.1)' : (isRevealingSkip ? 'rgba(255, 163, 158, 0.1)' : 'var(--glass-bg)'),
                  border: `1px solid ${isFound ? '#b7eb8f' : (isRevealingSkip ? '#ffa39e' : 'var(--glass-border)')}`,
                  borderRadius: 'var(--radius-md)',
                  color: isFound ? '#389e0d' : (isRevealingSkip ? '#cf1322' : 'transparent'),
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}>
                  {isFound ? (
                    <>
                      <span style={{ marginRight: '8px' }}>✓</span> {ing}
                    </>
                  ) : isRevealingSkip ? (
                    <>
                      <span style={{ marginRight: '8px' }}>✗</span> {ing}
                    </>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>???</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Input Area */}
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <input 
            ref={inputRef}
            type="text" 
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder={isRevealingSkip ? "Memorize missing ingredients..." : "Type ingredient & press Enter..."}
            disabled={isRevealingSkip}
            style={{
              flex: 1,
              padding: '16px',
              fontSize: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--earls-charcoal)',
              outline: 'none',
              opacity: isRevealingSkip ? 0.6 : 1
            }}
          />
          <button 
            className="btn-primary" 
            onClick={() => checkIngredient(currentInput)}
            disabled={isRevealingSkip}
            style={{ borderRadius: 'var(--radius-md)', opacity: isRevealingSkip ? 0.6 : 1 }}
          >
            Submit
          </button>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
          <button 
            onClick={handleSkip} 
            disabled={isRevealingSkip}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: isRevealingSkip ? 'not-allowed' : 'pointer', opacity: isRevealingSkip ? 0.6 : 1 }}
          >
            Skip Dish (Lose Streak)
          </button>
        </div>
      </div>
    </div>
  );
}

export default DinnerRushDrill;
