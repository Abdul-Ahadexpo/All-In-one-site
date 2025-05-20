import React, { useState, useEffect } from 'react';
import { WebsiteFormData, Website } from '../types';
import { AlertCircle } from 'lucide-react';

interface WebsiteFormProps {
  initialData?: Website;
  onSubmit: (data: WebsiteFormData) => Promise<void>;
  onCancel: () => void;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<WebsiteFormData>({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
    githubUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        url: initialData.url,
        imageUrl: initialData.imageUrl || '',
        githubUrl: initialData.githubUrl || '',
      });
    }
  }, [initialData]);
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${errors.title ? 'border-red-500' : ''}`}
          placeholder="Website title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.title}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Website description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.description}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Website URL <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${errors.url ? 'border-red-500' : ''}`}
          placeholder="https://example.com"
        />
        {errors.url && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.url}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL (optional)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${errors.imageUrl ? 'border-red-500' : ''}`}
          placeholder="https://example.com/image.jpg"
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.imageUrl}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          GitHub URL (optional)
        </label>
        <input
          type="url"
          id="githubUrl"
          name="githubUrl"
          value={formData.githubUrl}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white ${errors.githubUrl ? 'border-red-500' : ''}`}
          placeholder="https://github.com/username/repo"
        />
        {errors.githubUrl && (
          <p className="mt-1 text-sm text-red-500 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.githubUrl}
          </p>
        )}
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isSubmitting 
            ? 'Saving...' 
            : initialData 
              ? 'Update Website' 
              : 'Add Website'
          }
        </button>
      </div>
    </form>
  );
};

export default WebsiteForm;