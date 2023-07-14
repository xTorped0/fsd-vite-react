import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchArgs, BaseQueryApi }  from '@reduxjs/toolkit/query/react';

import { RootState } from '@store';
import { logOut } from '@features/auth';

const config = window.config;

const baseQuery = fetchBaseQuery({
	baseUrl: config.network.api_url,
	credentials: 'include',
	headers: {
		'Accept': 'application/json', 
		'Content-Type': 'application/json' 
	},
	prepareHeaders: (headers, { getState }) => {
		const { token } = (getState() as RootState).auth;

		if(token) headers.set('authorization', token);
		return headers;
	}
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOpts: {}) => {
	const result = await baseQuery(args, api, extraOpts);

	if(result?.error?.status === 403) api.dispatch(logOut());

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({})
});