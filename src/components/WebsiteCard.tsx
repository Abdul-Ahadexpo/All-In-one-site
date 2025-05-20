import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Copy } from 'lucide-react';
import { Website } from '../types';

interface WebsiteCardProps {
  website: Website;
  onVisit: () => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, onVisit }) => {
  const copyToClipboard = (text: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(text);
  };

  const handleExternalClick = () => {
    onVisit();
  };

  return (
    <Link 
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