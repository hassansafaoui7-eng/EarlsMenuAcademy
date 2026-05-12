import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchItems, getImageUrl, getDifficulty } from '../data/menuData';
import { usePinnedItems } from '../context/PinnedItemsContext';

function MenuLibrary() {
  const navigate = useNavigate();
  const { isPinned, togglePin } = usePinnedItems();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return searchItems(query, filterType, difficultyFilter);
  }, [query, filterType, difficultyFilter]);

  return (
    <div style={{ padding: 'var(--spacing-md) 0' }}>
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h1 className="text-serif" style={{ marginBottom: 'var(--spacing-sm)' }}>Menu Library</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Search for any dish, drink, ingredient, or allergen.</p>
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <input 
          type="text" 
          placeholder="Search menu..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--glass-border)',
            background: 'var(--glass-bg)',
            color: 'var(--text-primary)',
            outline: 'none',
            backdropFilter: 'blur(16px)'
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
        {['all', 'food', 'drink'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              flex: 1,
              padding: '10px',
              border: filterType === type ? '1px solid var(--earls-accent)' : '1px solid var(--glass-border)',
              background: filterType === type ? 'var(--earls-primary)' : 'var(--glass-bg)',
              color: filterType === type ? 'var(--text-light)' : 'var(--text-secondary)',
              borderRadius: 'var(--radius-full)',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(16px)'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Difficulty Filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--spacing-lg)', overflowX: 'auto', paddingBottom: '4px' }}>
        {['all', 'easy', 'medium', 'hard', 'master'].map((diff) => {
          let label = 'All Levels';
          if (diff === 'easy') label = '🟢 Easy';
          if (diff === 'medium') label = '🟡 Medium';
          if (diff === 'hard') label = '🔴 Hard';
          if (diff === 'master') label = '🔥 Master';

          return (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              style={{
                padding: '6px 16px',
                border: difficultyFilter === diff ? '1px solid var(--earls-accent)' : '1px solid var(--glass-border)',
                background: difficultyFilter === diff ? 'rgba(156, 121, 66, 0.2)' : 'var(--glass-bg)',
                color: difficultyFilter === diff ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--text-secondary)' }}>
            No matching items found.
          </div>
        ) : (
          filteredItems.map(item => (
            <div 
              key={item.id} 
              className="glass-panel" 
              onClick={() => navigate(`/library/item/${item.id}`)}
              style={{
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '8px', 
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <img 
                  src={getImageUrl(item)} 
                  alt={item.menu_item_name}
                  onError={(e) => { e.target.style.display = 'none'; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 className="text-sans" style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>
                  {item.menu_item_name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {item.category}
                  </span>
                  {(() => {
                    const diff = getDifficulty(item);
                    return (
                      <span style={{ 
                        fontSize: '0.7rem', 
                        color: diff.color, 
                        border: `1px solid ${diff.color}40`, 
                        padding: '2px 6px', 
                        borderRadius: '4px',
                        background: `${diff.color}15`,
                        fontWeight: 'bold'
                      }}>
                        {diff.label} ({diff.count})
                      </span>
                    );
                  })()}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePin(item.id); }}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '1.5rem', 
                    cursor: 'pointer', 
                    opacity: isPinned(item.id) ? 1 : 0.2,
                    marginRight: '8px',
                    transition: 'opacity 0.2s'
                  }}
                >
                  {isPinned(item.id) ? '⭐' : '☆'}
                </button>
                <div style={{ color: 'var(--earls-accent)', fontSize: '1.2rem', paddingRight: '8px' }}>
                  →
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MenuLibrary;
