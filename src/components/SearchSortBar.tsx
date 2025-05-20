import React from 'react';
import { Search, SortAsc, Calendar, Globe } from 'lucide-react';
import { SortOption } from '../types';

interface SearchSortBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
}

const SearchSortBar: React.FC<SearchSortBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  sortOption, 
  onSortChange 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            placeholder="Search websites..."
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => onSortChange('recent')}
              className={`px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 first:rounded-l-md last:rounded-r-md ${
                sortOption === 'recent'
                  ? 'bg-indigo-500 text-white border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
              aria-label="Sort by date added"
            >
              <div className="flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>Recent</span>
              </div>
            </button>
            <button
              onClick={() => onSortChange('alphabetical')}
              className={`px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 first:rounded-l-md last:rounded-r-md ${
                sortOption === 'alphabetical'
                  ? 'bg-indigo-500 text-white border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
              aria-label="Sort alphabetically"
            >
              <div className="flex items-center">
                <SortAsc size={16} className="mr-1" />
                <span>A-Z</span>
              </div>
            </button>
            <button
              onClick={() => onSortChange('mostVisited')}
              className={`px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 first:rounded-l-md last:rounded-r-md ${
                sortOption === 'mostVisited'
                  ? 'bg-indigo-500 text-white border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
              aria-label="Sort by most visited"
            >
              <div className="flex items-center">
                <Globe size={16} className="mr-1" />
                <span>Popular</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSortBar;