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
  currentCompanyId: string | null;
}
const initialState: state = {
  cards: [],
  currentCompanyId: null
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCards: (state, action: PayloadAction<CardType[]>) => {
      const newCards = action.payload;
      state.cards = [...state.cards, ...newCards];
    },
    setCurrentCompanyId: (state, action: PayloadAction<string | null>) => {
      state.currentCompanyId = action.payload;
    }
  }
})

export type { CardType };
export const { addCards, setCurrentCompanyId } = cardsSlice.actions;
export const selectCards = (state: RootState) => state.cards;
export default cardsSlice.reducer;
