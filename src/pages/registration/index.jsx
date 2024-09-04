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
	Link,
	Tooltip,
	IconButton,
	useMediaQuery,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
// import { GuestGuard } from '../../components/authentication/guest-guard';
import { ZodError } from 'zod';
import Title from '../../components/common/title';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Logo from '../../assets/logo.jpeg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerValidate, mobileValidate, emailValidate } from '@/validation/auth';
import { useSelector, useDispatch } from 'react-redux';
import { GuestGuard } from '@/guards/guest-guard';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { isDesktop, isAndroid, isIOS, isMobile } from 'react-device-detect';
import { jwtDecode } from 'jwt-decode';

import { useRegisterMutation } from '@/redux/slices/auth';
import { setAuthUserState } from '../../redux/slices/features-slice/user';


// import { useLoaderData } from "react-router-dom";


const items = [
	'Change Your Password Regularly',
	"Pick a password you will remember so you don't have to write it down",
	'Make it more than 10 characters and include capitals numbers and symbol',
	'Use a completely unique password',
];

const datadonot = [
	{
		text: "After successful payment please your email id to get transaction details. Print of the mail has to be submitted as 'Receipt of Online Payment'",
		color: 'error.noteText',
	},
	{
		text: 'use the same password everywhere',
		color: 'error.noteText',
	},
	{
		text: 'use of same pattern of numbers and words like abcd and 1234',
		color: 'error.noteText',
	},
];
export function Component() {
	// const data = useLoaderData() as string;
	const navigate = useNavigate();
	const isMobileScreen = useMediaQuery('(max-width:600px)');
	const dispatch = useDispatch();
	const { i18n, t } = useTranslation();
	
	

	const [state, setState] = useState({
		fullname: '',
		fullnameErr: false,
		fullnameErrMsg: 'Enter Full Name as per HSC Marksheet',
		country: 'India',
		password: '',
		passwordErr: false,
		passwordErrMsg:
			'The password must be between 7 to 15 characters which contain at least one uppercase letter, one lowercase letter, and one number.',
		email: '',
		emailErr: false,
		emailErrMsg: '',
		phone: '',
		phoneErr: false,
		phoneErrMsg: '',
		stateCode: 0,
		stateCodeErr: false,
		stateCodeErrMsg: '',
		districtCode: 0,
		districtCodeErr: false,
		districtCodeErrMsg: '',
		confirmPassword: '',
		confirmPasswordErr: false,
		confirmPasswordErrMsg: '',
		// isWhatsApp: 0,
		// isWhatsAppErr: false,
		// isWhatsAppErrMsg: '',
	});

	const handelChange = (_event) => {
		if (_event.target.name == 'fullname') {
			const a = _event.target.value.toUpperCase();
			setState((_prevState) => ({
				..._prevState,
				[_event.target.name]: a,
				[`${_event.target.name}Err`]: false,
				[`${_event.target.name}ErrMsg`]: '',
			}));
		} else {
			setState((_prevState) => ({
				..._prevState,
				[_event.target.name]: _event.target.value,
				[`${_event.target.name}Err`]: false,
				[`${_event.target.name}ErrMsg`]: '',
			}));
		}
	};

	const validate = (_e) => {
		_e.preventDefault();

		try {
			registerValidate.parse(state);
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
								[`${field}Msg`]: t(error.message),
							}));
						}
					});
			}
			return;
		}

		// return;

		
		/* api call */
	};

	const validateMe = () => {
		let full = state.fullname.trim();
		let trimmedStr = full.replace(/\s+/g, ' ');

		if (full === '') {
			setState({
				...state,
				fullnameErr: true,
				fullnameErrMsg: 'Please enter full name',
			});
			return false;
		} else if (full.length < 2) {
			setState({
				...state,
				fullnameErr: true,
				fullnameErrMsg: 'Full name should be at least 2 characters long',
			});
			return false;
		} else {
			setState({ ...state, fullname: trimmedStr, fullnameErr: false, fullnameErrMsg: '' });
			return true;
		}
	};

	const checkPhoneNumber = async () => {
		try {
			mobileValidate.parse(state);
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
								[`${field}Msg`]: t(error.message),
							}));
						}
					});
			}
			return;
		}

		// try {
		// 	const data = await checkMobileNumber({ phone: state.phone });

		// 	if (data?.data?.isAvailable == 1) {
		// 		setState((_prevState) => ({
		// 			..._prevState,

		// 			phoneErr: false,
		// 			phoneErrMsg: data.data?.message,
		// 		}));
		// 		toast.success(data?.data?.message);
		// 	} else {
		// 		setState((_prevState) => ({
		// 			..._prevState,

		// 			phoneErr: true,
		// 			phoneErrMsg: data.data?.message,
		// 		}));
		// 		toast.error(data?.data?.message);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const checkEmailAddress = async () => {
		try {
			emailValidate.parse(state);
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
								[`${field}Msg`]: t(error.message),
							}));
						}
					});
			}
			return;
		}

		// try {
		// 	const data = await checkEmail({ email: state.email });

		// 	if (data?.data?.isAvailable == 1) {
		// 		setState((_prevState) => ({
		// 			..._prevState,

		// 			emailErr: false,
		// 			emailErrMsg: data.data?.message,
		// 		}));
		// 		toast.success(data?.data?.message);
		// 	} else {
		// 		setState((_prevState) => ({
		// 			..._prevState,

		// 			emailErr: true,
		// 			emailErrMsg: data.data?.message,
		// 		}));
		// 		toast.error(data?.data?.message);
		// 	}
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	

	// return (
	// 	<>
	// 		<Typography
	// 			variant='subtitle2'
	// 			color={'red'}
	// 			sx={{
	// 				mt: isMobile ? 1 : 5,
	// 			}}
	// 		>
	// 			{/* The candidate registration and confirmation process will start on July 18th, 2024. */}
	// 			Candidate Registration and Confirmation Process is Closed as per Scheduled..
	// 		</Typography>
	// 	</>
	// );

	return (
		<GuestGuard>
			<Box component='main'>
				{!isMobileScreen && (
					<Box sx={{ padding: 2, mt: 1 }}>
						<Card
							sx={{
								borderRadius: '10px',
								backgroundColor: 'green.secondary',

								p: 2,
							}}
						>
							<Typography variant='h6' textAlign='start'>
								Important Instructions for Registration:
							</Typography>

							<Grid container spacing={1}>
								<Grid item xs={12} md={12}>
									<Typography variant='subtitle2' sx={{ color: 'green.primary' }}>
										<KeyboardDoubleArrowRightIcon fontSize='small' /> Candidate
										registration process is for capturing data applying for
										First Year Post HSC Diploma Technical Courses in Surface
										Coating Technology {import.meta.env.VITE_CURRENT_YEAR}.
									</Typography>
								</Grid>

								<Grid item xs={12} md={12}>
									<Typography variant='subtitle2' sx={{ color: 'green.primary' }}>
										<KeyboardDoubleArrowRightIcon fontSize='small' /> The data
										will be used for the future reference during admission
										process.
									</Typography>
								</Grid>

								<Grid item xs={12} md={12}>
									<Typography variant='subtitle2' sx={{ color: 'green.primary' }}>
										<KeyboardDoubleArrowRightIcon fontSize='small' /> Data will
										be mapped through Candidate email and mobile number, hence
										Candidates are requested to fill Email-Id and Mobile number
										same as that will be used during admission process.
									</Typography>
								</Grid>

								<Grid item xs={12} md={12}>
									<Typography variant='subtitle2' sx={{ color: 'green.primary' }}>
										<KeyboardDoubleArrowRightIcon fontSize='small' /> The
										password should be between 7 to 15 characters which contain
										at least one numeric digit and a special character.
									</Typography>
								</Grid>
							</Grid>
						</Card>
					</Box>
				)}

				<Container maxWidth='lg'>
					<Grid container spacing={2} sx={{ mt: 0, p: 0, mb: 1 }}>
						<Grid item xs={12} md={8}>
							<Card
								elevation={15}
								sx={{
									p: 1.5,
									mt: 1,
									borderRadius: '10px',
									border: '1px solid #dbd9d9',
								}}
							>
								<Box
									sx={
										{
											// alignItems: 'center',
											// display: 'flex',
											// flexDirection: 'column',
											// justifyContent: 'center',
											// mt: 2,
											// mb: 2,
										}
									}
								>
									<Typography variant='h5' textAlign={'center'}>
										{t('CANDIDATE REGISTRATION')}
									</Typography>
								</Box>
								<Box>
									<form
										noValidate
										onSubmit={validate}
										autoComplete='off'
										//   {...props}
									>
										<Grid container spacing={1} justifyContent='center'>
											<Grid item xs={12} md={12}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<TextField
														helperText={t(state.fullnameErrMsg)}
														error={state.fullnameErr}
														fullWidth
														label={'Candidate Full Name'}
														margin='normal'
														onBlur={validateMe}
														name='fullname'
														onChange={handelChange}
														type='text'
														value={state.fullname}
														size='small'
														// 	InputProps={{
														// 		endAdornment: (
														// 			<Tooltip title="Enter name as per
														// SSC Marksheet">
														// 				<IconButton >
														// 					<HelpSharpIcon />
														// 				</IconButton>
														// 			</Tooltip>
														// 		),
														// 	}}
													/>
													<Box mt={1} mb={1}>
														<Tooltip
															title='Enter name as per
													HSC Marksheet'
														>
															<IconButton
																sx={{ color: 'primary.main' }}
																fontSize='medium'
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>

											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<TextField
														helperText={state.emailErrMsg}
														error={state.emailErr}
														fullWidth
														label={'Email Id'}
														margin='normal'
														name='email'
														onChange={handelChange}
														onBlur={checkEmailAddress}
														type='email'
														value={state.email}
														size='small'
														autoComplete='off'
														onFocus={() => {
															setState((_prevState) => ({
																..._prevState,

																emailErr: false,
																emailErrMsg: '',
															}));
														}}
													/>
													<Box mb={1} mt={1}>
														<Tooltip title='Ensure your email follows the standard format: username@domain.com.'>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>

											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<TextField
														helperText={t(state.phoneErrMsg)}
														error={state.phoneErr}
														fullWidth
														label={'Mobile No'}
														margin='normal'
														name='phone'
														onChange={(e) => {
															if (e.target.value?.length <= 10) {
																handelChange(e);
															}
														}}
														onBlur={checkPhoneNumber}
														type='number'
														value={state.phone}
														size='small'
														onFocus={() => {
															setState((_prevState) => ({
																..._prevState,

																phoneErr: false,
																phoneErrMsg: '',
															}));
														}}
													/>
													<Box mb={1} mt={1}>
														<Tooltip title='All communications will be done on this number such as registration OTP. Make sure this mobile number is authenticated and working.'>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>
											{/* <Grid item xs={12} md={12}>
												<FormControlLabel
													control={
														<Checkbox
															size='small'
															checked={
																state.isWhatsApp == 1 ? true : false
															}
															onChange={(event) => {
																setState((_prevState) => ({
																	..._prevState,
																	isWhatsApp: event.target.checked
																		? 1
																		: 0,
																	isWhatsAppErr: false,
																	isWhatsAppMsg: '',
																}));
															}}
														/>
													}
													label={
														<Typography variant='subtitle2'>
															Do you want to receive further messages
															on Whatsapp?
														</Typography>
													}
													sx={{ mt: -1 }}
												/>{' '}
											</Grid> */}
											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<FormControl fullWidth>
														<InputLabel
															id='demo-simple-select-label'
															sx={{
																color: state.stateCodeErr
																	? 'error.main'
																	: '',
															}}
														>
															{t('Select state')}
														</InputLabel>

														<Select
															labelId='demo-simple-select-label'
															id='demo-simple-select'
															label={'Select State'}
															value={state.stateCode}
															error={state.stateCodeErr}
															onChange={handelChange}
															name='stateCode'
															size='small'
														>
															<MenuItem value={0}>
																<Typography textAlign={'justify'}>
																	Select State
																</Typography>
															</MenuItem>

															{/* {stateData?.data?.map(
																(_state, _index) => {
																	return (
																		<MenuItem
																			value={_state.id}
																			key={_index}
																		>
																			<Typography>
																				{' '}
																				{_state.name}
																			</Typography>
																		</MenuItem>
																	);
																}
															)} */}
														</Select>
														<FormHelperText
															sx={{ color: 'error.main' }}
														>
															{t(state.stateCodeErrMsg)}
														</FormHelperText>
													</FormControl>
													<Box mb={1}>
														<Tooltip title='Select State '>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>
											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<FormControl fullWidth>
														<InputLabel
															id='demo-simple-select-label'
															sx={{
																color: state.districtCodeErr
																	? 'error.main'
																	: '',
															}}
														>
															{t('Select District')}
															{/* <Tooltip title="Select District">
																<IconButton >
																	<HelpSharpIcon />
																</IconButton>
															</Tooltip> */}
														</InputLabel>
														<Select
															labelId='demo-simple-select-label'
															id='demo-simple-select'
															label={'Select District'}
															value={state.districtCode}
															error={state.districtCodeErr}
															onChange={handelChange}
															name='districtCode'
															size='small'
															fullWidth
														>
															<MenuItem value={0}>
																<Typography textAlign={'justify'}>
																	Select District
																</Typography>
															</MenuItem>

															{/* {districtData?.data?.map(
																(_district, _index) => {
																	return (
																		<MenuItem
																			value={_district.id}
																			key={_index}
																		>
																			<Typography>
																				{_district.dis_name}
																			</Typography>
																		</MenuItem>
																	);
																}
															)} */}
														</Select>
														<FormHelperText
															sx={{ color: 'error.main' }}
														>
															{state.stateCodeErrMsg}
														</FormHelperText>
													</FormControl>

													<Box mb={1}>
														<Tooltip title='Select District'>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>{' '}
											</Grid>

											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<TextField
														helperText={t(state.passwordErrMsg)}
														error={state.passwordErr}
														fullWidth
														label={'Password'}
														margin='normal'
														name='password'
														onChange={handelChange}
														type='password'
														value={state.password}
														size='small'
														autoComplete='off'
													/>
													<Box mb={1}>
														<Tooltip title='Must contain at least one number and one uppercase an lowercase letter,and at least 7 or more characters'>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>
											<Grid item xs={12} md={6}>
												<Box
													style={{
														display: 'flex',
														flexDirection: 'row',
													}}
												>
													<TextField
														helperText={t(state.confirmPasswordErrMsg)}
														error={state.confirmPasswordErr}
														// error={Boolean(formik.touched.password && formik.errors.password)}
														fullWidth
														// helperText={formik.touched.password && formik.errors.password}
														label={'Confirm Password'}
														margin='normal'
														name='confirmPassword'
														onChange={handelChange}
														type='password'
														value={state.confirmPassword}
														size='small'
													/>
													<Box mb={1}>
														<Tooltip title='Ensure the enter password matches the original password exactly.'>
															<IconButton
																sx={{ color: 'primary.main' }}
															>
																<HelpSharpIcon />
															</IconButton>
														</Tooltip>
													</Box>
												</Box>
											</Grid>
										</Grid>

										<Box
											sx={{ mt: 2 }}
											width={'100%'}
											display={'flex'}
											justifyContent={'center'}
											// flexDirection={'column'}
										>
											<LoadingButton
												//   disabled={formik.isSubmitting}
												sx={{ width: '50%', alignSelf: 'center' }}
												size='medium'
												type='submit'
												variant='contained'
												// loading={isLoading}
												// fullWidth
											>
												Register
											</LoadingButton>

											{/* <Button
												type='button'
												variant='contained'
												color='error'
												sx={{ width: '100%', maxWidth: '35%' }}
												size='small'
												onClick={() => {
													navigate(
														`/${
															import.meta.env.VITE_SUBFOLDER_NAME
														}/home`
													);
												}}
											>
												{t('Back')}
											</Button> */}
										</Box>
										<Box
											sx={{
												mt: 1,
												display: 'flex',
												flexDirection: 'column',
												mb: 2,
											}}
										>
											<Typography variant='subtitle2'>
												Already Registered?{' '}
												<Link >Login</Link>
											</Typography>
										</Box>
									</form>
								</Box>
							</Card>
						</Grid>
						{!isMobileScreen && (
							<Grid item xs={12} md={4}>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-around',
										height: '100%',
									}}
								>
									<Card
										elevation={15}
										sx={{
											borderRadius: '10px',
											backgroundColor: 'green.secondary',
											p: 2,
										}}
									>
										<Typography variant='h6' textAlign='start'>
											DO'S:
										</Typography>

										<Grid container spacing={1}>
											{items.map((item, index) => (
												<Grid
													item
													xs={12}
													display='flex'
													key={index}
													textAlign={'justify'}
												>
													<Typography
														variant='subtitle2'
														component={'span'}
													>
														<KeyboardDoubleArrowRightIcon
															fontSize='small'
															sx={{ color: 'green.primary' }}
														/>
													</Typography>
													<Typography
														variant='subtitle2'
														sx={{ color: 'green.primary' }}
													>
														{item}
													</Typography>
												</Grid>
											))}
										</Grid>
									</Card>

									<Card
										elevation={15}
										sx={{
											borderRadius: '10px',
											backgroundColor: 'error.noteBackgroundColor',
											p: 2,
										}}
									>
										<Typography variant='h6' textAlign='start'>
											DON'TS :
										</Typography>

										<Grid container spacing={1}>
											{datadonot.map((item, index) => (
												<Grid
													item
													xs={12}
													display='flex'
													key={index}
													textAlign={'justify'}
												>
													<Typography
														variant='subtitle2'
														component={'span'}
														sx={{ color: item.color }}
													>
														<CloseSharpIcon
															fontSize='small'
															sx={{ color: item.color }}
														/>
													</Typography>
													<Typography
														variant='subtitle2'
														sx={{ color: item.color }}
													>
														{item.text}
													</Typography>
												</Grid>
											))}
										</Grid>
									</Card>
								</Box>
							</Grid>
						)}
					</Grid>
				</Container>
			</Box>
		</GuestGuard>
	);
}

Component.displayName = 'Registration';
