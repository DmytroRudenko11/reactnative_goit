import { createSlice } from "@reduxjs/toolkit";

const postInitialState = {
  posts: [],
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState: postInitialState,
  reducers: {
    addPost(state, action) {
      state.posts = action.payload;
    },
  },
});

export const { addPost } = postSlice.actions;
