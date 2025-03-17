import React from 'react';
import { Item } from '../services/api';

interface Props {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (item: Item) => void;
}

const ItemCard: React.FC<Props> = ({ item, onDelete, onEdit }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      <div className="flex justify-end space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;