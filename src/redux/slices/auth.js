import { apiSlice } from './apiSlice';

// import { HistoryProps } from '@/pages/Account/components/securityLoginHistory';
//import { simulateLoading } from '@/utils/helpers';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getCandidateName: builder.mutation({
			query: (body) => ({
				url: '/candidateRegistrationController/getCandidateName',
				method: 'GET',
				// body: body,
				// credentials: 'include',
			}),
		}),

		login: builder.mutation({
			query: (body) => ({
				url: '/instLoginController/instituteLogin',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),

		me: builder.mutation({
			query: (body) => ({
				url: '/instLoginController/getInstituteDetails',
				method: 'GET',
				// body: body,
			}),
		}),

		forgotPassword: builder.mutation({
			query: (body) => ({
				url: '/candidateLoginController/forgotPasswordOTP',
				method: 'POST',
				body: body,
			}),
		}),

		forgotPasswordOtpVerify: builder.mutation({
			query: (body) => ({
				url: '/candidateLoginController/recoverForgot_Password_Otp',
				method: 'POST',
				body: body,
			}),
		}),
		changePassword: builder.mutation({
			query: (body) => ({
				url: '/instLoginController/fcChangePass',
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useMeMutation,
	useRegisterMutation,
	useOtpVerifyMutation,
	useGetCandidateNameMutation,
	useResendOtpMutation,
	useForgotPasswordMutation,
	useForgotPasswordOtpVerifyMutation,
	useChangePasswordMutation,
} = authApi;
