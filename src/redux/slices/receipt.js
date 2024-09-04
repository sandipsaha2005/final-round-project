import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		receiptDetails: builder.mutation({
			query: (body) => ({
				url: '/printFormController/receipt_cum_print',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		printCandiForm: builder.mutation({
			query: (body) => ({
				url: '/printFormController/printForm',
				method: 'POST',
				body: body,
				// credentials: 'include',
			}),
		}),
		receiptCandidate: builder.mutation({
			query: (body) => ({
				url: '/fcConfirmCandidate/getDetails',
				method: 'POST',
				body: body,
			}),
		}),
	}),
});

export const { useReceiptDetailsMutation, useReceiptCandidateMutation,usePrintCandiFormMutation } = authApi;
