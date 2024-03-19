import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ILoginIitial, IUser, IUsers } from "./login.model";
import { _getUsers } from "../../data/_DATA";

const initialState: ILoginIitial = {
  isLoading: "idle",
  users: undefined,
  currentUser: undefined,
};

export const fetchAllUsers = createAsyncThunk<IUsers>(
  "login/fetchAllUsers",
  async () => {
    const response = await _getUsers();
    return response;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setListUsers: (
      state: ILoginIitial,
      action: PayloadAction<IUsers | undefined>
    ) => {
      state.users = action.payload;
    },
    setCurrentUser: (state: ILoginIitial, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllUsers.fulfilled,
      (state: ILoginIitial, action: PayloadAction<IUsers>) => {
        state.users = action.payload;
      }
    );
  },
});

export const { setListUsers, setCurrentUser } = loginSlice.actions;

export default loginSlice.reducer;
