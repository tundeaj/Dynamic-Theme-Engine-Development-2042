import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThemeSelector from './ThemeSelector';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const { FiPalette, FiSettings, FiEye, FiHome } = FiIcons;

function Header() {
  const location = useLocation();
  const { userRole } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/preview', label: 'Preview', icon: FiEye },
  ];

  if (userRole === 'admin' || userRole === 'superadmin') {
    navItems.push({ path: '/admin', label: 'Admin', icon: FiSettings });
  }

  return (
    <header className="app-header" role="banner">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <SafeIcon icon={FiPalette} className="logo-icon" />
          <h1 className="logo-text">Theme Engine</h1>
        </Link>

        <nav className="main-nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <SafeIcon icon={item.icon} className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}

export default Header;