import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Lock, AlertCircle, Shield, Key } from 'lucide-react';

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="inline-block mb-4"
        >
          <Shield className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto" />
        </motion.div>
        <h1 className="text-3xl font-bold gradient-text mb-3">
          Admin Access
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Enter the admin password to access the management dashboard
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-effect rounded-2xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <motion.div 
                className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                whileHover={{ scale: 1.1 }}
              >
                <Key className="h-5 w-5 text-indigo-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`block w-full pl-12 pr-4 py-3 border ${error ? 'border-red-500 animate-pulse' : 'border-gray-300 dark:border-gray-600'} rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg"
              >
                <AlertCircle size={14} className="mr-1" />
                {error}
              </motion.p>
            )}
          </div>
          
          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed animate-pulse' : 'hover:shadow-xl'}`}
            >
              <Lock className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLoginPage;
