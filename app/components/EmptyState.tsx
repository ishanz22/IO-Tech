import React from "react";

interface EmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  onClearSearch,
}) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
      {searchTerm ? (
        <>
          No items match your search &quot;<strong>{searchTerm}</strong>&quot;.
          <button
            onClick={onClearSearch}
            className="ml-2 underline text-blue-600 hover:text-blue-800"
          >
            Clear search
          </button>
        </>
      ) : (
        <>No items found. Add a new item to get started.</>
      )}
    </div>
  );
};

export default EmptyState;
