import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "https://jsonplaceholder.typicode.com";

export interface Item {
  id: number;
  title: string;
  description: string;
}

// Function to generate a unique ID (using timestamp-based logic)
let lastId = Date.now();
const generateUniqueId = () => {
  lastId += 1;
  return lastId;
};

// Function to convert API response into our Item format
const transformResponseToItem = (post: any): Item => ({
  id: post.id,
  title: post.title || "",
  description: post.body || "", // JSONPlaceholder uses 'body' instead of 'description'
});

// Fetch the first 10 items from the API
export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data.slice(0, 10).map(transformResponseToItem);
  } catch (error) {
    // console.error("Failed to fetch items:", error);
    toast.error("Server-side error occurred. Please try again later.");
    return [];
  }
};

// Create a new item
export const createItem = async (item: Omit<Item, "id">): Promise<Item> => {
  try {
    const response = await axios.post(`${API_URL}/posts`, {
      title: item.title,
      body: item.description,
      userId: 1,
    });

    toast.success("Item created successfully!");
    return {
      ...transformResponseToItem(response.data),
      id: generateUniqueId(),
    };
  } catch (error) {
    // console.error("Failed to create item:", error);
    toast.error("Server-side error occurred. Please try again later.");
    return Promise.reject(error);
  }
};

// Update an existing item
export const updateItem = async (item: Item): Promise<Item> => {
  try {
    if (item.id < 1000000000) {
      const response = await axios.put(`${API_URL}/posts/${item.id}`, {
        id: item.id,
        title: item.title,
        body: item.description,
        userId: 1,
      });
      toast.success("Item updated successfully!");
      return transformResponseToItem(response.data);
    } else {
      console.log("Simulating update for a locally created item:", item);
      await new Promise((resolve) => setTimeout(resolve, 200));
      toast.success("Item updated successfully!");
      return item;
    }
  } catch (error) {
    // console.error("Failed to update item:", error);
    toast.error("Server-side error occurred. Please try again later.");
    return Promise.reject(error);
  }
};

// Delete an item
export const deleteItem = async (id: number): Promise<void> => {
  try {
    if (id < 1000000000) {
      await axios.delete(`${API_URL}/posts/${id}`);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    toast.success("Item deleted successfully!");
  } catch (error) {
    // console.error("Failed to delete item:", error);
    toast.error("Server-side error occurred. Please try again later.");
  }
};

