import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllItems, getCategories, getItemsByCategory, getImageUrl } from '../data/menuData';
import { usePinnedItems } from '../context/PinnedItemsContext';

function ActiveRecallDrill() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pinnedItems, togglePin, isPinned } = usePinnedItems();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [drillComplete, setDrillComplete] = useState(false);

  const categories = getCategories();

  const handleStartDrill = (category) => {
    let drillItems = [];
    if (category === 'All Categories') {
      drillItems = getAllItems();
    } else if (category === 'Pinned Items') {
      drillItems = getAllItems().filter(item => pinnedItems.includes(item.id));
      if (drillItems.length === 0) {
        alert("You don't have any pinned items yet! Pin items in the Menu Library.");
        return;
      }
    } else {
      drillItems = getItemsByCategory(category);
    }
    
    // Shuffle and limit to 20 for a session
    drillItems = drillItems.sort(() => 0.5 - Math.random()).slice(0, 20);
    
    setSelectedCategory(category);
    setItems(drillItems);
    setCurrentIndex(0);
    setShowAnswer(false);
    setDrillComplete(false);
  };

  // Auto-start if navigating from home with ?mode=pinned
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'pinned' && !selectedCategory && pinnedItems.length > 0) {
      handleStartDrill('Pinned Items');
      // Clean up URL so back button works better
      navigate('/drills/active-recall', { replace: true });
    }
  }, [location, pinnedItems, selectedCategory]);

  const handleReveal = () => setShowAnswer(true);
  
  const handleNext = (quality) => {
    setShowAnswer(false);
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setDrillComplete(true);
    }
  };

  const resetDrill = () => {
    setSelectedCategory(null);
    setItems([]);
    setDrillComplete(false);
  };

  // View: Category Selection
  if (!selectedCategory) {
    return (
      <div style={{ padding: 'var(--spacing-md) 0' }}>
        <h2 className="text-serif" style={{ marginBottom: 'var(--spacing-sm)' }}>Active Recall</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
          Select a specific menu section to focus your training, or choose all categories for a mixed review.
        </p>

        <div style={{ display: 'grid', gap: 'var(--spacing-sm)', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
          {pinnedItems.length > 0 && (
            <button 
              className="glass-panel"
              onClick={() => handleStartDrill('Pinned Items')}
              style={{
                padding: 'var(--spacing-md)',
                border: '1px solid var(--earls-accent)',
                background: 'rgba(156, 121, 66, 0.2)',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                gridColumn: '1 / -1'
              }}
            >
              ⭐ Pinned Items ({pinnedItems.length})
            </button>
          )}

          <button 
            className="glass-panel"
            onClick={() => handleStartDrill('All Categories')}
            style={{
              padding: 'var(--spacing-md)',
              border: '1px solid var(--earls-accent)',
              color: 'var(--earls-accent)',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            All Categories
          </button>
          
          {categories.map(cat => (
            <button 
              key={cat}
              className="glass-panel"
              onClick={() => handleStartDrill(cat)}
              style={{
                padding: 'var(--spacing-md)',
                color: 'var(--text-primary)',
                fontWeight: 500,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                textAlign: 'center'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // View: Drill Complete
  if (drillComplete) {
    return (
      <div style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h2 className="text-serif" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)', color: 'var(--earls-primary)' }}>Drill Complete!</h2>
        <p style={{ marginBottom: 'var(--spacing-xl)' }}>You've reviewed {items.length} items from {selectedCategory}.</p>
        <button className="btn-primary" onClick={resetDrill}>
          Choose Another Category
        </button>
      </div>
    );
  }

  // View: Active Flashcard
  if (items.length === 0) return <div>No items found for this category.</div>;

  const currentItem = items[currentIndex];

  return (
    <div style={{ padding: 'var(--spacing-md) 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)', alignItems: 'center' }}>
        <button onClick={resetDrill} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          ← Back
        </button>
        <span style={{ fontWeight: 'bold', color: 'var(--earls-accent)' }}>{currentIndex + 1} / {items.length}</span>
      </div>

      <div className="glass-panel" style={{
        flex: 1,
        padding: 'var(--spacing-xl)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '400px',
        borderTop: `6px solid var(--earls-accent)`
      }}>
        
        {/* Main Content Area: Side by Side on larger screens, stacking on small if needed */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--spacing-xl)', flex: 1, alignItems: 'center' }}>
          
          {/* Left Side: Image & Title */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '300px',
              aspectRatio: '1',
              marginBottom: 'var(--spacing-md)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              backgroundColor: 'rgba(0,0,0,0.2)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img 
                src={getImageUrl(currentItem)} 
                alt={currentItem.menu_item_name}
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xs)', fontSize: '0.875rem' }}>
              {currentItem.category}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <h1 className="text-serif" style={{ fontSize: '1.75rem', textAlign: 'center', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {currentItem.menu_item_name}
              </h1>
              <button 
                onClick={() => togglePin(currentItem.id)}
                style={{ 
                  background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', 
                  opacity: isPinned(currentItem.id) ? 1 : 0.3, transition: 'opacity 0.2s' 
                }}
              >
                {isPinned(currentItem.id) ? '⭐' : '☆'}
              </button>
            </div>
          </div>

          {/* Right Side: Ingredients (Only if revealed) */}
          {showAnswer && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'fadeIn 0.3s ease-in' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                <h3 className="text-sans" style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-primary)' }}>Ingredients</h3>
                <ul style={{ listStylePosition: 'inside', marginBottom: 0, color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.5' }}>
                  {currentItem.ingredients?.map((ing, i) => <li key={i} style={{ marginBottom: '6px' }}>{ing}</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ marginTop: 'var(--spacing-xl)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--glass-border)' }}>
          {!showAnswer ? (
            <div style={{ textAlign: 'center' }}>
              <button className="btn-primary" onClick={handleReveal} style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                Reveal Ingredients
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: '600', marginBottom: 'var(--spacing-md)', textAlign: 'center', color: 'var(--text-primary)' }}>How well did you know it?</p>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-secondary" onClick={() => handleNext(1)} style={{ flex: 1, minWidth: '80px', borderColor: '#ff4d4f', color: '#ff4d4f', padding: '12px' }}>Again</button>
                <button className="btn-secondary" onClick={() => handleNext(3)} style={{ flex: 1, minWidth: '80px', borderColor: '#faad14', color: '#faad14', padding: '12px' }}>Hard</button>
                <button className="btn-secondary" onClick={() => handleNext(4)} style={{ flex: 1, minWidth: '80px', borderColor: '#52c41a', color: '#52c41a', padding: '12px' }}>Good</button>
                <button className="btn-secondary" onClick={() => handleNext(5)} style={{ flex: 1, minWidth: '80px', borderColor: '#1890ff', color: '#1890ff', padding: '12px' }}>Easy</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveRecallDrill;
