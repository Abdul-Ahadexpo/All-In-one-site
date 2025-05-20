import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 transition-colors duration-200">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} WebShowcase. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span>in 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;