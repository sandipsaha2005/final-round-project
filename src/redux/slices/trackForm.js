import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
	// overrideExisting: true,
	endpoints: (builder) => ({
		getUpdateForm: builder.mutation({
			query: (body) => ({
				url: '/efcModuleController/trackForm/updateTrackForm',
				method: 'GET',
				// body: body,
			}),
		}),
		getIncompleteForm: builder.mutation({
			query: (body) => ({
				url: '/efcModuleController/trackForm/incompleteTrackForm',
				method: 'GET',
				// body: body,
			}),
		}),
	}),
});

export const { useGetUpdateFormMutation, useGetIncompleteFormMutation } = authApi;
