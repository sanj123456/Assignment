import { createSlice } from "@reduxjs/toolkit";
import { getAccessToken, isAlreadyLoggedIn } from "../../services/helper";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: !!isAlreadyLoggedIn(), userData: {} },
  reducers: {
    loginUser: (state) => {
      return {
        ...state,
        isLoggedIn: true,
        userData: {}
      };
    },
    logoutUser: (state, action) => {
      return {
        ...state,
        isLoggedIn: false,
        userData: {}
      };
    },
  },
});
export const { loginUser, logoutUser } =
  authSlice.actions;

export default authSlice.reducer;
