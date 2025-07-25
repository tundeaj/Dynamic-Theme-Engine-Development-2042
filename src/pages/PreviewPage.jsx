import React from 'react';
import { motion } from 'framer-motion';
import ThemePreview from '../components/ThemePreview';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEye } = FiIcons;

function PreviewPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="preview-page"
    >
      <div className="preview-header-section">
        <SafeIcon icon={FiEye} className="preview-page-icon" />
        <div>
          <h1>Theme Preview</h1>
          <p>Test different themes and see how they look across devices</p>
        </div>
      </div>

      <ThemePreview />
    </motion.div>
  );
}

export default PreviewPage;