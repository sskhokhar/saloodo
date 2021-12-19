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
    console.log(`🚀 ~ file: auth-thunks.ts ~ line 13 ~ response`, response);
    if (response.user.type !== 'biker') {
      throw new Error('Invalid email or password');
    }
    return response;
  }
);
