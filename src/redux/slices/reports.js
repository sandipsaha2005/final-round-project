import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		fcConfirmCount: builder.mutation({
			query: (body) => ({
				url: '/reportController/fcConfirmCount',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		fcConfirm: builder.mutation({
			query: (body) => ({
				url: '/reportController/fcConfirm',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		categoryWiseReport: builder.mutation({
			query: (body) => ({
				url: '/reportController/candidate/categoryWiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getOptionFormreport: builder.mutation({
			query: (body) => ({
				url: '/reportController/candidate/getOptionFormreport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getcumulativereport: builder.mutation({
			query: (body) => ({
				url: '/reportController/candidate/getcumulativereport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		genderWiseReport: builder.mutation({
			query: (body) => ({
				url: '/reportController/candidate/genderWiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		incomeWiseReport: builder.mutation({
			query: (body) => ({
				url: 'reportController/candidate/incomeWiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		typeWiseReport: builder.mutation({
			query: (body) => ({
				url: 'reportController/candidate/typeWiseReport',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getAfterconfirmedited: builder.mutation({
			query: (body) => ({
				url: 'reportController/candidate/getAfterconfirmedited',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
		getApplicationwise: builder.mutation({
			query: (body) => ({
				url: 'reportController/candidate/getApplicationwise',
				method: 'GET',
				//body: body,
				// credentials: 'include',
			}),
		}),
	}),
});

export const {
	useCategoryWiseReportMutation,
	useFcConfirmCountMutation,
	useFcConfirmMutation,
	useGetOptionFormreportMutation,
	useGetcumulativereportMutation,
useGetApplicationwiseMutation,
	useGenderWiseReportMutation,
	useIncomeWiseReportMutation,
	useTypeWiseReportMutation,
	useGetAfterconfirmeditedMutation
} = authApi;
