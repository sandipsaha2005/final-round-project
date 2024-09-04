import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
	Button,
	FormHelperText,
	InputAdornment,
} from '@mui/material';
import { forgotPasswordAuth } from '@/validation/auth';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../../../components/common/title';
import { AuthGuard } from '../../../guards/auth-guard';
import { ZodError } from 'zod';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useChangePasswordMutation } from '@/redux/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { GuestGuard } from '@/guards/guest-guard';
import { LoadingButton } from '@mui/lab';

// import { useLoaderData } from "react-router-dom";

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

export function Component() {
	// const data = useLoaderData() as string;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { i18n, t } = useTranslation();
	const [doForgotPasswordAuth, { isLoading, isSuccess, isError, data: loginData, error }] =
		useChangePasswordMutation();

	const [state, setState] = useState({
		oldPasswordword: '',
		oldPasswordErr: false,
		oldPasswordErrMsg: '',
		newPassword: '',
		newPasswordErr: false,
		newPasswordErrMsg: '',
		reNewPassword: '',
		reNewPasswordErr: false,
		reNewPasswordErrMsg: '',
	});

	const validate = (_e) => {
		_e.preventDefault();
		try {
			forgotPasswordAuth.parse(state);
			/* api call */
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues;
				console.log(errors);

				errors.length > 0 &&
					errors.forEach((error) => {
						if (error.message !== '') {
							const field = error.path[0] + 'Err';

							setState((_prevState) => ({
								..._prevState,
								[field]: true,
								[`${field}Msg`]: error.message,
							}));
						}
					});
			}
			return;
		}

		doForgotPasswordAuth({
			oldPassword: state.oldPassword,
			newPassword: state.newPassword,
			reNewPassword: state.reNewPassword,
		});
		/* api call */
	};
	const handelChange = (_event) => {
		setState((_prevState) => ({
			..._prevState,
			[_event.target.name]: _event.target.value,
			[`${_event.target.name}Err`]: false,
			[`${_event.target.name}ErrMsg`]: '',
		}));
	};

	useEffect(() => {
		if (error && isError) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess && loginData) {
			if (loginData) {
				toast.success(loginData?.message);
				navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`);
			}

			// navigate("/dashboard/carrier");
		}
	}, [isSuccess, loginData]);
	return (
		<AuthGuard>
			<Title title={'Forgot Password'} />
			<Card
				sx={{
					mt: 2,
					borderRadius: '10px',
					backgroundColor: 'error.note',
					p: 2,
				}}
			>
				<Typography variant='h6' mt={1} sx={{ textDecoration: 'underline' }}>
					Notes:-
				</Typography>
				<Box display={'flex'}>
					<Typography variant='subtitle2' mt={1} component={'span'}>
						<KeyboardDoubleArrowRightIcon
							fontSize='small'
							sx={{ color: 'primary.main' }}
						/>{' '}
					</Typography>
					<Typography variant='subtitle2' mt={1}>
						The fields marked with (*) are mandatory.
					</Typography>
				</Box>
				<Box display={'flex'}>
					<Typography variant='subtitle2' mt={1} component={'span'}>
						<KeyboardDoubleArrowRightIcon
							fontSize='small'
							sx={{ color: 'primary.main' }}
						/>{' '}
					</Typography>
					<Typography variant='subtitle2' mt={1}>
						Enter your current Password and set the new Password.
					</Typography>
				</Box>
			</Card>

			<Box component='main'>
				<Container maxWidth='lg'>
					<Box
						sx={{
							flexGrow: 1,
							mt: 3,
						}}
					>
						<form
							noValidate
							onSubmit={validate}
							autoComplete='off'
							//   {...props}
						>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12}>
									<TextField
										helperText={t(state.oldPasswordErrMsg)}
										error={state.oldPasswordErr}
										// error={Boolean(formik.touched.password && formik.errors.password)}
										fullWidth
										// helperText={formik.touched.password && formik.errors.password}
										label={t('Enter Old Password *:')}
										margin='normal'
										name='oldPassword'
										// onBlur={formik.handleBlur}
										onChange={handelChange}
										type='password'
										value={state.oldPassword}
										size='small'
										autoComplete='off'
									/>
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField
										helperText={t(state.newPasswordErrMsg)}
										error={state.newPasswordErr}
										// error={Boolean(formik.touched.password && formik.errors.password)}
										fullWidth
										// helperText={formik.touched.password && formik.errors.password}
										label={t('Set New Password *:')}
										margin='normal'
										name='newPassword'
										// onBlur={formik.handleBlur}
										onChange={handelChange}
										type='password'
										value={state.newPassword}
										size='small'
										autoComplete='off'
									/>
								</Grid>

								<Grid item xs={12} md={12}>
									<TextField
										helperText={t(state.reNewPasswordErrMsg)}
										error={state.reNewPasswordErr}
										// error={Boolean(formik.touched.password && formik.errors.password)}
										fullWidth
										// helperText={formik.touched.password && formik.errors.password}
										label={t('Re-Enter New Password *')}
										margin='normal'
										name='reNewPassword'
										// onBlur={formik.handleBlur}
										onChange={handelChange}
										type='password'
										value={state.reNewPassword}
										size='small'
										autoComplete='off'
									/>
								</Grid>
							</Grid>
							<Grid container spacing={2} mt={2} mb={2}>
								<Grid
									item
									xs={6}
									md={6}
									display={'flex'}
									justifyContent={'flex-end'}
								>
									<LoadingButton
										//   disabled={formik.isSubmitting}
										fullWidth
										sx={{ maxWidth: '150px' }}
										size='small'
										type='submit'
										variant='contained'
										loading={isLoading}
										// onClick={handelSubmit}
									>
										{t('Save and Proceed')}
									</LoadingButton>
								</Grid>
								<Grid item xs={6} md={6}>
									<Button
										type='button'
										sx={{ maxWidth: '150px' }}
										variant='contained'
										color='error'
										fullWidth
										size='small'
									>
										{t('Back')}
									</Button>
								</Grid>
							</Grid>{' '}
						</form>
					</Box>
					<Divider sx={{ my: 3 }} />
				</Container>
			</Box>
		</AuthGuard>
	);
}

Component.displayName = 'LoginPage';
