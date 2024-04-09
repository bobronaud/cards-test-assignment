import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts'

type CardType = {
  company: {
    companyId: string;
  };
  customerMarkParameters: {
    loyaltyLevel: {
      cashToMark: number;
      markToCash: number;
      name: string;
      number: number;
      requiredSum: number;
    };
    mark: number;
  };
  mobileAppDashboard: {
    accentColor: string;
    backgroundColor: string;
    cardBackgroundColor: string;
    companyName: string;
    highlightTextColor: string;
    logo: string;
    mainColor: string;
    textColor: string;
  }
}
interface state {
  cards: CardType[],
}
const initialState: state = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards: (state, action: PayloadAction<CardType[]>) => {
      const newCards = action.payload;
      state.cards = [...state.cards, ...newCards];
    }
  }
})

export type { CardType };
export const { addCards } = cardsSlice.actions;
export const selectCards = (state: RootState) => state.cards;
export default cardsSlice.reducer;``
