import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import PreviewPage from './pages/PreviewPage';
import SEOHead from './components/SEOHead';
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="app">
            <SEOHead />
            <Header />
            
            <main className="main-content" role="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/preview" element={<PreviewPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;