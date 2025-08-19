import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Copy, Eye, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Website } from '../types';

interface WebsiteCardProps {
  website: Website;
  onVisit: () => void;
  index?: number;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onVisit, index = 0 }) => {
  const copyToClipboard = (text: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard! 📋');
  };

  const handleExternalClick = () => {
    onVisit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link 
        to={`/website/${website.id}`}
        className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600"
      >
        {website.imageUrl ? (
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
            <motion.img 
              src={website.imageUrl} 
              alt={website.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              whileHover={{ scale: 1.1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
            >
              <Star className="w-4 h-4 text-yellow-500" />
            </motion.div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-30" />
            <motion.span 
              className="text-white text-3xl font-bold z-10 animate-float"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              {website.title.charAt(0)}
            </motion.span>
          </div>
        )}
        
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-3">
            <motion.h3 
              className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2"
              whileHover={{ scale: 1.02 }}
            >
              {website.title}
            </motion.h3>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 leading-relaxed">
            {website.description}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar size={12} />
                <span>{new Date(website.dateAdded).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={12} />
                <span>{website.visitCount} views</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => copyToClipboard(website.url, e)}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                aria-label="Copy URL"
                title="Copy URL"
              >
                <Copy size={14} />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                aria-label="Visit website"
                title="Visit website"
              >
                <ExternalLink size={14} />
              </motion.a>
              
              {website.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={website.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                  aria-label="View GitHub repository"
                  title="View GitHub repository"
                >
                  <Github size={14} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
      to={`/website/${website.id}`}
      className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
    >
      {website.imageUrl ? (
        <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img 
            src={website.imageUrl} 
            alt={website.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-48 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700">
          <span className="text-white text-2xl font-bold">{website.title.charAt(0)}</span>
        </div>
      )}
      
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {website.title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {website.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(website.dateAdded).toLocaleDateString()}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={(e) => copyToClipboard(website.url, e)}
              className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              aria-label="Copy URL"
              title="Copy URL"
            >
              <Copy size={16} />
            </button>
            
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleExternalClick}
              className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
              aria-label="Visit website"
              title="Visit website"
            >
              <ExternalLink size={16} />
            </a>
            
            {website.githubUrl && (
              <a
                href={website.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                aria-label="View GitHub repository"
                title="View GitHub repository"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WebsiteCard;
