import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Set the base URL for the Axios instance
axios.defaults.baseURL = 'https://connections-api.goit.global';

// Helper function to set the Authorization header
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Helper function to clear the Authorization header
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization; // Use delete instead of setting to ''
};

// Register a new user
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      // Validate input parameters
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }

      // Validate password length
      if (password.length < 7) {
        throw new Error('Password must be at least 7 characters long');
      }

      const response = await axios.post('/users/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Ensure correct status code
        setAuthHeader(response.data.token); // Set the auth header with the token
        return response.data; // Return the user data
      } else {
        return thunkAPI.rejectWithValue(
          'Registration failed with unexpected status'
        );
      }
    } catch (error) {
      // Log detailed error information for debugging
      console.error('Registration Error:', error.response || error.message);

      // Return a more descriptive error message if available
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Log in an existing user

export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', { email, password });
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Log out the current user
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    if (response.status === 204) {
      // Check for the correct status code
      clearAuthHeader(); // Clear the auth header on logout
    } else {
      // Handle unexpected status codes
      return thunkAPI.rejectWithValue(
        'Unexpected server response during logout'
      );
    }
  } catch (error) {
    // Log error details for debugging
    console.error('Logout Error:', error.response || error.message);

    // Return a more specific error message if available
    const errorMessage = error.response?.data?.message || 'Logout failed';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

// Refresh the current user's session
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // If there's no persisted token, reject with an error
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user. No token found.');
    }

    setAuthHeader(persistedToken); // Set the auth header with the persisted token

    try {
      const res = await axios.get('/users/current'); // Fetch the current user

      if (res.status === 200) {
        return res.data; // Return the user data
      } else {
        // Handle unexpected status codes
        return thunkAPI.rejectWithValue(
          'Unexpected server response during user refresh'
        );
      }
    } catch (error) {
      // Log error details for debugging
      console.error('User Refresh Error:', error.response || error.message);

      // Return a more specific error message if available
      const errorMessage =
        error.response?.data?.message || 'Unable to refresh user';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
