import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shown: false,
  message: '',
  variant: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alertSuccess(state, { payload }) {
      state.shown = true;
      state.message = payload.message;
      state.variant = 'success';
    },

    alertFailure(state, { payload }) {
      state.shown = true;
      state.message = payload.message;
      state.variant = 'error';
    },

    hideAlert(state) {
      state.shown = false;
    },
  },
});

export const { alertSuccess, alertFailure, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
