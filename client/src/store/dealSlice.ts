import { createSlice } from "@reduxjs/toolkit";

type Session = {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
};

type Deal = {
  ratings: any;
  _id: string;
  proposerId: string;
  receiverId: string;
  postId: string;
  exchangeId: string;
  skillOffer: string;
  skillSeek: string;
  status: string;
  sessions: Session[] | null;
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
    editDeal: (state, action) => {
      const { dealId, newData } = action.payload;

      const dealIndex = state.deals.findIndex((deal) => deal._id === dealId);

      if (dealIndex !== -1) {
        state.deals[dealIndex] = newData;
      }
    },
  },
});

export const { fetchDeals, addDeal, editDeal } = dealSlice.actions;

export default dealSlice.reducer;
