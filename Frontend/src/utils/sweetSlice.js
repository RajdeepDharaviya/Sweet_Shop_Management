import { createSlice } from "@reduxjs/toolkit";

const sweetSlice = createSlice({
  name: "sweet",
  initialState: [],
  reducers: {
    addSweet: (state, action) => {
      return action.payload;
    },
    addOneSweet: (state, action) => {
      state.push(action.payload);
    },
    // eslint-disable-next-line no-unused-vars
    removeSweet: (state) => {
      return [];
    },
    removeOneSweet: (state, action) => {
      return state.filter((sweet) => sweet.id !== action.payload);
    },
  },
});
export const { addSweet, removeSweet, addOneSweet, removeOneSweet } =
  sweetSlice.actions;
export default sweetSlice.reducer;
