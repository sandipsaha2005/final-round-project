import { apiSlice } from './apiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		capacityList: builder.mutation({
			query: (body) => ({
				url: '/fcEdit/capacitylist',
				method: 'GET',
				body: body,
			}),
		}),
		editCapacity: builder.mutation({
			query: (body) => ({
				url: '/fcEdit/capacity',
				method: 'POST',
				body: body,
			}),
		}),
		activeCapacity: builder.mutation({
			query: (body) => ({
				url: '/fcEdit/activeInactive',
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const { useCapacityListMutation, useActiveCapacityMutation, useEditCapacityMutation } =
	authApi;
