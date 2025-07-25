import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEye, FiRefreshCw, FiMonitor, FiSmartphone, FiTablet } = FiIcons;

function ThemePreview() {
  const { availableThemes, switchTheme, currentTheme } = useTheme();
  const [previewTheme, setPreviewTheme] = useState(currentTheme);
  const [viewportSize, setViewportSize] = useState('desktop');

  const handlePreview = (themeId) => {
    setPreviewTheme(themeId);
    const theme = availableThemes.find(t => t.id === themeId);
    if (theme) {
      // Temporarily apply theme for preview
      const root = document.documentElement;
      Object.entries(theme.cssVariables || {}).forEach(([key, value]) => {
        root.style.setProperty(`--preview-${key}`, value);
      });
    }
  };

  const applyPreview = async () => {
    await switchTheme(previewTheme);
  };

  const resetPreview = () => {
    setPreviewTheme(currentTheme);
    // Reset preview variables
    const root = document.documentElement;
    const currentThemeData = availableThemes.find(t => t.id === currentTheme);
    if (currentThemeData) {
      Object.entries(currentThemeData.cssVariables || {}).forEach(([key, value]) => {
        root.style.setProperty(`--preview-${key}`, value);
      });
    }
  };

  const getViewportClass = () => {
    switch (viewportSize) {
      case 'mobile': return 'preview-mobile';
      case 'tablet': return 'preview-tablet';
      default: return 'preview-desktop';
    }
  };

  const currentThemeData = availableThemes.find(t => t.id === previewTheme);

  return (
    <div className="theme-preview-container">
      <div className="preview-controls">
        <h3>Theme Preview</h3>
        
        <div className="viewport-controls">
          <button
            onClick={() => setViewportSize('desktop')}
            className={`viewport-btn ${viewportSize === 'desktop' ? 'active' : ''}`}
          >
            <SafeIcon icon={FiMonitor} />
          </button>
          <button
            onClick={() => setViewportSize('tablet')}
            className={`viewport-btn ${viewportSize === 'tablet' ? 'active' : ''}`}
          >
            <SafeIcon icon={FiTablet} />
          </button>
          <button
            onClick={() => setViewportSize('mobile')}
            className={`viewport-btn ${viewportSize === 'mobile' ? 'active' : ''}`}
          >
            <SafeIcon icon={FiSmartphone} />
          </button>
        </div>

        <div className="preview-actions">
          <button onClick={applyPreview} className="apply-btn">
            <SafeIcon icon={FiEye} />
            Apply Theme
          </button>
          <button onClick={resetPreview} className="reset-btn">
            <SafeIcon icon={FiRefreshCw} />
            Reset
          </button>
        </div>
      </div>

      <div className="theme-selector-grid">
        {availableThemes.map((theme) => (
          <motion.button
            key={theme.id}
            onClick={() => handlePreview(theme.id)}
            className={`theme-preview-card ${previewTheme === theme.id ? 'selected' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="theme-color-preview"
              style={{
                background: `linear-gradient(135deg, ${theme.cssVariables['primary-color']}, ${theme.cssVariables['secondary-color']})`
              }}
            />
            <span className="theme-preview-name">{theme.name}</span>
          </motion.button>
        ))}
      </div>

      <div className={`preview-frame ${getViewportClass()}`}>
        <motion.div
          key={previewTheme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="preview-content"
          style={{
            backgroundColor: currentThemeData?.cssVariables['background-color'],
            color: currentThemeData?.cssVariables['text-color']
          }}
        >
          <header className="preview-header" style={{
            backgroundColor: currentThemeData?.cssVariables['primary-color'],
            borderRadius: currentThemeData?.cssVariables['border-radius']
          }}>
            <h1>Sample Application</h1>
            <nav>
              <a href="#" style={{ color: 'white' }}>Home</a>
              <a href="#" style={{ color: 'white' }}>About</a>
              <a href="#" style={{ color: 'white' }}>Contact</a>
            </nav>
          </header>

          <main className="preview-main">
            <section className="preview-card" style={{
              borderRadius: currentThemeData?.cssVariables['border-radius'],
              boxShadow: currentThemeData?.cssVariables['shadow']
            }}>
              <h2>Welcome to {currentThemeData?.name} Theme</h2>
              <p>{currentThemeData?.description}</p>
              
              <button 
                className="preview-button"
                style={{
                  backgroundColor: currentThemeData?.cssVariables['secondary-color'],
                  borderRadius: currentThemeData?.cssVariables['border-radius']
                }}
              >
                Sample Button
              </button>
            </section>

            <section className="preview-grid">
              {[1, 2, 3].map(i => (
                <div 
                  key={i}
                  className="preview-grid-item"
                  style={{
                    borderRadius: currentThemeData?.cssVariables['border-radius'],
                    boxShadow: currentThemeData?.cssVariables['shadow']
                  }}
                >
                  <h3>Card {i}</h3>
                  <p>Sample content for demonstration</p>
                </div>
              ))}
            </section>
          </main>
        </motion.div>
      </div>
    </div>
  );
}

export default ThemePreview;