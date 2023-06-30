import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userData: {
    uid: "",
    displayName: "",
    email: "",
    accessToken: "",
    photoURL: "",
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: authInitialState,
  reducers: {
    getUser(state, action) {
      state.userData.uid = action.payload.uid;
      state.userData.displayName = action.payload.displayName;
      state.userData.email = action.payload.email;
      // state.userData.accessToken = action.payload.accessToken;
      state.userData.photoURL = action.payload.photoURL;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchLogout.fulfilled, (state, action) => {
  //         state.contacts.items = [];
  //         state.contacts.isLoading = false;
  //         state.filter = "";
  //       })
  //       .addCase(fetchAllContacts.fulfilled, (state, action) => {
  //         state.contacts.items = action.payload;
  //       })
  //       .addCase(addContact.fulfilled, (state, action) => {
  //         state.contacts.items.push(action.payload);
  //       })
  //       .addCase(deleteContact.fulfilled, (state, action) => {
  //         const itemIndex = state.contacts.items.findIndex(
  //           (contact) => contact.id === action.payload
  //         );
  //         state.contacts.items.splice(itemIndex, 1);
  //       })
  //       .addMatcher(
  //         (action) => action.type.endsWith("/pending"),
  //         (state, action) => {
  //           state.contacts.error = null;
  //           state.contacts.isLoading = true;
  //         }
  //       )
  //       .addMatcher(
  //         (action) => action.type.endsWith("/rejected"),
  //         (state, action) => {
  //           state.contacts.isLoading = false;
  //           state.contacts.error = action.payload;
  //         }
  //       )
  //       .addMatcher(
  //         (action) => action.type.endsWith("/fulfilled"),
  //         (state, action) => {
  //           state.contacts.isLoading = false;
  //           state.contacts.error = null;
  //         }
  //       );
  //   },
});

export const { getUser } = authSlice.actions;
