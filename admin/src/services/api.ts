import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '../utils';

const API_URL = `${BASE_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  verifyOTP: async (userId: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { userId, otp });
    return response.data;
  },

  resendOTP: async (userId: string) => {
    const response = await api.post('/auth/resend-otp', { userId });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
   // 🚀 Added function to fetch user data by ID
   getUser: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  
  // Update user profile
  updateUser: async (userId: string, userData: {
    first_name?: string;
    last_name?: string;
    image?: string;
  }) => {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  },
};

// Client/user management API
export const clientsAPI = {
  // Get all clients with pagination, filtering and sorting
  getClients: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    role?: string;
  }) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  
  // Get a specific client by ID
  getClientById: async (clientId: string) => {
    const response = await api.get(`/users/${clientId}`);
    return response.data;
  },
  
  // Create a new client
  createClient: async (clientData: {
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    // Add other fields as needed
  }) => {
    const response = await api.post('/users', clientData);
    return response.data;
  },
  
  // Update a client
  updateClient: async (clientId: string, clientData: {
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    status?: string;
    // Add other fields as needed
  }) => {
    const response = await api.put(`/users/${clientId}`, clientData);
    return response.data;
  },
  
  // Delete a client
  deleteClient: async (clientId: string) => {
    const response = await api.delete(`/users/${clientId}`);
    return response.data;
  }
}; 




export const axiosApiCall = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: object, // make the data parameter optional
    config: AxiosRequestConfig = {},
) => {
    try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');

        // Add Authorization header if token exists
        const headers = {
            ...config?.headers, // Preserve existing headers from config
            ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header
        };

        const response = await axios({
            method,
            url,
            data,
            ...config,
            headers, // Use the merged headers
        });

        // You can handle the response or extract data here if needed
        return response.data;
    } catch (error) {
        // Handle errors (e.g., log them, show a notification, etc.)
        console.error("API Call Error:", error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};



// sample usage
// Delete a role
// const deleteRole = async (roleId: string) => {
//   try {
//     await axiosApiCall('delete', `/api/roles/${roleId}`);
//   } catch (error) {
//     console.error('Error deleting role:', error);
//     throw error;
//   }
// };

// Update a role
// const updateRole = async (roleId: string, updates: { name?: string, description?: string }) => {
//   try {
//     const updatedRole = await axiosApiCall('put', `/api/roles/${roleId}`, updates);
//     return updatedRole;
//   } catch (error) {
//     console.error('Error updating role:', error);
//     throw error;
//   }
// };

// Create a new role
// const createRole = async (roleData: { name: string, description: string }) => {
//   try {
//     const newRole = await axiosApiCall('post', '/api/roles', roleData);
//     return newRole;
//   } catch (error) {
//     console.error('Error creating role:', error);
//     throw error;
//   }
// };

// Fetch all roles
// const fetchRoles = async () => {
//   try {
//     const roles = await axiosApiCall('get', '/api/roles');
//     console.log(roles);
//     return roles;
//   } catch (error) {
//     console.error('Error fetching roles:', error);
//   }
// };

// // With query parameters
// const fetchUser = async (userId: string) => {
//   return await axiosApiCall('get', `/api/users/${userId}`);
// };