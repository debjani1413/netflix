import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: { // Corrected here
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    }
  }
});

export const { addUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
