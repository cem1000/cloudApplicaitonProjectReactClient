import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const mockProducts = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop with the latest processor and ample storage.',
    price: 999.99,
    available: true
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest smartphone model with advanced camera capabilities.',
    price: 699.99,
    available: true
  },
  {
    id: 3,
    name: 'Headphones',
    description: 'Noise-cancelling wireless headphones with long battery life.',
    price: 199.99,
    available: false
  },
  {
    id: 4,
    name: 'Smartwatch',
    description: 'Track your fitness and stay connected with this sleek smartwatch.',
    price: 249.99,
    available: true
  },
  {
    id: 5,
    name: 'Tablet',
    description: 'Portable tablet perfect for entertainment and productivity.',
    price: 399.99,
    available: false
  }
];

const USE_MOCK_DATA = true;

const apiService = {
  getAllProducts: async (filterAvailable = null) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredProducts = [...mockProducts];
          if (filterAvailable !== null) {
            filteredProducts = filteredProducts.filter(p => p.available === filterAvailable);
          }
          resolve(filteredProducts);
        }, 500);
      });
    }

    let url = `${API_URL}/products`;
    if (filterAvailable !== null) {
      url += `?available=${filterAvailable}`;
    }
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = mockProducts.find(p => p.id === parseInt(id));
          if (product) {
            resolve(product);
          } else {
            reject(new Error('Product not found'));
          }
        }, 500);
      });
    }

    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (productData) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newProduct = {
            ...productData,
            id: mockProducts.length + 1
          };
          mockProducts.push(newProduct);
          resolve(newProduct);
        }, 500);
      });
    }

    try {
      const response = await axios.post(`${API_URL}/products`, { product: productData });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockProducts.findIndex(p => p.id === parseInt(id));
          if (index !== -1) {
            const updatedProduct = {
              ...productData,
              id: parseInt(id)
            };
            mockProducts[index] = updatedProduct;
            resolve(updatedProduct);
          } else {
            reject(new Error('Product not found'));
          }
        }, 500);
      });
    }

    try {
      const response = await axios.put(`${API_URL}/products/${id}`, { product: productData });
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    if (USE_MOCK_DATA) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockProducts.findIndex(p => p.id === parseInt(id));
          if (index !== -1) {
            mockProducts.splice(index, 1);
            resolve({ success: true });
          } else {
            reject(new Error('Product not found'));
          }
        }, 500);
      });
    }

    try {
      const response = await axios.delete(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  }
};

export default apiService; 