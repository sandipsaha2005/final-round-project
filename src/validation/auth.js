import { z } from 'zod';

export const loginValidate = z.object({
	password: z.string(),
	// .min(8, 'Invalid Credentials')
	// .max(16, 'Invalid Credentials')
	// .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/, 'Invalid Credentials'),

	userId: z
		.string()
		.min(4, 'Please enter the valid User Id')
		.max(5, 'Please enter the valid User Id '),
});

export const registerValidate = z
	.object({
		email: z.string().email().nonempty({ message: 'Please enter the email address' }),

		fullname: z.string().superRefine((val, ctx) => {
			if (val.trim() === '') {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,

					message: 'Please enter  Fullname',
					fatal: true,
				});
				return z.NEVER;
			}
			const regex = /^[A-Za-z' ]{2,}$/;

			if (!regex.test(val)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please enter valid name',
				});
			}
		}),
		stateCode: z.number().min(1, 'Please enter the state'),
		districtCode: z.number().min(1, 'Please enter the district'),
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

export const mobileValidate = z.object({
	phone: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
});
export const emailValidate = z.object({
	email: z.string().email().nonempty({ message: 'Please enter the email address' }),
});

export const forgotPassword = z.object({
	phone: z
		.string()
		.nonempty({ message: 'Please enter the phone number' })
		.min(10, 'Please enter the valid phone number')
		.max(10, 'Please enter the valid phone number'),
	userId: z
		.string()
		.min(6, 'Please enter the valid User Id')
		.max(6, 'Please enter the valid User Id '),
});

export const forgotPasswordAuth = z
	.object({
		oldPassword: z.string(),

		newPassword: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(16, 'Password is too long (max 16 characters)')
			.regex(
				/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/,
				'Password must contain at least one uppercase letter, one lowercase letter, one scpecial character and one number'
			),

		reNewPassword: z
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
