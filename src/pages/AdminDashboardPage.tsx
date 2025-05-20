import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWebsites } from '../contexts/WebsitesContext';
import WebsiteForm from '../components/WebsiteForm';
import { Plus, Edit, Trash2, X, ExternalLink, AlertTriangle, Loader } from 'lucide-react';
import { Website, WebsiteFormData } from '../types';

const AdminDashboardPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | undefined>(undefined);
  const [deletingWebsite, setDeletingWebsite] = useState<Website | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { isAdmin } = useAuth();
  const { websites, loading, addWebsite, updateWebsite, deleteWebsite } = useWebsites();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Redirect if not logged in
    if (!isAdmin) {
      navigate('/admin');
    }
    
    // Check for edit query parameter
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
    
    if (editId) {
      const websiteToEdit = websites.find(w => w.id === editId);
      if (websiteToEdit) {
        setEditingWebsite(websiteToEdit);
      }
      // Remove the query parameter
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdmin, navigate, location.search, websites]);
  
  const handleAddSubmit = async (data: WebsiteFormData) => {
    try {
      await addWebsite(data);
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding website:', error);
    }
  };
  
  const handleEditSubmit = async (data: WebsiteFormData) => {
    if (!editingWebsite) return;
    
    try {
      await updateWebsite(editingWebsite.id, data);
      setEditingWebsite(undefined);
    } catch (error) {
      console.error('Error updating website:', error);
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!deletingWebsite) return;
    
    setIsDeleting(true);
    try {
      await deleteWebsite(deletingWebsite.id);
    } catch (error) {
      console.error('Error deleting website:', error);
    } finally {
      setDeletingWebsite(undefined);
      setIsDeleting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage websites in your showcase collection
          </p>
        </div>
        
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          Add Website
        </button>
      </div>
      
      {isAdding && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Add New Website
            </h2>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <WebsiteForm 
            onSubmit={handleAddSubmit} 
            onCancel={() => setIsAdding(false)} 
          />
        </div>
      )}
      
      {editingWebsite && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Edit Website
            </h2>
            <button
              onClick={() => setEditingWebsite(undefined)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <WebsiteForm 
            initialData={editingWebsite}
            onSubmit={handleEditSubmit} 
            onCancel={() => setEditingWebsite(undefined)} 
          />
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {deletingWebsite && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6">
              <div className="flex items-center justify-center text-amber-500 mb-4">
                <AlertTriangle size={36} />
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  Delete website
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete "{deletingWebsite.title}"? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteConfirm}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm ${isDeleting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setDeletingWebsite(undefined)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Websites list */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Websites ({websites.length})
          </h2>
        </div>
        
        {websites.length === 0 ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No websites have been added yet.</p>
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus size={16} className="mr-2" />
              Add your first website
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    URL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Visits
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {websites.map((website) => (
                  <tr key={website.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {website.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400">
                        <a 
                          href={website.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 truncate max-w-[200px]"
                        >
                          <ExternalLink size={14} className="mr-1 flex-shrink-0" />
                          <span className="truncate">{website.url}</span>
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(website.dateAdded).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {website.visitCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingWebsite(website)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                          aria-label="Edit website"
                          title="Edit website"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setDeletingWebsite(website)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                          aria-label="Delete website"
                          title="Delete website"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;