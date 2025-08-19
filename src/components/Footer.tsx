import React from 'react';
import { Heart, Code, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-inner py-8 transition-colors duration-200 border-t border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-sm text-gray-600 dark:text-gray-400 font-medium"
          >
            &copy; {currentYear} WebShowcase. All rights reserved.
          </motion.p>
          
          <div className="flex items-center space-x-6">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 mx-2 text-red-500" />
              </motion.div>
              <span>and</span>
              <Coffee className="w-4 h-4 mx-2 text-amber-600" />
              <span>in 2025</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              <Code className="w-4 h-4 mr-2 text-indigo-500" />
              <span>Built with React & Firebase</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
