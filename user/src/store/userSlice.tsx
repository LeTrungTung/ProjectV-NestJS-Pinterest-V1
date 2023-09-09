import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserAPI } from "../api/User";

export interface UserState {
  data: string;
  token: string;
  isLoggedIn: boolean;
  error: boolean;
}

interface LoginResponse {
  // data: {
  data: {
    access_token: string;
  };
  // };
}

export const login = createAsyncThunk(
  "login",
  async (userData: Promise<any>) => {
    try {
      const response = await UserAPI.login(userData);
      console.log(555, response?.data);
      localStorage.setItem(
        "userLogin",
        JSON.stringify(response?.data?.userLogin)
      );
      localStorage.setItem("token", response.data.access_token);
      return response;
    } catch (error) {
      throw error; // Throwing error so that it can be handled in the rejected action
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state: any, action: PayloadAction<LoginResponse>) => {
        console.log("xem action >>>>>", action.payload);
        state.data = action.payload.data;
        state.token = action.payload.data.access_token;
        state.isLoggedIn = true;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
