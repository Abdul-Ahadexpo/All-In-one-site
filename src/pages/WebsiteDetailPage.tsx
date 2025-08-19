import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useWebsites } from '../contexts/WebsitesContext';
import { useAuth } from '../contexts/AuthContext';
import { ExternalLink, Github, ArrowLeft, Edit, Eye, Copy, Calendar, Share2, Bookmark } from 'lucide-react';
import { Loader } from 'lucide-react';

const WebsiteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getWebsiteById, incrementVisitCount, loading } = useWebsites();
  const { isAdmin } = useAuth();
  
  const website = id ? getWebsiteById(id) : undefined;
  
  useEffect(() => {
    // If website not found, redirect to home
    if (!loading && !website && id) {
      navigate('/');
    }
  }, [website, navigate, loading, id]);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard! 📋');
  };
  
  const shareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: website.title,
        text: website.description,
        url: window.location.href,
      });
    } else {
      copyToClipboard(window.location.href);
    }
  };
  
  const handleVisit = () => {
    if (id) {
      incrementVisitCount(id);
    }
  };
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center h-64"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader className="w-12 h-12 text-indigo-500 mb-4" />
        </motion.div>
        <p className="text-gray-600 dark:text-gray-400">Loading website details...</p>
      </motion.div>
    );
  }
  
  if (!website) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to showcase
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
      >
        {website.imageUrl && (
          <div className="h-64 sm:h-96 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={website.imageUrl} 
              alt={website.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )}
        
        <div className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold gradient-text mb-4 sm:mb-0"
            >
              {website.title}
            </motion.h1>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareWebsite}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-transparent rounded-xl shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
              >
                <Share2 size={16} className="mr-2" />
                Share
              </motion.button>
              
              {isAdmin && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={`/admin/dashboard?edit=${website.id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-xl shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-full">
              <Calendar size={16} className="mr-1" />
              <span>Added on {new Date(website.dateAdded).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-full">
              <Eye size={16} className="mr-1" />
              <span>{website.visitCount} unique views</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="prose dark:prose-invert max-w-none mb-10"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {website.description}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Access</h2>
            
            <div className="space-y-6">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                <div className="w-20 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</span>
                </div>
                <div className="flex-grow flex items-center">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    href={website.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleVisit}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center truncate max-w-md font-medium"
                  >
                    <ExternalLink size={14} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{website.url}</span>
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(website.url)}
                    className="ml-3 p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    aria-label="Copy URL"
                    title="Copy URL"
                  >
                    <Copy size={14} />
                  </motion.button>
                </div>
              </div>
              
              {website.githubUrl && (
                <div className="flex items-center bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                  <div className="w-20 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                  </div>
                  <div className="flex-grow flex items-center">
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href={website.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center truncate max-w-md font-medium"
                    >
                      <Github size={14} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{website.githubUrl}</span>
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(website.githubUrl)}
                      className="ml-3 p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      aria-label="Copy GitHub URL"
                      title="Copy GitHub URL"
                    >
                      <Copy size={14} />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex justify-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVisit}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border border-transparent rounded-2xl shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 animate-glow"
            >
              <ExternalLink size={18} className="mr-2" />
              Visit Website
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WebsiteDetailPage;
