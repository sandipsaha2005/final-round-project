import { apiSlice } from './apiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getState: builder.mutation({
			query: (body) => ({
				url: '/editCandidateController/selectState',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getDistrict: builder.mutation({
			query: (body) => ({
				url: '/editCandidateController/selectDistrict',
				method: 'POST',
				body: body,
			}),
		}),
		checkEmail: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectEmailId',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		checkPhoneNumber: builder.mutation({
			query: (body) => ({
				url: '/masterController/selectMobileNo',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		notifications: builder.mutation({
			query: (language) => ({
				url: `/masterController/notification`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		important: builder.mutation({
			query: (language) => ({
				url: `/masterController/importantDates`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		news: builder.mutation({
			query: (language) => ({
				url: `/masterController/news`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		download: builder.mutation({
			query: (language) => ({
				url: `/masterController/downloads`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		faq: builder.mutation({
			query: (language) => ({
				url: `/masterController/faq`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		getCategory: builder.mutation({
			query: () => ({
				url: `/editCandidateController/selectCategory`,
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),
		getSubCategory: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/selectSubCategory`,
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		getPhysicalDisa: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getPhDetails`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),

		getDefenceStatus: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getDefence`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),

		getAnnualIncome: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getIncomeRange`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getReligion: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getReligion`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getMotherTongue: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getLangauge`,
				method: 'GET',
				body: body,
				// credentials: 'include',
			}),
		}),
		getTaluka: builder.mutation({
			query: (body) => ({
				url: '/editCandidateController/getTaluka',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		getVillage: builder.mutation({
			query: (body) => ({
				url: '/editCandidateController/getVillage',
				method: 'POST',
				body: body,
			}),
		}),
		// credentials: 'include',
		getHscBoard: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getHscBoard`,
				method: 'GET',
				body: body,
			}),
		}),

		getSscBoard: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getSscBoard`,
				method: 'GET',
				body: body,
			}),
		}),

		getReligionMinority: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getReligiousMinority`,
				method: 'POST',
				 body: body,
			}),
		}),

		getLinguisticMinority: builder.mutation({
			query: (body) => ({
				url: `/editCandidateController/getLinguasticMinority`,
				method: 'POST',
				body: body,
			}),
		}),
		getEmailAndMobile: builder.mutation({
			query: (body) => ({
				url: `editCandidateController/emailIdForPersonalDetails`,
				method: 'POST',
				body: body,
			}),
		}),
		getSMSLog: builder.mutation({
			query: (body) => ({
				url: `smsController/getsms`,
				method: 'GET',
				// body: body,
			}),
		}),

		getFClist: builder.mutation({
			query: (body) => ({
				url: `slotTimeController/fclistSlot`,
				method: 'POST',
				body: body,
			}),
		}),
		getTimeSlot: builder.mutation({
			query: (body) => ({
				url: `slotTimeController/timeSlot`,
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const {
	useGetDistrictMutation,
	useGetStateMutation,
	useCheckEmailMutation,
	useCheckPhoneNumberMutation,
	useNotificationsMutation,
	useNewsMutation,
	useDownloadMutation,
	useImportantMutation,
	useFaqMutation,
	useGetCategoryMutation,
	useGetSubCategoryMutation,
	useGetPhysicalDisaMutation,
	useGetDefenceStatusMutation,
	useGetAnnualIncomeMutation,
	useGetMotherTongueMutation,
	useGetReligionMutation,
	useGetVillageMutation,
	useGetTalukaMutation,
	useGetHscBoardMutation,
	useGetSscBoardMutation,
	useGetReligionMinorityMutation,
	useGetLinguisticMinorityMutation,
	useGetEmailAndMobileMutation,
	useGetSMSLogMutation,
	useGetFClistMutation,
	useGetTimeSlotMutation,
} = authApi;
