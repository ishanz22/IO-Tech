import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Item {
  id: number;
  title: string;
  description: string;
}

// Since JSONPlaceholder doesn't have 'description' field in posts, we'll adapt the response
const adaptItem = (post: any): Item => {
  console.log('Adapting item:', post); // Debug log
  return {
    id: post.id,
    title: post.title || '',
    description: post.body || '' 
  };
};

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data.slice(0, 10).map(adaptItem); // Get only first 10 items
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    // JSONPlaceholder expects 'body' instead of 'description'
    const response = await axios.post(`${API_URL}/posts`, {
      title: item.title,
      body: item.description,
      userId: 1
    });
    return adaptItem(response.data);
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItem = async (item: Item): Promise<Item> => {
  try {
    // JSONPlaceholder expects 'body' instead of 'description'
    const response = await axios.put(`${API_URL}/posts/${item.id}`, {
      id: item.id,
      title: item.title,
      body: item.description,
      userId: 1
    });
    console.log('Update response:', response.data); // Debug log
    return adaptItem(response.data);
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};