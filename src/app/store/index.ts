import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '@api/apiSlice';

import { authSlice } from '@features/auth-form';

import { listenerMiddleware } from '@shared/middlewares/listenerMiddleware';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
	},
	devTools: true,
	middleware: getDefaultMiddleware => 
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(
			apiSlice.middleware,
			listenerMiddleware.middleware
		),
	// preloadedState: {
	// 	auth: authPreloaded
	// }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
