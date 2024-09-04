import { z } from 'zod';

export const createSubFc = z
	.object({
		phone: z
			.string()
			.nonempty({ message: 'Please enter the phone number' })
			.min(10, 'Please enter the valid phone number')
			.max(10, 'Please enter the valid phone number'),

		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(16, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),
		confirmPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(16, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});
