import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPalette, FiSettings, FiEye, FiDollarSign, FiUsers, FiZap } = FiIcons;

function HomePage() {
  const { userRole, monetizationEnabled, availableThemes } = useTheme();

  const features = [
    {
      icon: FiPalette,
      title: 'Dynamic Themes',
      description: 'Switch between beautiful themes instantly with no page reload required'
    },
    {
      icon: FiUsers,
      title: 'Role-Based Access',
      description: 'Control theme access based on user roles and subscription levels'
    },
    {
      icon: FiDollarSign,
      title: 'Monetization Ready',
      description: 'Lock premium themes behind subscription tiers with Stripe integration'
    },
    {
      icon: FiZap,
      title: 'SEO Optimized',
      description: 'All themes maintain perfect SEO with semantic HTML and accessibility'
    }
  ];

  return (
    <div className="home-page">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hero-section"
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Dynamic Theme Engine
          </h1>
          <p className="hero-subtitle">
            Professional theme management with role-based controls, 
            monetization hooks, and SEO optimization built-in.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{availableThemes.length}</span>
              <span className="stat-label">Available Themes</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userRole}</span>
              <span className="stat-label">Your Role</span>
            </div>
            <div className="stat">
              <span className="stat-number">{monetizationEnabled ? 'ON' : 'OFF'}</span>
              <span className="stat-label">Monetization</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/preview" className="cta-button primary">
              <SafeIcon icon={FiEye} />
              Preview Themes
            </Link>
            {(userRole === 'admin' || userRole === 'superadmin') && (
              <Link to="/admin" className="cta-button secondary">
                <SafeIcon icon={FiSettings} />
                Admin Panel
              </Link>
            )}
          </div>
        </div>
      </motion.section>

      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Powerful Features</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <SafeIcon icon={feature.icon} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="demo-section">
        <div className="demo-container">
          <h2 className="demo-title">Test Prompts</h2>
          <p className="demo-subtitle">Try these commands with Greta:</p>
          
          <div className="prompt-grid">
            <div className="prompt-card">
              <code>"Preview Minimalist Theme for TeamMate.com"</code>
            </div>
            <div className="prompt-card">
              <code>"Assign Glow Theme to WebinarFlix Premium Tier"</code>
            </div>
            <div className="prompt-card">
              <code>"Enable SEO-safe Neumorphic Mode on MrFixit.ng"</code>
            </div>
            <div className="prompt-card">
              <code>"Toggle monetization on for theme switching"</code>
            </div>
            <div className="prompt-card">
              <code>"Reset theme to ContractAI Default"</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;