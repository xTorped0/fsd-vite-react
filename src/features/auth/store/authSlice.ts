import { createSlice } from "@reduxjs/toolkit";
import type { authData } from "./types";

const initialState: authData = {
	user: null,
	token: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: { payload: { accessToken: string, user: any } }) => {
			const { user, accessToken } = action.payload;
			state.user = user;
			state.token = accessToken;
		},
		logOut: (state) => {
			state.user = null;
			state.token = null;
		}
	}
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
