import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { authData, Auth } from "./types";
import { startAppListening } from "@shared/middlewares/listenerMiddleware";
import { RootState } from "@app/store";

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
			const { token } = action.payload;
			state.user = { ...action.payload, token: undefined, };
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
		//
		dispatch(setCredentials(data));
	}
);

const logOut = createAsyncThunk<void>(
	'auth/logout', 
	(_, { dispatch }) => {
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
})

export { authSlice, setCredentials, logOut, logIn };

export default authSlice.reducer;
