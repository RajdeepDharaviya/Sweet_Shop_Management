// create a file named appStore.js in the utils directory
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the user reducer

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
  },
});
export default store;
