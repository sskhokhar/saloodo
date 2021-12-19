import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthState } from './auth-slice.interface';
import { persistor } from '../store';
import { login } from './auth-thunks';

const initialState: AuthState = {};
const AuthSlice = createSlice({
  name: '[auth]',
  initialState,
  reducers: {
    signout: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }: PayloadAction<any>) => {
        console.log(
          `🚀 ~ file: auth.slice.ts ~ line 26 ~ .addCase ~ payload`,
          payload
        );
        state.loading = false;
        state.token = payload.token;
        state.user = payload.user;
      });
  },
});
export const { signout } = AuthSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;

export default AuthSlice.reducer;
