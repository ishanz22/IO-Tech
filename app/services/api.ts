import axios from "axios";

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
    console.error("Failed to fetch items:", error);
    throw error;
  }
};

// Create a new item
export const createItem = async (item: Omit<Item, "id">): Promise<Item> => {
  try {
    // Send data in a format expected by JSONPlaceholder
    const response = await axios.post(`${API_URL}/posts`, {
      title: item.title,
      body: item.description, // API expects 'body' instead of 'description'
      userId: 1,
    });

    // Adapt API response and assign a unique ID since JSONPlaceholder doesn't persist IDs
    return {
      ...transformResponseToItem(response.data),
      id: generateUniqueId(),
    };
  } catch (error) {
    console.error("Failed to create item:", error);
    throw error;
  }
};

// Update an existing item
export const updateItem = async (item: Item): Promise<Item> => {
  try {
    if (item.id < 1000000000) {
      // If the ID is from JSONPlaceholder (small number), make a real API request
      const response = await axios.put(`${API_URL}/posts/${item.id}`, {
        id: item.id,
        title: item.title,
        body: item.description,
        userId: 1,
      });

      return transformResponseToItem(response.data);
    } else {
      // If the ID is a custom-generated one, simulate an API update
      console.log("Simulating update for a locally created item:", item);
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulated delay

      return item; // Return the updated item directly
    }
  } catch (error) {
    console.error("Failed to update item:", error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (id: number): Promise<void> => {
  try {
    if (id < 1000000000) {
      // If the ID is from JSONPlaceholder, perform a real delete request
      await axios.delete(`${API_URL}/posts/${id}`);
    } else {
      // If the ID is a custom-generated one, simulate a successful delete
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  } catch (error) {
    console.error("Failed to delete item:", error);
    throw error;
  }
};
