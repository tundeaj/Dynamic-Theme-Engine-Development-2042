import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPalette, FiChevronDown, FiLock, FiCrown, FiCheck } = FiIcons;

function ThemeSelector() {
  const { 
    currentTheme, 
    availableThemes, 
    switchTheme, 
    userRole, 
    isPremiumUser, 
    monetizationEnabled,
    canUserAccessTheme,
    loading 
  } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const handleThemeChange = async (themeId) => {
    try {
      setError('');
      await switchTheme(themeId);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const getThemeIcon = (theme) => {
    if (theme.superAdminOnly) return FiCrown;
    if (theme.isPremium && monetizationEnabled) return FiLock;
    return FiCheck;
  };

  const isThemeAccessible = (theme) => {
    if (!canUserAccessTheme(theme, userRole)) return false;
    if (theme.isPremium && monetizationEnabled && !isPremiumUser) return false;
    return true;
  };

  if (loading) {
    return (
      <div className="theme-selector loading">
        <SafeIcon icon={FiPalette} className="animate-spin" />
      </div>
    );
  }

  const currentThemeData = availableThemes.find(t => t.id === currentTheme);

  return (
    <div className="theme-selector-container">
      <div className="theme-selector">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="theme-selector-trigger"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <SafeIcon icon={FiPalette} className="theme-icon" />
          <span className="theme-name">
            {currentThemeData?.name || 'Select Theme'}
          </span>
          <SafeIcon 
            icon={FiChevronDown} 
            className={`chevron ${isOpen ? 'rotated' : ''}`} 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="theme-dropdown"
              role="listbox"
            >
              {availableThemes.map((theme) => {
                const accessible = isThemeAccessible(theme);
                const IconComponent = getThemeIcon(theme);
                
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => accessible && handleThemeChange(theme.id)}
                    className={`theme-option ${!accessible ? 'disabled' : ''} ${
                      theme.id === currentTheme ? 'active' : ''
                    }`}
                    disabled={!accessible}
                    whileHover={accessible ? { backgroundColor: 'var(--hover-color)' } : {}}
                    role="option"
                    aria-selected={theme.id === currentTheme}
                  >
                    <div className="theme-preview" style={{
                      backgroundColor: theme.cssVariables['primary-color'],
                      borderRadius: theme.cssVariables['border-radius']
                    }} />
                    
                    <div className="theme-info">
                      <div className="theme-header">
                        <span className="theme-title">{theme.name}</span>
                        <SafeIcon icon={IconComponent} className="theme-status-icon" />
                      </div>
                      <span className="theme-description">{theme.description}</span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="theme-error"
          role="alert"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

export default ThemeSelector;