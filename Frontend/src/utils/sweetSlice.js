import { createSlice } from "@reduxjs/toolkit";

const sweetSlice = createSlice({
  name: "sweet",
  initialState: [],
  reducers: {
    addSweet: (state, action) => {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeSweet: (state) => {
      return null;
    },
  },
});
export const { addSweet, removeSweet } = sweetSlice.actions;
export default sweetSlice.reducer;
