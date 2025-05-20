import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { WebsitesProvider } from './contexts/WebsitesContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WebsiteDetailPage from './pages/WebsiteDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WebsitesProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
              <Header />
              <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/website/:id" element={<WebsiteDetailPage />} />
                  <Route path="/admin" element={<AdminLoginPage />} />
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WebsitesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;