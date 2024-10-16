import { RootState } from "../store";

export const selectAuth = (state: RootState) => state.auth.auth || null;
export const selectUserData = (state: RootState) => state.auth.userData || null;
