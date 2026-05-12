import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePinnedItems } from '../context/PinnedItemsContext';
import { getAllItems, getImageUrl } from '../data/menuData';

// SVG Circular Progress Component
const MasteryRing = ({ percentage, color = "var(--earls-accent)" }) => {
  return (
    <div style={{ position: 'relative', width: '80px', height: '80px' }}>
      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <path
          className="animate-progress-ring"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="0, 100"
          style={{ '--progress': percentage, strokeLinecap: 'round' }}
        />
      </svg>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <span className="text-serif" style={{ fontSize: '1.25rem', color: 'var(--text-primary)', lineHeight: 1 }}>{percentage}%</span>
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const { pinnedItems } = usePinnedItems();
  const [greeting, setGreeting] = useState("Welcome back.");
  const [bgImage, setBgImage] = useState("/homepage-hero.jpg");

  // Mock data for weak items carousel
  const weakItems = getAllItems().filter(i => i.type === 'food' && i.ingredients && i.ingredients.length >= 8).slice(0, 5);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) {
      setGreeting("Morning prep.");
      // If we had a brunch image we'd set it here, keeping hero for now
      setBgImage("/homepage-hero.jpg");
    } else if (hour < 16) {
      setGreeting("Lunch rush.");
      setBgImage("/homepage-hero.jpg");
    } else {
      setGreeting("Ready for the rush?");
      setBgImage("/homepage-hero.jpg"); // Ideally a dark dining room or cocktail
    }
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100%', paddingBottom: 'var(--spacing-xl)' }}>
      {/* Hero Background Image */}
      <div style={{
        position: 'absolute',
        top: '-16px', 
        left: '-16px', 
        right: '-16px',
        height: '480px',
        backgroundImage: `url("${bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        transition: 'background-image 1s ease-in-out'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0, 26, 38, 0.4) 0%, rgba(10, 10, 10, 0.95) 80%, var(--bg-primary) 100%)',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--spacing-xl)' }}>
        
        {/* Welcome Text */}
        <div className="animate-slide-up" style={{ marginBottom: '48px', marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="text-serif" style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-sm)', textShadow: '0 4px 16px rgba(0,0,0,0.9)', color: 'white', lineHeight: '1.1' }}>
            {greeting}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textShadow: '0 2px 6px rgba(0,0,0,0.9)', maxWidth: '340px', lineHeight: '1.4' }}>
            Shift readiness is at 88%. Let's close the gaps before service.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="animate-slide-up delay-100" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)' }}>
          {/* Shift Readiness */}
          <div className="glass-panel" style={{ padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Shift Readiness</p>
            <MasteryRing percentage={88} color="#52c41a" />
            <p style={{ fontSize: '0.75rem', color: '#52c41a', marginTop: 'var(--spacing-sm)' }}>+2% this week</p>
          </div>

          {/* Menu Mastery */}
          <div className="glass-panel" style={{ padding: 'var(--spacing-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-sm)' }}>Menu Mastery</p>
            <MasteryRing percentage={35} color="var(--earls-accent)" />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 'var(--spacing-sm)' }}>42 / 120 items</p>
          </div>
        </div>

        {/* Daily Review Call to Action */}
        <div className="glass-panel animate-slide-up delay-200" style={{ 
          padding: 'var(--spacing-lg)', 
          marginBottom: 'var(--spacing-xl)',
          borderLeft: '4px solid var(--earls-accent)',
          background: 'rgba(20, 25, 30, 0.7)',
          backdropFilter: 'blur(24px)'
        }}>
          <h2 className="text-serif" style={{ color: 'white', fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)' }}>Daily Review</h2>
          <p style={{ margin: '0 0 var(--spacing-md) 0', color: 'var(--text-secondary)' }}>15 items due for spaced repetition today.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="btn-primary" onClick={() => navigate('/drills/active-recall')} style={{ width: '100%', padding: '16px' }}>
              Start Flashcards
            </button>
            {pinnedItems.length > 0 && (
              <button 
                onClick={() => navigate('/drills/active-recall?mode=pinned')} 
                style={{ 
                  width: '100%', padding: '16px', background: 'rgba(156, 121, 66, 0.1)',
                  border: '1px solid var(--earls-accent)', color: 'var(--earls-accent)',
                  borderRadius: 'var(--radius-md)', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                ⭐ Pre-Shift Review ({pinnedItems.length} Pinned)
              </button>
            )}
          </div>
        </div>

        {/* Focus Areas Carousel */}
        <div className="animate-slide-up delay-300" style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h3 className="text-serif" style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem' }}>Focus Areas</h3>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', overflowX: 'auto', paddingBottom: 'var(--spacing-sm)' }}>
            {weakItems.map(item => (
              <div key={item.id} className="glass-panel" onClick={() => navigate(`/library/item/${item.id}`)} style={{ 
                minWidth: '140px', padding: 'var(--spacing-sm)', cursor: 'pointer', textAlign: 'center'
              }}>
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '8px' }}>
                  <img src={getImageUrl(item)} alt={item.menu_item_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontSize: '0.8rem', fontWeight: 'bold', lineHeight: 1.2 }}>{item.menu_item_name}</p>
                <p style={{ fontSize: '0.7rem', color: '#ff4d4f', marginTop: '4px' }}>Struggling</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Training Tabs */}
        <div className="animate-slide-up delay-400">
          <h3 className="text-serif" style={{ marginBottom: 'var(--spacing-md)', fontSize: '1.5rem' }}>Quick Training</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <div 
              className="glass-panel" 
              onClick={() => navigate('/drills/active-recall')}
              style={{ padding: 'var(--spacing-md)', cursor: 'pointer', borderTop: '2px solid var(--earls-accent)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🧠</div>
              <h4 className="text-serif" style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Flashcards</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Active Recall</p>
            </div>
            
            <div 
              className="glass-panel" 
              onClick={() => navigate('/drills/dinner-rush')}
              style={{ padding: 'var(--spacing-md)', cursor: 'pointer', borderTop: '2px solid #ff4d4f', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.2s' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔥</div>
              <h4 className="text-serif" style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>Dinner Rush</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Timed Typing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
