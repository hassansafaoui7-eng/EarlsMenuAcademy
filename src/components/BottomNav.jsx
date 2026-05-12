import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Brain, User } from 'lucide-react';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      
      <NavLink to="/library" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <BookOpen size={24} />
        <span>Library</span>
      </NavLink>
      
      <NavLink to="/drills" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Brain size={24} />
        <span>Drills</span>
      </NavLink>
      
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
