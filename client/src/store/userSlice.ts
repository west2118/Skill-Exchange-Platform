import { createSlice } from "@reduxjs/toolkit";

type User = {
  _id: string;
  uid: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  offeredSkills: string[];
  seekedSkills: string[];
  location: {
    zip: string;
    address: string;
  };
};

interface UserState {
  users: User[];
  currentUserId: string | null;
  currentUserUid: string | null;
  currentUserToken: string | null;
}

const initialState: UserState = {
  users: [],
  currentUserId: null,
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
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { userId, newData } = action.payload;

      const index = state.users.findIndex((user) => user._id === userId);

      if (index !== -1) {
        state.users[index] = newData;
      }
    },
    setCurrentUserUid: (state, action) => {
      state.currentUserUid = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setCurrentUserToken: (state, action) => {
      state.currentUserToken = action.payload;
    },
  },
});

export const {
  fetchUsers,
  addUser,
  updateUser,
  setCurrentUserId,
  setCurrentUserUid,
  setCurrentUserToken,
} = userSlice.actions;

export default userSlice.reducer;
