import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';

export const fetchData = createAsyncThunk('cards/fetch', async (_, thunkAPI) => {
  // @ts-ignore
  const offset = thunkAPI.getState().cards.cards.length;
  const response = await fetch('/api/getAllCompanies', {
    method: 'POST',
    headers: {
      TOKEN: '123',
    },
    body: JSON.stringify({
      offset,
      limit: 10,
    }),
  });

  switch (response.status) {
    case 200: {
      const data = await response.json();
      return data.companies;
    }
    case 400: {
      const { message } = await response.json();
      return thunkAPI.rejectWithValue(message);
    }
    case 401: {
      return thunkAPI.rejectWithValue('Ошибка авторизации');
    }
    case 500: {
      return thunkAPI.rejectWithValue('Все упало!');
    }
    default:
      return;
  }
});

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
  };
};
interface state {
  cards: CardType[];
  loading: boolean;
  error: string | null;
  currentCompanyId: string | null;
}
const initialState: state = {
  cards: [],
  loading: false,
  error: null,
  currentCompanyId: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCurrentCompanyId: (state, action: PayloadAction<string | null>) => {
      state.currentCompanyId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const newCards = action.payload;
      state.cards = [...state.cards, ...newCards];
      state.loading = false;
    }),
      builder.addCase(fetchData.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        const error = action.payload as string;
        state.error = error;
      });
  },
});

export type { CardType };
export const { setCurrentCompanyId } = cardsSlice.actions;
export const selectCards = (state: RootState) => state.cards;
export default cardsSlice.reducer;
