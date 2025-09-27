// src/redux/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoggedIn: boolean;
  token: string | null;
  error: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;

      // ✅ Hardcoded login check
      if (email === "eve.holt@reqres.in" && password === "cityslicka") {
        state.isLoggedIn = true;
        state.token = "dummy-token-123"; // fake token
        state.error = null;
        localStorage.setItem("authToken", state.token);
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      localStorage.removeItem("authToken");
    },
    loadToken: (state) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
    },
  },
});

export const { login, logout, loadToken } = userSlice.actions;
export default userSlice.reducer;
