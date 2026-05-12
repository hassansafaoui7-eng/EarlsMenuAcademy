import React from 'react';

function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-md)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      boxShadow: 'var(--shadow-md)'
    }}>
      <img 
        src="/EarlsLogo.png" 
        alt="Earls Kitchen + Bar" 
        style={{ height: '24px', objectFit: 'contain' }}
      />
    </header>
  );
}

export default Header;
