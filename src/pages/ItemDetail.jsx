import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, getImageUrl } from '../data/menuData';
import { usePinnedItems } from '../context/PinnedItemsContext';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id);
  const { isPinned, togglePin } = usePinnedItems();

  if (!item) {
    return (
      <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
        <h2 className="text-serif" style={{ color: 'var(--text-primary)' }}>Item Not Found</h2>
        <button className="btn-primary" onClick={() => navigate('/library')} style={{ marginTop: 'var(--spacing-md)' }}>
          Back to Library
        </button>
      </div>
    );
  }

  const imageUrl = getImageUrl(item);

  return (
    <div style={{ padding: 'var(--spacing-md) 0' }}>
      <button 
        onClick={() => navigate('/library')} 
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--earls-accent)', 
          cursor: 'pointer',
          marginBottom: 'var(--spacing-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontWeight: 'bold'
        }}
      >
        ← Back to Library
      </button>

      <div className="glass-panel" style={{ padding: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          {/* Square Thumbnail */}
          <div style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: 'var(--radius-md)', 
            overflow: 'hidden',
            flexShrink: 0,
            border: '1px solid var(--glass-border)',
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}>
            <img 
              src={imageUrl} 
              alt={item.menu_item_name}
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          <div style={{ flex: 1 }}>
            <span style={{ 
              backgroundColor: 'var(--earls-primary)', 
              color: 'white', 
              padding: '4px 8px', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {item.type}
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 'var(--spacing-xs)', marginBottom: 'var(--spacing-xs)' }}>
              <h1 className="text-serif" style={{ fontSize: '2rem', margin: 0 }}>
                {item.menu_item_name}
              </h1>
              <button 
                onClick={() => togglePin(item.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '2rem', 
                  cursor: 'pointer', 
                  opacity: isPinned(item.id) ? 1 : 0.3,
                  transition: 'opacity 0.2s',
                  padding: '0 8px'
                }}
                title={isPinned(item.id) ? "Unpin item" : "Pin for pre-shift review"}
              >
                {isPinned(item.id) ? '⭐' : '☆'}
              </button>
            </div>
            <p style={{ color: 'var(--earls-accent)', fontWeight: 'bold' }}>{item.category}</p>
          </div>
        </div>

        {item.description && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="text-sans" style={{ marginBottom: 'var(--spacing-xs)' }}>Description</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
          </div>
        )}

        {item.ingredients && item.ingredients.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="text-sans" style={{ marginBottom: 'var(--spacing-xs)' }}>Ingredients</h3>
            <ul style={{ paddingLeft: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
              {item.ingredients.map((ing, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{ing}</li>
              ))}
            </ul>
          </div>
        )}

        {item.allergens && item.allergens.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 className="text-sans" style={{ marginBottom: 'var(--spacing-xs)', color: '#ff4d4f' }}>Allergen Warnings</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {item.allergens.map((allergen, idx) => (
                <span key={idx} style={{
                  backgroundColor: 'rgba(255, 77, 79, 0.1)',
                  color: '#ff4d4f',
                  border: '1px solid rgba(255, 77, 79, 0.3)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemDetail;
