import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
	FormHelperText,
	InputAdornment,
	useMediaQuery,
} from '@mui/material';
import Title from '../../components/common/title';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../../assets/logo.jpeg';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ZodError } from 'zod';
import fclogin from '../../assets/fclogin.webp';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/slices/auth';
import { loginValidate } from '@/validation/auth';
import { useSelector, useDispatch } from 'react-redux';
import { GuestGuard } from '@/guards/guest-guard';
import { LoadingButton } from '@mui/lab';
import ReCAPTCHA from 'react-google-recaptcha';

import { setAuthUserState } from '../../redux/slices/features-slice/user';

// import { useLoaderData } from "react-router-dom";



export function Component() {
	// const data = useLoaderData() as string;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { i18n, t } = useTranslation();
	const [doLogin, { isLoading, isSuccess, isError, data: loginData, error }] = useLoginMutation();

	const [state, setState] = useState({
		password: '',
		passwordErr: false,
		passwordErrMsg: '',
		userId: '',
		userIdErr: false,
		userIdErrMsg: '',
	});

	const [captcha, setcaptcha] = useState('');

	const handelChange = (_event) => {
		setState((_prevState) => ({
			..._prevState,
			[_event.target.name]: _event.target.value,
			[`${_event.target.name}Err`]: false,
			[`${_event.target.name}ErrMsg`]: '',
		}));
	};

	const validate = (_e) => {
		_e.preventDefault();
		try {
			if (captcha?.trim() == '') {
				toast.error('Please fill the captcha');
				return;
			}
			loginValidate.parse(state);
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

		doLogin({
			userId: state.userId,
			password: state.password,
			captcha: captcha,
		});
		/* api call */
	};

	const onRecapchaChange = async (value) => {
		console.log('capchat', value);
		setcaptcha(value);
	};

	useEffect(() => {
		if (error && isError) {
			// if ('status' in error) {
			// 	/* inactive user */

			// 	setState((_prevState) => ({
			// 		..._prevState,
			// 		emailErr: true,
			// 		emailErrMsg: 'Email or Password is not matching',
			// 	}));
			// }
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess && loginData) {
			console.log(loginData);
			// return;
			if (loginData?.data?.token) {
				localStorage.setItem('token', loginData?.data?.token);
				// login(loginData.data.token, loginData.data.userDetails);
				toast.success(loginData?.message);
				dispatch(
					setAuthUserState({
						isAuthenticated: 'authenticated',
						user: {
							username: loginData?.data?.username,
							userId: loginData?.data?.user_id,
							userrole: loginData?.data?.userrole,
						},
						isInitialized: true,
					})
				);

				navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`);
			}

			// navigate("/dashboard/carrier");
		}
	}, [isSuccess, loginData]);

	const isMobile = useMediaQuery('(max-width:600px)');

	return (
		<GuestGuard>
			<Box
				component='main'
				//height={'80vh'}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				sx={{ mt: isMobile ? 1 : 5 }}
			>
				<Container maxWidth='md'>
					<Card
						elevation={15}
						sx={{
							// p: 1.5,
							mt: 1,
							borderRadius: '10px',
							border: '1px solid #dbd9d9',
						}}
					>
						<Grid container spacing={2}>
							<Grid
								item
								xs={12}
								md={6}
								// sx={{ backgroundColor: 'black', height: '100%' }}
							>
								<Box
									sx={{
										p: { xs: 0, sm: 2, md: 2 },
										// minHeight: '100vh',
									}}
								>
									<Box>
										<Typography variant='h5' textAlign={'center'}>
											INSTITUTE LOGIN
										</Typography>
									</Box>
									<Box
										mt={2}
										sx={{
											flexGrow: 1,
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
														helperText={t(state.userIdErrMsg)}
														error={state.userIdErr}
														autoFocus
														fullWidth
														label={t('Username')}
														margin='normal'
														name='userId'
														onChange={(e) => {
															if (e.target.value?.length <= 5) {
																handelChange(e);
															}
														}}
														type='text'
														value={state.userId}
														size='small'
													/>
												</Grid>

												<Grid item xs={12} md={12}>
													<TextField
														helperText={t(state.passwordErrMsg)}
														error={state.passwordErr}
														// error={Boolean(formik.touched.password && formik.errors.password)}
														fullWidth
														// helperText={formik.touched.password && formik.errors.password}
														label={t('Password')}
														margin='normal'
														name='password'
														// onBlur={formik.handleBlur}
														onChange={handelChange}
														type='password'
														value={state.password}
														size='small'
														autoComplete='off'
													/>
												</Grid>
												<Grid item xs={12}>
													<ReCAPTCHA
														sitekey={`${
															import.meta.env.VITE_GOOGLE_SITE_KEY
														}`}
														onChange={onRecapchaChange}
														style={{ width: '100%', maxWidth: '85%' }}
														type='image'
													/>
												</Grid>
											</Grid>

											<Box
												sx={{ mt: 2 }}
												width={'100%'}
												display={'flex'}
												justifyContent={'flex-start'}
												flexDirection={'column'}
											>
												<LoadingButton
													sx={{ width: '50%', alignSelf: 'center' }}
													size='small'
													type='submit'
													variant='contained'
													loading={isLoading}
												>
													Login
												</LoadingButton>

												<Box sx={{ mt: 2 }}>
													<Link
														to={`/${
															import.meta.env.VITE_SUBFOLDER_NAME
														}/forgot-password`}
													>
														<Typography
															variant='subtitle2'
															color='primary'
															component={'p'}
														>
															Forgot Password?
														</Typography>
													</Link>
												</Box>
											</Box>
										</form>
									</Box>
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
								sx={{
									backgroundColor: '#a6e8a6',
								}}
							>
								<Box
									sx={{
										p: { xs: 1, sm: 2, md: 2 },
										// minHeight: '100vh',
									}}
								>
									<Box>
										<Typography
											variant='h5'
											sx={{ color: '#005600', textDecoration: 'underline' }}
										>
											Important Instructions for Login
										</Typography>
									</Box>
									<Box display={'flex'} alignItems={'center'} mt={1}>
										<Typography variant='subtitle2' component={'span'}>
											<KeyboardDoubleArrowRightIcon
												fontSize='small'
												sx={{ color: '#005600' }}
											/>
										</Typography>
										<Box>
											<Typography
												variant='subtitle2'
												sx={{ color: '#005600' }}
											>
												Please enter 4 digit institute code provided by
												CET(for ex: 1002)
											</Typography>
										</Box>
									</Box>
									<Box display={'flex'} alignItems={'center'} mt={1}>
										<Typography variant='subtitle2' component={'span'}>
											<KeyboardDoubleArrowRightIcon
												fontSize='small'
												sx={{ color: '#005600' }}
											/>
										</Typography>
										<Box>
											<Typography
												variant='subtitle2'
												sx={{ color: '#005600' }}
											>
												Enter Application ID & Password and Click on Login
												Button.
											</Typography>
										</Box>
									</Box>
									<Box display={'flex'} alignItems={'center'} mt={1}>
										<Typography variant='subtitle2' component={'span'}>
											<KeyboardDoubleArrowRightIcon
												fontSize='small'
												sx={{ color: '#005600' }}
											/>
										</Typography>
										<Box>
											<Typography
												variant='subtitle2'
												sx={{ color: '#005600' }}
											>
												Do not share your username and password.
											</Typography>
										</Box>
									</Box>

									<Box display={'flex'} alignItems={'center'} mt={1}>
										<Typography variant='subtitle2' component={'span'}>
											<KeyboardDoubleArrowRightIcon
												fontSize='small'
												sx={{ color: '#005600' }}
											/>
										</Typography>
										<Box>
											<Typography
												variant='subtitle2'
												sx={{ color: '#005600' }}
											>
												Log Out your session properly after completing
												activity.
											</Typography>
										</Box>
									</Box>
								</Box>
							</Grid>
						</Grid>
					</Card>
				</Container>
			</Box>
		</GuestGuard>
	);
}

Component.displayName = 'LoginPage';
