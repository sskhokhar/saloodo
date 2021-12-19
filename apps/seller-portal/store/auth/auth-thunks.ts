import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  '[auth]/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      })
      .then((res) => res.data);
    if (response.user.type !== 'seller') {
      throw new Error('Invalid email or password');
    }
    return response;
  }
);
