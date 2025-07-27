import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // Set the user state to the payload
    },
    removeUser: () => {
      return null; // Reset the user state to null
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
