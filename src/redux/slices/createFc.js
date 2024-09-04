import { apiSlice } from './apiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		createFc: builder.mutation({
			query: (body) => ({
				url: '/createFc/createFc',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getFCDetails: builder.mutation({
			query: (body) => ({
				url: '/createFc/getFCDetails',
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useCreateFcMutation, useGetFCDetailsMutation } = authApi;
