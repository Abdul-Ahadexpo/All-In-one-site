import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, logout } = useAuth();
  const location = useLocation();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">WebShowcase</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAdmin && !location.pathname.includes('/admin/dashboard') && (
            <Link 
              to="/admin/dashboard" 
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
            >
              Admin Dashboard
            </Link>
          )}
          
          {isAdmin && (
            <button 
              onClick={logout}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
            >
              Logout
            </button>
          )}
          
          {!isAdmin && !location.pathname.includes('/admin') && (
            <Link 
              to="/admin"
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition"
            >
              Admin
            </Link>
          )}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;