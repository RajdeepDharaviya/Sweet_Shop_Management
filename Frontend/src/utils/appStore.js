// create a file named appStore.js in the utils directory
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import the user reducer
import sweetReducer from "./sweetSlice"; // Import the sweet reducer

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer,
    sweet: sweetReducer, // Assuming you have a sweetReducer
  },
});
export default store;
