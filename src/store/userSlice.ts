import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state structure for the user.
interface UserState {
  userData: any | null; // Or define a more specific type if you have a user object shape.
}

// Initial state with userData as null (indicating no user is logged in)
const initialState: UserState = {
  userData: null,
};

// Create the slice with actions
const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload; // Action to set user data (login)
    },
    clearUserData: (state) => {
      state.userData = null; // Action to clear user data (logout)
    },
  },
});

// Export the actions to be used in components
export const { setUserData, clearUserData } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;
