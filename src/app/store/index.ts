import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		auth: authSlice,
	},
	devTools: true,
	middleware: getDefaultMiddleware => getDefaultMiddleware({
		serializableCheck: false
	}),
	// preloadedState: {
	// 	auth: authPreloaded
	// }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
