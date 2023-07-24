import { apiSlice } from "@api/apiSlice";
import { authData } from "../store/types";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<authData, Record<string, string>>({
			query: (credentials: Record<string, string>) => ({
				url: '/users/login',
				method: 'GET',
				params: credentials,
				responseHandler: (response) => response.json(),
			})
		})
	})
});

export const {
	useLoginMutation
} = authApiSlice;