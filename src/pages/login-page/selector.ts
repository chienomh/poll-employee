import { RootState } from "../../store";

export const getListUsers = (state: RootState) => state.login.users;
export const getCurrentUser = (state: RootState) => state.login.currentUser;
