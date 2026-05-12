import menuData from './earls_menu_claude_ready.json';
import drinksData from './earls_lwb_claude_ready.json';

// Helper to generate a URL-safe ID from item name
const generateId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// Pre-process data
const processedMenu = menuData.map(item => ({ ...item, type: 'food', id: generateId(item.menu_item_name || '') })).filter(i => i.menu_item_name);
const processedDrinks = drinksData.map(item => ({ ...item, type: 'drink', id: generateId(item.menu_item_name || '') })).filter(i => i.menu_item_name);

export const getAllItems = () => {
  return [...processedMenu, ...processedDrinks];
};

export const getItemById = (id) => {
  return getAllItems().find(item => item.id === id);
};

export const getImageUrl = (item) => {
  if (!item || !item.menu_item_name || item.type === 'drink') return '';
  
  // Clean the name of tags like "Handhelds + Plant-Based" or "(FULL OR HALF)"
  let cleanName = item.menu_item_name.split('Handhelds')[0].split('Mains')[0].split('Sushi')[0].split('Steaks')[0].split('(')[0].trim();
  
  const aliases = {
    'WARM SPINACH + THREE CHEESE DIP': 'WarnSpinach+ThreeCheeseDip',
    'GRILLED CHICKEN CAESAR SALAD': 'GrilledChickenCeasarSalad',
    'KALE + MUSHROOM': 'Kale+MushroomPizza',
    'CRÈME BRÛLÉE CHEESECAKE': 'CremeBruleeCheeseCake',
    'FETA CAPER AIOLI OVEN-ROASTED SALMON': 'FetaCaperAioliOven-RoastedSalmon',
    'CHICKEN HUNAN KUNG PAO': 'ChickenHunanKingPao',
    'QUEEN BEE': 'QueenBeePizza',
    'MARGHERITA': 'MargheritaPizza',
    'BAJA': 'BajaTacos',
    'POLLO': 'PollaTacos',
    'CARNE': 'CarneTacos'
  };

  if (aliases[cleanName]) {
    cleanName = aliases[cleanName];
  } else if (cleanName === 'FETA CAPER AIOLI OVEN-ROASTED SALMON') {
    cleanName = 'FetaCaperAioliOvenRoastedSalmon';
  }

  const filename = cleanName.replace(/\s+/g, '') + '.png';
  return item.type === 'food' ? `/EarlsFoodItemsImages/${filename}` : `/EarlsDrinkItemsImages/${filename}`;
};

export const getDifficulty = (item) => {
  const count = item.ingredients ? item.ingredients.length : 0;
  if (count <= 4) return { level: 'easy', label: '🟢 Easy', color: '#52c41a', count };
  if (count <= 8) return { level: 'medium', label: '🟡 Medium', color: '#faad14', count };
  if (count <= 12) return { level: 'hard', label: '🔴 Hard', color: '#ff4d4f', count };
  return { level: 'master', label: '🔥 Master', color: '#a221ff', count };
};

export const searchItems = (query, filterType = 'all', difficultyFilter = 'all') => {
  let items = getAllItems();
  
  if (filterType !== 'all') {
    items = items.filter(item => item.type === filterType);
  }

  if (difficultyFilter !== 'all') {
    items = items.filter(item => getDifficulty(item).level === difficultyFilter);
  }
  
  if (!query) return items;
  
  const lowerQuery = query.toLowerCase();
  return items.filter(item => {
    const nameMatch = item.menu_item_name?.toLowerCase().includes(lowerQuery);
    const descMatch = item.description?.toLowerCase().includes(lowerQuery);
    const ingMatch = item.ingredients?.some(ing => ing.toLowerCase().includes(lowerQuery));
    const allergenMatch = item.allergens?.some(a => a.toLowerCase().includes(lowerQuery));
    return nameMatch || descMatch || ingMatch || allergenMatch;
  });
};

export const getCategories = () => {
  const items = getAllItems();
  const categories = new Set();
  items.forEach(item => {
    if (item.category) categories.add(item.category);
  });
  return Array.from(categories);
};

export const getItemsByCategory = (category) => {
  return getAllItems().filter(item => item.category === category);
};
