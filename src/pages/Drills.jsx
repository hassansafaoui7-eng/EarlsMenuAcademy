import React from 'react';
import { useNavigate } from 'react-router-dom';

function Drills() {
  const navigate = useNavigate();
  
  const drills = [
    { title: 'Active Recall', desc: 'Flashcard-style practice on ingredients and allergies.', icon: '🎴', path: '/drills/active-recall' },
    { title: 'Dinner Rush', desc: 'Pressure-based timed mode. How fast can you recall?', icon: '⏱️', path: '/drills/dinner-rush' },
    { title: 'The Common Thread', desc: 'Find the shared ingredient between 3 different dishes.', icon: '🧩', path: '/drills/common-thread' },
    { title: 'Allergy Minefield', desc: 'Contextual practice for guest safety.', icon: '🛡️', path: '/drills/allergy-minefield' }
  ];

  return (
    <div style={{ padding: 'var(--spacing-md) 0' }}>
      <h1 className="text-serif" style={{ marginBottom: 'var(--spacing-sm)' }}>Training Drills</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
        Select a cognitive drill to sharpen your knowledge.
      </p>

      <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
        {drills.map((drill, idx) => (
          <div key={idx} className="glass-panel" onClick={() => { if(drill.path !== '#') navigate(drill.path); }} style={{
            padding: 'var(--spacing-md)',
            borderLeft: `4px solid var(--earls-accent)`,
            cursor: drill.path !== '#' ? 'pointer' : 'not-allowed',
            opacity: drill.path !== '#' ? 1 : 0.6
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ fontSize: '1.5rem' }}>{drill.icon}</span>
              <h3 className="text-sans" style={{ fontWeight: 600 }}>{drill.title}</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginLeft: 'calc(1.5rem + var(--spacing-sm))' }}>
              {drill.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drills;
