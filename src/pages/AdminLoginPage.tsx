import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, AlertCircle } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    
    setIsSubmitting(true);
    const success = login(password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Login
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enter the admin password to access the dashboard
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {error}
              </p>
            )}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;