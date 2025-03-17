import { useState, useEffect } from "react";
import { Item, createItem, updateItem, fetchItems, deleteItem } from "../services/api";

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch items
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchItems();
      setItems(data);
      setFilteredItems(data);
    } catch  {
      setError("Failed to load items. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Search filter
  useEffect(() => {
    filterItems();
  }, [searchTerm, items]);

  const filterItems = () => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    setFilteredItems(
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
      )
    );
  };

  // CRUD Operations
  const handleAddItem = async (title: string, description: string) => {
    try {
      const newItem = await createItem({ title, description });
      setItems([newItem, ...items]);
      closeModal();
    } catch {
      setError("Failed to add item. Please try again.");
    }
  };

  const handleUpdateItem = async (title: string, description: string) => {
    if (!editItem) return;

    try {
      const updatedItem = await updateItem({ ...editItem, title, description });
      setItems(items.map((item) => (item.id === editItem.id ? updatedItem : item)));
      closeModal();
    } catch  {
      setError("Failed to update item. Please try again.");
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);
      setItems(items.filter((item) => item.id !== id));
    } catch  {
      setError("Failed to delete item. Please try again.");
    }
  };

  // Modal & Edit management
  const openAddModal = () => {
    setEditItem(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItem(null);
  };

  const handleEditItem = (item: Item) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  return {
    items,
    filteredItems,
    searchTerm,
    setSearchTerm,
    editItem,
    loading,
    error,
    isModalOpen,
    openAddModal,
    closeModal,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleEditItem,
    filterItems,
  };
};
