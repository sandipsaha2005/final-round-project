import {
	Box,
	Card,
	Container,
	Divider,
	TextField,
	Typography,
	Grid,
	Paper,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
// import { GuestGuard } from '../../components/authentication/guest-guard';

import { useState, useEffect } from 'react';
import { ZodError } from 'zod';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/common/title';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon } from '@mui/icons-material';
import { useNotificationsMutation } from '@/redux/slices/other';
import { AuthGuard } from '../../../guards/auth-guard';
import { createSubFc } from '../../../validation/createSubFc';
import { useCreateFcMutation, useGetFCDetailsMutation } from '../../../redux/slices/createFc';
import { ToastContainer, toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from 'moment';

// import { useLoaderData } from "react-router-dom";

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

export function Component() {
	const { user } = useSelector((state) => state.auth);
	const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
		useCreateFcMutation();
	const [getSubFcList, { data: fcData, isSuccess: isDocSuccess }] = useGetFCDetailsMutation();

	const [state, setstate] = useState({
		phone: '',
		phoneErr: false,
		phoneErrMsg: '',
		password: '',
		passwordErr: false,
		passwordErrMsg: '',
		confirmPassword: '',
		confirmPasswordErr: false,
		confirmPasswordErrMsg: '',
	});

	const handleChange = (_event) => {
		setstate((_prevState) => ({
			..._prevState,
			[_event.target.name]: _event.target.value,
			[`${_event.target.name}Err`]: false,
			[`${_event.target.name}ErrMsg`]: '',
		}));
	};
	const handleSubmit = (_e) => {
		_e.preventDefault();

		try {
			createSubFc.parse(state);
			// API call should not be inside the try block for parsing
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues;
				console.log(errors);

				errors.length > 0 &&
					errors.forEach((error) => {
						if (error.message !== '') {
							const field = error.path[0] + 'Err';

							setstate((_prevState) => ({
								..._prevState,
								[field]: true,
								[`${field}Msg`]: error.message,
							}));
						}
					});
			}
			return;
		}

		// Move the API call code outside the catch block

		update({
			phone: state.phone,

			password: state.password,
			confirmPassword: state.confirmPassword,
		});
	};

	useEffect(() => {
		if (isError && error) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess && updateSuccess) {
			toast.success(updateSuccess?.message);
			getSubFcList();

			setstate({
				phone: '',
				phoneErr: false,
				phoneErrMsg: '',
				password: '',
				passwordErr: false,
				passwordErrMsg: '',
				confirmPassword: '',
				confirmPasswordErr: false,
				confirmPasswordErrMsg: '',
			});
		}
	}, [isSuccess, updateSuccess]);

	useEffect(() => {
		getSubFcList();
	}, []);

	return (
		<AuthGuard>
			<Title title='CREATE YOUR FC' />

			{fcData?.data != null ? (
				<Container maxWidth='sm'>
					<Box
						sx={{
							p: 1.5,
							borderRadius: '10px',
							border: '1px solid #dbd9d9',
							mt: 2,
						}}
					>
						{' '}
						<Typography variant='subtitle2'>
							You have successfully created your FC.
						</Typography>
						<Typography variant='subtitle2' color={'success.main'}>
							To start with FC activity, Logout from Institute and Login through FC
							Login.
						</Typography>
						<Typography variant='subtitle2' color={'primary.main'}>
							Your USERNAME is : <strong>{fcData?.data?.user_name}</strong>
						</Typography>
						<Typography variant='subtitle2' color={'primary.main'}>
							Your PASSWORD is : <strong>{fcData?.data?.fcPassword}</strong>
						</Typography>
					</Box>
				</Container>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12} mt={2}>
						<div className='col-md-9 col-sm-9 col-lg-9'>
							<div id='content'>
								<div className='contentbox'>
									<div className='whitebox'>
										<Card
											sx={{
												mt: 1,
												mb: 1,
												borderRadius: '10px',
												backgroundColor: 'error.note',
												p: 2,
											}}
										>
											<Typography
												variant='h6'
												mt={1}
												sx={{ textDecoration: 'underline' }}
											>
												{'Notes'}:-
											</Typography>
											<Box display={'flex'}>
												<Typography
													variant='subtitle2'
													mt={1}
													component={'span'}
												>
													<KeyboardDoubleArrowRightIcon
														fontSize='small'
														sx={{
															color: 'primary.main',
														}}
													/>{' '}
												</Typography>
												<Typography variant='subtitle2' mt={1}>
													The fields marked with (<Typography
										variant='subtitle2'
										display={'inline-flex'}
										sx={{ color: 'error.main' }}
									>
										*
									</Typography>) are mandatory.
												</Typography>
											</Box>
											<Box display={'flex'}>
												<Typography
													variant='subtitle2'
													mt={1}
													component={'span'}
												>
													<KeyboardDoubleArrowRightIcon
														fontSize='small'
														sx={{
															color: 'primary.main',
														}}
													/>{' '}
												</Typography>
												<Typography variant='subtitle2' mt={1}>
													The FC Username that appears in the textbox is
													your FC Username which will be used for login
													with FC.
												</Typography>
											</Box>
											<Box display={'flex'}>
												<Typography
													variant='subtitle2'
													mt={1}
													component={'span'}
												>
													<KeyboardDoubleArrowRightIcon
														fontSize='small'
														sx={{
															color: 'primary.main',
														}}
													/>{' '}
												</Typography>
												<Typography variant='subtitle2' mt={1}>
													Set a new password for your FC login and use the
													same password for login with FC.
												</Typography>
											</Box>
											<Box display={'flex'}>
												<Typography
													variant='subtitle2'
													mt={1}
													component={'span'}
												>
													<KeyboardDoubleArrowRightIcon
														fontSize='small'
														sx={{
															color: 'primary.main',
														}}
													/>{' '}
												</Typography>
												<Typography variant='subtitle2' mt={1}>
													The password between 7 to 15 characters which
													contain at least one numeric digit and a special
													character.
												</Typography>
											</Box>

											<Box display={'flex'}>
												<Typography
													variant='subtitle2'
													mt={1}
													component={'span'}
												>
													<KeyboardDoubleArrowRightIcon
														fontSize='small'
														sx={{
															color: 'primary.main',
														}}
													/>{' '}
												</Typography>
												<Typography variant='subtitle2' mt={1}>
													Only after you create your FC, you will be able
													to login with FC and start the process of
													activation and confirmation of candidates.
												</Typography>
											</Box>
										</Card>

										<Container maxWidth='sm'>
											<Box
												sx={{
													p: 1.5,
													borderRadius: '10px',
													border: '1px solid #dbd9d9',
												}}
											>
												<Grid container spacing={2} mt={1}>
													<Grid item xs={12} md={6}>
														<Typography variant='subtitle2'>
															FC Username
														</Typography>
													</Grid>
													<Grid item xs={12} md={6}>
														<Typography variant='subtitle2'>
															FC{user?.username}
														</Typography>
													</Grid>
												</Grid>

												<Grid container spacing={2}>
													<Grid item xs={12} md={6}>
														<Typography variant='subtitle2'>
															Enter Mobile No for FC  <Typography
										variant='subtitle2'
										display={'inline-flex'}
										sx={{ color: 'error.main' }}
									>
										*
									</Typography>
														</Typography>
													</Grid>
													<Grid item xs={12} md={6}>
														<TextField
															helperText={state.phoneErrMsg}
															error={state.phoneErr}
															autoFocus
															label=''
															fullWidth
															margin='normal'
															name='phone'
															type='number'
															value={state.phone}
															size='small'
															onChange={(e) => {
																if (e.target.value?.length <= 10) {
																	handleChange(e);
																}
															}}
														/>
													</Grid>
												</Grid>
												<Grid container spacing={2}>
													<Grid item xs={12} md={6}>
														<Typography variant='subtitle2'>
															Enter Password for FC <Typography
										variant='subtitle2'
										display={'inline-flex'}
										sx={{ color: 'error.main' }}
									>
										*
									</Typography>
														</Typography>
													</Grid>
													<Grid item xs={12} md={6}>
														<TextField
															helperText={state.passwordErrMsg}
															error={state.passwordErr}
															autoFocus
															label=''
															fullWidth
															margin='normal'
															name='password'
															onChange={handleChange}
															type='password'
															value={state.password}
															size='small'
														/>
													</Grid>
												</Grid>
												<Grid container spacing={2}>
													<Grid item xs={12} md={6}>
														<Typography variant='subtitle2'>
															Re - Enter Password for FC <Typography
										variant='subtitle2'
										display={'inline-flex'}
										sx={{ color: 'error.main' }}
									>
										*
									</Typography>
														</Typography>
													</Grid>
													<Grid item xs={12} md={6}>
														<TextField
															helperText={state.confirmPasswordErrMsg}
															error={state.confirmPasswordErr}
															autoFocus
															label=''
															fullWidth
															margin='normal'
															name='confirmPassword'
															onChange={handleChange}
															value={state.confirmPassword}
															size='small'
															type='password'
														/>
													</Grid>
												</Grid>
											</Box>
										</Container>
									</div>
								</div>
							</div>
						</div>
					</Grid>
					<Container maxWidth='sm'>
						<Grid container spacing={2} justifyContent='center' alignItems='center'>
							<Grid item xs={6} md={6} mt={2}>
								<LoadingButton
									//   disabled={formik.isSubmitting}
									fullWidth
									size='small'
									type='submit'
									variant='contained'
									// loading={isLoading}
									onClick={handleSubmit}
								>
									{'Create FC'}
								</LoadingButton>
							</Grid>
						</Grid>
					</Container>

					
				</Grid>
			)}
		</AuthGuard>
	);
}
Component.displayName = 'CreateFc';
