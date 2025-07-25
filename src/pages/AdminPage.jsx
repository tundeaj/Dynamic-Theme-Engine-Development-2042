import React from 'react';
import { motion } from 'framer-motion';
import AdminThemeControls from '../components/AdminThemeControls';
import { useTheme } from '../contexts/ThemeContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiAlertTriangle } = FiIcons;

function AdminPage() {
  const { userRole } = useTheme();

  if (userRole !== 'admin' && userRole !== 'superadmin') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="access-denied"
      >
        <SafeIcon icon={FiAlertTriangle} className="access-denied-icon" />
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="admin-page"
    >
      <div className="admin-header-section">
        <SafeIcon icon={FiShield} className="admin-page-icon" />
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage themes, monetization, and user access controls</p>
        </div>
      </div>

      <AdminThemeControls />
    </motion.div>
  );
}

export default AdminPage;