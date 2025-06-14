import { createSlice } from "@reduxjs/toolkit";

type Post = {
  _id: string;
  userId: string;
  skillSeek: string;
  skillOffer: string;
  description: string;
  availTimeFrom: string;
  availTimeTo: string;
  preferredTime: string;
  address: string;
  status: string;
  matchedUserId: string | null;
  createdAt: string;
  updatedAt: string;
};

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
  },
});

export const { fetchPosts, addPost } = postSlice.actions;

export default postSlice.reducer;
