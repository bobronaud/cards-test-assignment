import {configureStore} from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    modal: modalReducer
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch