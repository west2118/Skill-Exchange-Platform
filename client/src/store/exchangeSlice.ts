import { createSlice } from "@reduxjs/toolkit";

type Exchange = {
  _id: string;
  proposerId: string;
  receiverId: string;
  postId: string;
  skillOffer: string;
  skillSeek: string;
  message: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

interface ExchangeState {
  exchanges: Exchange[];
}

const initialState: ExchangeState = {
  exchanges: [],
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    fetchExchanges: (state, action) => {
      state.exchanges = action.payload;
    },
    addExchange: (state, action) => {
      state.exchanges.push(action.payload);
    },
  },
});

export const { fetchExchanges, addExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;
