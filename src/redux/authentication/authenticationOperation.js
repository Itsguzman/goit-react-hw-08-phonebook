import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      if (!name || !email || !password) {
        throw new Error('Name, email, and password are required');
      }

      if (password.length < 7) {
        throw new Error('Password must be at least 7 characters long');
      }

      const response = await axios.post('/users/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setAuthHeader(response.data.token);
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(
          'Registration failed with unexpected status'
        );
      }
    } catch (error) {
      console.error('Registration Error:', error.response || error.message);
      const errorMessage =
        error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

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

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/logout');
    if (response.status === 204) {
      clearAuthHeader();
    } else {
      return thunkAPI.rejectWithValue(
        'Unexpected server response during logout'
      );
    }
  } catch (error) {
    console.error('Logout Error:', error.response || error.message);
    const errorMessage = error.response?.data?.message || 'Logout failed';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user. No token found.');
    }

    setAuthHeader(persistedToken);

    try {
      const res = await axios.get('/users/current');

      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.rejectWithValue(
          'Unexpected server response during user refresh'
        );
      }
    } catch (error) {
      console.error('User Refresh Error:', error.response || error.message);
      const errorMessage =
        error.response?.data?.message || 'Unable to refresh user';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
