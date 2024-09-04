import { apiSlice } from './apiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		editInstitute: builder.mutation({
			query: (body) => ({
				url: '/edit/editInstDetails',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getFcInstituteDetails: builder.mutation({
			query: (body) => ({
				url: '/edit/getDetails',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const { useEditInstituteMutation, useGetFcInstituteDetailsMutation } = authApi;
