"use client";
import React from "react";
import { useItems } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";
import Modal from "./components/Modal";
import SearchBox from "./components/SearchBox";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorAlert from "./components/ErrorAlert";
import EmptyState from "./components/EmptyState";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const {
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
  } = useItems();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header title="Hire me 😍" />

        <main className="container mx-auto py-6 px-4 flex-grow">
          {error && (
            <ErrorAlert message={error} onDismiss={() => setSearchTerm("")} />
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold">Item List</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <SearchBox onSearch={setSearchTerm} />
              <button
                onClick={openAddModal}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center justify-center"
              >
                <span className="mr-1">+</span> Add New Item
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-6">Loading items...</div>
          ) : filteredItems.length === 0 ? (
            <EmptyState
              searchTerm={searchTerm}
              onClearSearch={() => setSearchTerm("")}
            />
          ) : (
            <ItemList
              items={filteredItems}
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

        <Footer />

        <ToastContainer />
      </div>
    </>
  );
};

export default App;
