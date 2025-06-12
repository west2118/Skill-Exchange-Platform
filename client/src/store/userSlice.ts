import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUserUid: null,
  currentUserToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUserUid: (state, action) => {
      state.currentUserUid = action.payload;
    },
    setCurrentUserToken: (state, action) => {
      state.currentUserToken = action.payload;
    },
  },
});

export const { fetchUsers, setCurrentUserUid, setCurrentUserToken } =
  userSlice.actions;

export default userSlice.reducer;
