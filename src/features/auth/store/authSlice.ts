import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { MQTTStart, MQTTStop, notifySubs, NotyType } from "@shared/api";
import { startAppListening } from "@shared/middlewares/listenerMiddleware";

import type { RootState } from "@app/store";
import type { authData, Auth } from "./types";

const defState = {
	user: null,
	token: null
};

const localStoreState = JSON.parse(localStorage.getItem('auth') || "null");
const initialState: Auth = localStoreState || defState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action: { payload: authData }) => {
			const { card, token } = action.payload;
			state.user = { ...action.payload, ...card, token: undefined, card: undefined };
			state.token = token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

const { setCredentials, logout } = authSlice.actions;

const logIn = createAsyncThunk<void, authData, { state: RootState }>(
	'auth/login', 
	(data, { dispatch }) => {
		const { host, port } = window.config.network.mqtt;
		//
		dispatch(setCredentials(data));
		//
		MQTTStart(host, port);
		notifySubs(NotyType.LOGIN);
	}
);

const logOut = createAsyncThunk<void>(
	'auth/logout', 
	(_, { dispatch }) => {
		notifySubs(NotyType.LOGOUT);
		MQTTStop();
		//
		dispatch(logout());
	}
);

startAppListening({
	matcher: isAnyOf(setCredentials, logout),
  effect: (action, listenerApi) =>
		localStorage.setItem(
			"auth", JSON.stringify((listenerApi.getState() as RootState).auth)
		)
});

export { authSlice, setCredentials, logOut, logIn };

export default authSlice.reducer;
