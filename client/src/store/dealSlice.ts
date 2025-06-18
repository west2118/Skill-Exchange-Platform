import { createSlice } from "@reduxjs/toolkit";

type Deal = {
  _id: string;
  proposerId: string;
  receiverId: string;
  postId: string;
  exchangeId: string;
  skillOffer: string;
  skillSeek: string;
  status: string;
  sessions: string[] | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};

interface DealState {
  deals: Deal[];
}

const initialState: DealState = {
  deals: [],
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    fetchDeals: (state, action) => {
      state.deals = action.payload;
    },
    addDeal: (state, action) => {
      state.deals.push(action.payload);
    },
  },
});

export const { fetchDeals, addDeal } = dealSlice.actions;

export default dealSlice.reducer;
