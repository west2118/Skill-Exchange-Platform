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
    toResetState: (state) => {
      state.credentials = null;
    },
  },
});

export const { toAddCredentials, toResetState } = registerSlice.actions;

export default registerSlice.reducer;
