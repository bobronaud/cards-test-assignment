import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';

type Modal = 'show' | 'remove' | 'info' | 'error';
type State = {
  isOpen: boolean;
  type: Modal | null;
};

const initialState: State = {
  isOpen: false,
  type: null,
};

const modalSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Modal>) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;
