import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useWebsites } from '../contexts/WebsitesContext';
import { useAuth } from '../contexts/AuthContext';
import { ExternalLink, Github, ArrowLeft, Edit, Eye, Copy, Calendar } from 'lucide-react';
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
  };
  
  const handleVisit = () => {
    if (id) {
      incrementVisitCount(id);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }
  
  if (!website) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/"
          className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to all websites
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {website.imageUrl && (
          <div className="h-64 sm:h-80 bg-gray-200 dark:bg-gray-700">
            <img 
              src={website.imageUrl} 
              alt={website.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
              {website.title}
            </h1>
            
            {isAdmin && (
              <Link 
                to={`/admin/dashboard?edit=${website.id}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Edit size={16} className="mr-2" />
                Edit
              </Link>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Added on {new Date(website.dateAdded).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-1" />
              <span>{website.visitCount} visits</span>
            </div>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {website.description}
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Links</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-24 flex-shrink-0">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Website</span>
                </div>
                <div className="flex-grow flex items-center">
                  <a 
                    href={website.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={handleVisit}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center truncate max-w-md"
                  >
                    <ExternalLink size={14} className="mr-2 flex-shrink-0" />
                    <span className="truncate">{website.url}</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(website.url)}
                    className="ml-2 p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                    aria-label="Copy URL"
                    title="Copy URL"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              
              {website.githubUrl && (
                <div className="flex items-center">
                  <div className="w-24 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                  </div>
                  <div className="flex-grow flex items-center">
                    <a 
                      href={website.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center truncate max-w-md"
                    >
                      <Github size={14} className="mr-2 flex-shrink-0" />
                      <span className="truncate">{website.githubUrl}</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard(website.githubUrl)}
                      className="ml-2 p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                      aria-label="Copy GitHub URL"
                      title="Copy GitHub URL"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVisit}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <ExternalLink size={18} className="mr-2" />
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;