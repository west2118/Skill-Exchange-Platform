import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  credentials: null,
  location: null,
  offerSkills: null,
  learnSkills: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    toAddCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    toAddLocation: (state, action) => {
      state.location = action.payload;
    },
    toAddOfferSkills: (state, action) => {
      state.offerSkills = action.payload;
    },
    toAddLearnSkills: (state, action) => {
      state.learnSkills = action.payload;
    },
    toResetState: (state) => {
      state.credentials = null;
      state.location = null;
      state.offerSkills = null;
      state.learnSkills = null;
    },
  },
});

export const {
  toAddCredentials,
  toAddLearnSkills,
  toAddLocation,
  toAddOfferSkills,
} = registerSlice.actions;

export default registerSlice.reducer;
