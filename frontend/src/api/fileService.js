import axios from 'axios';

const API_BASE_URL = '/files';

// Create axios instance with timeout
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 second timeout
});

// Add response interceptor to handle connection errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
      throw new Error('Backend connection failed');
    }
    throw error;
  }
);

const fileService = {
  // Check backend connection
  checkConnection: async () => {
    try {
      await apiClient.get('/all', { params: { page: 0, size: 1 } });
      return true;
    } catch (error) {
      return false;
    }
  },

  // Get all files with pagination
  getAllFiles: async (page = 0, size = 20) => {
    try {
      const response = await apiClient.get('/all', {
        params: {
          page,
          size,
          sort: 'id,desc'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch files');
    }
  },

  // Get file by ID
  getFile: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch file');
    }
  },

  // Upload file
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post('/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to upload file');
    }
  },

  // Delete file
  deleteFile: async (id) => {
    try {
      await apiClient.delete(`/delete/${id}`);
    } catch (error) {
      throw new Error('Failed to delete file');
    }
  },

  // Print file
  printFile: async (id) => {
    try {
      await apiClient.post(`/print/${id}`);
    } catch (error) {
      throw new Error('Failed to print file');
    }
  },
};

export default fileService;
