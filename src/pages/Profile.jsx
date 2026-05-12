import React, { useMemo } from 'react';

// Progress Bar Component
const CategoryProgress = ({ label, percentage }) => {
  let color = 'var(--earls-accent)'; // Gold default
  if (percentage >= 80) color = '#52c41a'; // Green for high
  else if (percentage < 40) color = '#ff4d4f'; // Red for low

  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{label}</span>
        <span style={{ color: 'var(--text-secondary)' }}>{percentage}%</span>
      </div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          width: `${percentage}%`, 
          background: color,
          borderRadius: '4px',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }} />
      </div>
    </div>
  );
};

// Activity Heatmap Component (Mock Data)
const ActivityHeatmap = () => {
  // Generate 28 days of mock activity
  const days = useMemo(() => {
    const data = [];
    for (let i = 0; i < 28; i++) {
      // Create a fake streak ending recently
      const isActive = i > 4 && i < 25 && Math.random() > 0.2;
      const intensity = isActive ? Math.floor(Math.random() * 3) + 1 : 0; // 0-3
      data.push(intensity);
    }
    return data;
  }, []);

  const getHeatmapColor = (intensity) => {
    switch (intensity) {
      case 1: return 'rgba(82, 196, 26, 0.3)';
      case 2: return 'rgba(82, 196, 26, 0.6)';
      case 3: return 'rgba(82, 196, 26, 1)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center', padding: '12px 0' }}>
      {days.map((intensity, idx) => (
        <div 
          key={idx}
          style={{
            width: '24px', 
            height: '24px',
            borderRadius: '4px',
            background: getHeatmapColor(intensity),
            border: '1px solid rgba(255,255,255,0.05)'
          }}
        />
      ))}
    </div>
  );
};

function Profile() {
  return (
    <div style={{ padding: 'var(--spacing-md) 0', paddingBottom: 'var(--spacing-xl)' }}>
      {/* Header Info */}
      <div className="animate-slide-up" style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ 
          width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--earls-primary)', 
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto var(--spacing-md)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          EJ
        </div>
        <h1 className="text-serif" style={{ margin: 0, fontSize: '2rem' }}>Earls Jedi</h1>
        <p style={{ color: 'var(--earls-accent)', fontWeight: 'bold', marginTop: '4px' }}>Level 30 • Senior Server</p>
      </div>

      {/* Strengths & Weaknesses Radar */}
      <div className="glass-panel animate-slide-up delay-100" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
          <span style={{ fontSize: '1.25rem' }}>📊</span>
          <h3 className="text-serif" style={{ margin: 0 }}>Strengths & Weaknesses</h3>
        </div>
        
        <CategoryProgress label="Steaks & Mains" percentage={92} />
        <CategoryProgress label="Starters & Shareables" percentage={85} />
        <CategoryProgress label="Salads & Bowls" percentage={60} />
        <CategoryProgress label="Cocktails" percentage={30} />
        <CategoryProgress label="Wine Selection" percentage={15} />

        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)', fontStyle: 'italic' }}>
          * Recommendation: Focus your next 3 training sessions on Wine Selection.
        </p>
      </div>

      {/* Activity Heatmap */}
      <div className="glass-panel animate-slide-up delay-200" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>🔥</span>
            <h3 className="text-serif" style={{ margin: 0 }}>Training Consistency</h3>
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Last 28 Days</span>
        </div>
        
        <ActivityHeatmap />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          <span>Current Streak: <strong>5 Days</strong></span>
          <span>Longest: <strong>14 Days</strong></span>
        </div>
      </div>

      {/* Settings Placeholder */}
      <div className="glass-panel animate-slide-up delay-300" style={{ padding: 'var(--spacing-md)' }}>
        <h3 className="text-sans" style={{ marginBottom: 'var(--spacing-sm)' }}>Account Settings</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Supabase authentication will be integrated here in a future update to sync your progress across devices.
        </p>
      </div>
    </div>
  );
}

export default Profile;
