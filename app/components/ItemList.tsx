'use client'
import React from 'react';
import { Item } from '../services/api';
import ItemCard from './ItemCard';

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: number) => void;
}

const ItemList: React.FC<Props> = ({ items, onEdit, onDelete }) => {
  if (items.length === 0) {
    return <div className="text-center py-6">No items found. Add a new item to get started.</div>;
  }
  
  return (
    <div className="space-y-4">
      {items.map(item => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default ItemList;