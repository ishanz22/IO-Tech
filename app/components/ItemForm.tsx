// src/components/ItemForm.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Item } from '../services/api';

interface Props {
  initialItem?: Item;
  onSubmit: (title: string, description: string) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
  existingItems?: Item[];
}

const ItemForm: React.FC<Props> = ({ 
  initialItem, 
  onSubmit, 
  onCancel, 
  isEdit = false,
  existingItems = []
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (initialItem) {
      setTitle(initialItem.title);
      setDescription(initialItem.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialItem]);
  
  const checkDuplicateTitle = (title: string): boolean => {
    if (!isEdit) {
      // For new items, check if title already exists
      return existingItems.some(item => 
        item.title.toLowerCase() === title.toLowerCase()
      );
    } else {
      // For editing, check if title exists on any item OTHER than the current one
      return existingItems.some(item => 
        item.title.toLowerCase() === title.toLowerCase() && 
        item.id !== initialItem?.id
      );
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required');
      return;
    }
    
    // Check for duplicate title
    if (checkDuplicateTitle(title.trim())) {
      setError('This title already exists. Please use a different title.');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      await onSubmit(title, description);
    } catch (err) {
      setError('Failed to save item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Item' : 'Add New Item'}</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              // Clear error when user starts typing again
              if (error) setError(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
            disabled={submitting}
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              // Clear error when user starts typing again
              if (error) setError(null);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Enter description"
            disabled={submitting}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;