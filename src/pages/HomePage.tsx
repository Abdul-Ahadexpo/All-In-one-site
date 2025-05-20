import React from 'react';
import { useWebsites } from '../contexts/WebsitesContext';
import WebsiteCard from '../components/WebsiteCard';
import SearchSortBar from '../components/SearchSortBar';
import { Loader } from 'lucide-react';

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
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Website Showcase
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Discover and explore a curated collection of interesting websites. Browse by categories,
          search for specific sites, or sort by different criteria.
        </p>
      </section>
      
      <SearchSortBar
        searchQuery={searchQuery}
        onSearchChange={searchWebsites}
        sortOption={sortOption}
        onSortChange={sortWebsites}
      />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      ) : filteredWebsites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No websites found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try a different search term.` 
              : "No websites have been added yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <WebsiteCard 
              key={website.id} 
              website={website} 
              onVisit={() => handleVisit(website.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;