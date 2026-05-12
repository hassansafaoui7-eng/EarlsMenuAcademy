import React, { createContext, useState, useEffect, useContext } from 'react';

const PinnedItemsContext = createContext();

export const usePinnedItems = () => useContext(PinnedItemsContext);

export const PinnedItemsProvider = ({ children }) => {
  const [pinnedItems, setPinnedItems] = useState(() => {
    const saved = localStorage.getItem('earls_pinned_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('earls_pinned_items', JSON.stringify(pinnedItems));
  }, [pinnedItems]);

  const togglePin = (id) => {
    setPinnedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isPinned = (id) => pinnedItems.includes(id);

  return (
    <PinnedItemsContext.Provider value={{ pinnedItems, togglePin, isPinned }}>
      {children}
    </PinnedItemsContext.Provider>
  );
};
