import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BridgeTransaction } from '../../types';

interface BridgeState {
  transactions: BridgeTransaction[];
  loading: boolean;
  error: string | null;
}

const initialState: BridgeState = {
  transactions: [],
  loading: false,
  error: null,
};
const bridgeSlice = createSlice({
    name: 'bridge',
    initialState,
    reducers: {
      setTransactions: (state, action: PayloadAction<BridgeTransaction[]>) => {
        state.transactions = action.payload;
      },
      addTransaction: (state, action: PayloadAction<BridgeTransaction>) => {
        state.transactions.push(action.payload);
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
    },
  });
  
  export const { setTransactions, addTransaction, setLoading, setError } = bridgeSlice.actions;
  export default bridgeSlice.reducer;