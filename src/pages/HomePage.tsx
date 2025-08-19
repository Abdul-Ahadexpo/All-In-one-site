import React from 'react';
import { motion } from 'framer-motion';
import { useWebsites } from '../contexts/WebsitesContext';
import WebsiteCard from '../components/WebsiteCard';
import SearchSortBar from '../components/SearchSortBar';
import { Loader, Sparkles, TrendingUp, Globe } from 'lucide-react';

const HomePage: React.FC = () => {
  const { 
    filteredWebsites, 
    loading, 
    error, 
    searchQuery, 
    searchWebsites, 
    sortOption, 
    sortWebsites,
    incrementVisitCount
  } = useWebsites();
  
  const handleVisit = (id: string) => {
    incrementVisitCount(id);
  };
  
  return (
    <div>
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative inline-block"
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4 relative">
            Website Showcase
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Discover and explore a curated collection of amazing websites. Browse through our showcase,
          search for specific sites, or sort by different criteria to find your next inspiration.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center items-center space-x-8 mt-8"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Globe className="w-4 h-4" />
            <span>{filteredWebsites.length} websites</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Updated daily</span>
          </div>
        </motion.div>
      </motion.section>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <SearchSortBar
          searchQuery={searchQuery}
          onSearchChange={searchWebsites}
          sortOption={sortOption}
          onSortChange={sortWebsites}
        />
      </motion.div>
      
      {loading ? (
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
          <p className="text-gray-600 dark:text-gray-400">Loading amazing websites...</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-6 rounded-2xl mb-6 border border-red-200 dark:border-red-800"
        >
          <p>{error}</p>
        </motion.div>
      ) : filteredWebsites.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No websites found</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try a different search term or browse all websites.` 
              : "No websites have been added yet. Check back soon for amazing discoveries!"}
          </p>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredWebsites.map((website) => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              index={index}
              onVisit={() => handleVisit(website.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
