import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ref, onValue, push, set, update, remove, increment } from 'firebase/database';
import { database } from '../services/firebase';
import { Website, SortOption, WebsiteFormData } from '../types';

interface WebsitesContextProps {
  websites: Website[];
  loading: boolean;
  error: string | null;
  addWebsite: (websiteData: WebsiteFormData) => Promise<string>;
  updateWebsite: (id: string, websiteData: Partial<WebsiteFormData>) => Promise<void>;
  deleteWebsite: (id: string) => Promise<void>;
  incrementVisitCount: (id: string) => Promise<void>;
  getWebsiteById: (id: string) => Website | undefined;
  sortWebsites: (option: SortOption) => void;
  searchWebsites: (query: string) => void;
  sortOption: SortOption;
  searchQuery: string;
  filteredWebsites: Website[];
}

const WebsitesContext = createContext<WebsitesContextProps | undefined>(undefined);

export const WebsitesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredWebsites, setFilteredWebsites] = useState<Website[]>([]);

  // Fetch websites from Firebase
  useEffect(() => {
    const websitesRef = ref(database, 'websites');
    
    setLoading(true);
    const unsubscribe = onValue(websitesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const websitesList: Website[] = [];
        
        if (data) {
          Object.keys(data).forEach((key) => {
            websitesList.push({ id: key, ...data[key] });
          });
        }
        
        setWebsites(websitesList);
        setLoading(false);
      } catch (err) {
        setError('Failed to load websites');
        setLoading(false);
        console.error('Error fetching websites:', err);
      }
    }, (err) => {
      setError('Failed to load websites');
      setLoading(false);
      console.error('Error in onValue:', err);
    });

    return () => unsubscribe();
  }, []);

  // Apply sorting and filtering
  useEffect(() => {
    let results = [...websites];
    
    // Apply sorting
    switch (sortOption) {
      case 'recent':
        results.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'alphabetical':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'mostVisited':
        results.sort((a, b) => b.visitCount - a.visitCount);
        break;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(website => 
        website.title.toLowerCase().includes(query) || 
        website.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredWebsites(results);
  }, [websites, sortOption, searchQuery]);

  // Add a new website
  const addWebsite = async (websiteData: WebsiteFormData): Promise<string> => {
    try {
      const websitesRef = ref(database, 'websites');
      const newWebsiteRef = push(websitesRef);
      
      const newWebsite = {
        ...websiteData,
        dateAdded: new Date().toISOString(),
        visitCount: 0
      };
      
      await set(newWebsiteRef, newWebsite);
      return newWebsiteRef.key || '';
    } catch (err) {
      console.error('Error adding website:', err);
      throw new Error('Failed to add website');
    }
  };

  // Update an existing website
  const updateWebsite = async (id: string, websiteData: Partial<WebsiteFormData>): Promise<void> => {
    try {
      const websiteRef = ref(database, `websites/${id}`);
      await update(websiteRef, websiteData);
    } catch (err) {
      console.error('Error updating website:', err);
      throw new Error('Failed to update website');
    }
  };

  // Delete a website
  const deleteWebsite = async (id: string): Promise<void> => {
    try {
      const websiteRef = ref(database, `websites/${id}`);
      await remove(websiteRef);
    } catch (err) {
      console.error('Error deleting website:', err);
      throw new Error('Failed to delete website');
    }
  };

  // Increment visit count
  const incrementVisitCount = async (id: string): Promise<void> => {
    try {
      const websiteRef = ref(database, `websites/${id}/visitCount`);
      await update(websiteRef, increment(1));
    } catch (err) {
      console.error('Error incrementing visit count:', err);
    }
  };

  // Get a website by ID
  const getWebsiteById = (id: string): Website | undefined => {
    return websites.find(website => website.id === id);
  };

  // Sort websites
  const sortWebsites = (option: SortOption): void => {
    setSortOption(option);
  };

  // Search websites
  const searchWebsites = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <WebsitesContext.Provider value={{
      websites,
      loading,
      error,
      addWebsite,
      updateWebsite,
      deleteWebsite,
      incrementVisitCount,
      getWebsiteById,
      sortWebsites,
      searchWebsites,
      sortOption,
      searchQuery,
      filteredWebsites
    }}>
      {children}
    </WebsitesContext.Provider>
  );
};

export const useWebsites = (): WebsitesContextProps => {
  const context = useContext(WebsitesContext);
  if (context === undefined) {
    throw new Error('useWebsites must be used within a WebsitesProvider');
  }
  return context;
};