import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiDollarSign, FiUsers, FiPlus, FiEdit3 } = FiIcons;

function AdminThemeControls() {
  const { 
    userRole, 
    monetizationEnabled, 
    toggleMonetization, 
    availableThemes 
  } = useTheme();
  
  const [activeTab, setActiveTab] = useState('general');
  const [showCreateTheme, setShowCreateTheme] = useState(false);

  if (userRole !== 'admin' && userRole !== 'superadmin') {
    return null;
  }

  const handleMonetizationToggle = async () => {
    try {
      await toggleMonetization();
    } catch (error) {
      console.error('Failed to toggle monetization:', error);
    }
  };

  return (
    <div className="admin-theme-controls">
      <div className="admin-header">
        <h2>Theme Management</h2>
        <SafeIcon icon={FiSettings} className="admin-icon" />
      </div>

      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('general')}
          className={`tab ${activeTab === 'general' ? 'active' : ''}`}
        >
          General Settings
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={`tab ${activeTab === 'themes' ? 'active' : ''}`}
        >
          Theme Library
        </button>
        <button
          onClick={() => setActiveTab('monetization')}
          className={`tab ${activeTab === 'monetization' ? 'active' : ''}`}
        >
          Monetization
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="admin-content"
      >
        {activeTab === 'general' && (
          <div className="general-settings">
            <h3>Global Theme Settings</h3>
            
            <div className="setting-group">
              <label htmlFor="default-theme">Default Theme</label>
              <select id="default-theme" className="admin-select">
                {availableThemes.map(theme => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="setting-group">
              <label htmlFor="allow-user-themes">
                <input 
                  type="checkbox" 
                  id="allow-user-themes" 
                  defaultChecked 
                />
                Allow users to change themes
              </label>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="theme-library">
            <div className="library-header">
              <h3>Available Themes</h3>
              <button 
                onClick={() => setShowCreateTheme(true)}
                className="create-theme-btn"
              >
                <SafeIcon icon={FiPlus} />
                Create Theme
              </button>
            </div>

            <div className="theme-grid">
              {availableThemes.map(theme => (
                <div key={theme.id} className="theme-card">
                  <div 
                    className="theme-preview-large"
                    style={{
                      backgroundColor: theme.cssVariables['primary-color'],
                      borderRadius: theme.cssVariables['border-radius']
                    }}
                  />
                  
                  <div className="theme-card-content">
                    <h4>{theme.name}</h4>
                    <p>{theme.description}</p>
                    
                    <div className="theme-badges">
                      {theme.isPremium && (
                        <span className="badge premium">Premium</span>
                      )}
                      {theme.superAdminOnly && (
                        <span className="badge super-admin">Super Admin</span>
                      )}
                    </div>
                    
                    <button className="edit-theme-btn">
                      <SafeIcon icon={FiEdit3} />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'monetization' && (
          <div className="monetization-settings">
            <h3>Theme Monetization</h3>
            
            <div className="monetization-toggle">
              <div className="toggle-group">
                <label htmlFor="monetization-enabled" className="toggle-label">
                  <SafeIcon icon={FiDollarSign} />
                  Enable Premium Theme Access
                </label>
                <button
                  onClick={handleMonetizationToggle}
                  className={`toggle-switch ${monetizationEnabled ? 'enabled' : ''}`}
                  aria-pressed={monetizationEnabled}
                >
                  <span className="toggle-slider" />
                </button>
              </div>
              <p className="toggle-description">
                When enabled, premium themes require subscription or payment
              </p>
            </div>

            {monetizationEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="monetization-details"
              >
                <h4>Premium Theme Configuration</h4>
                
                <div className="pricing-grid">
                  <div className="pricing-card">
                    <h5>Basic Plan</h5>
                    <p>Access to standard themes</p>
                    <div className="theme-count">3 themes included</div>
                  </div>
                  
                  <div className="pricing-card premium">
                    <h5>Premium Plan</h5>
                    <p>Access to all premium themes</p>
                    <div className="theme-count">All themes included</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default AdminThemeControls;