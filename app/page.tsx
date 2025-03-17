'use client'
import React, { useState, useEffect } from 'react';
import { Item, createItem, updateItem, fetchItems, deleteItem } from './services/api';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadItems();
  }, []);
  
  const handleAddItem = async (title: string, description: string) => {
    try {
      const newItem = await createItem({ title, description });
      setItems(prevItems => [...prevItems, newItem]);
      closeModal();
    } catch (err) {
      setError('Failed to add item. Please try again.');
    }
  };
  
  const handleUpdateItem = async (title: string, description: string) => {
    if (editItem) {
      try {
        const updatedItem = await updateItem({ ...editItem, title, description });
        setItems(prevItems =>
          prevItems.map(item => item.id === editItem.id ? updatedItem : item)
        );
        closeModal();
      } catch (err) {
        setError('Failed to update item. Please try again.');
      }
    }
  };
  
  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      setError('Failed to delete item. Please try again.');
    }
  };
  
  const handleEditItem = (item: Item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };
  
  const openAddModal = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold">Item Manager</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            <button 
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Item List</h2>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
          >
            <span className="mr-1">+</span> Add New Item
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-6">Loading items...</div>
        ) : (
          <ItemList 
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        )}
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ItemForm 
            initialItem={editItem || undefined}
            onSubmit={editItem ? handleUpdateItem : handleAddItem}
            onCancel={closeModal}
            isEdit={!!editItem}
            existingItems={items}
          />
        </Modal>
      </main>
      
      <footer className="bg-gray-200 text-center py-4 mt-auto">
        <div className="container mx-auto">
          <p>React TypeScript Item Manager App - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;