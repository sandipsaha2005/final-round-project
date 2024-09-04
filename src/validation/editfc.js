import { z } from 'zod';

export const fcEdit = z.object({
	principalName: z.string().nonempty({ message: 'Required Field' }),

	principalMobile: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
	// principalPhone: z.string(),

	// .max(10, 'Please enter the valid phone number'),

	principalEmail: z.string().refine(
		(value) => {
			if (value.trim() !== '') {
				// If not empty, validate the email format
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			}

			return true;
		},
		{ message: 'Invalid email format or empty' }
	),
	coordinatorName: z.string(),

	coordinatorMobile: z.string().superRefine((val, ctx) => {
		if (val.trim() != '' && val.trim().length !== 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please enter the valid phone number',
			});
		}
	}),
	coordinatorPhone: z.string().superRefine((val, ctx) => {
		if (val.trim() != '' && val.trim().length !== 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Please enter the valid phone number',
			});
		}
	}),

	coordinatorEmail: z.string().refine(
		(value) => {
			if (value.trim() !== '') {
				// If not empty, validate the email format
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			}

			return true;
		},
		{ message: 'Invalid email format or empty' }
	),
});
