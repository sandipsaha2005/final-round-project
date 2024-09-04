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
} from '@mui/material';
import { ZodError } from 'zod';
// import { GuestGuard } from '../../components/authentication/guest-guard';

import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/common/title';
import { AuthGuard } from '../../../guards/auth-guard';

import {
	FlashAutoRounded,
	KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
} from '@mui/icons-material';

import { fcEdit } from '../../../validation/editfc';
import {
	useEditInstituteMutation,
	useGetFcInstituteDetailsMutation,
} from '../../../redux/slices/insEdit';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

export function Component() {
	const navigate = useNavigate();
	const [update, { isSuccess, isError, error, isLoading, data: updateSuccess }] =
		useEditInstituteMutation();

	const [getdata, { data, isSuccess: getIsSucces, isError: editIsError, error: editError }] =
		useGetFcInstituteDetailsMutation();

	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		getdata();
	}, []);

	useEffect(() => {
		if (getIsSucces && data) {
			setState({
				principalName: data?.data?.coordinator_name,
				principalNameErr: false,
				principalNameErrMsg: '',

				principalMobile: data?.data?.coordinator_mobile_no?.toString(),
				principalMobileErr: false,
				principalMobileErrMsg: '',
				principalPhone: data?.data?.coordinator_phone?.toString(),
				principalPhoneErr: false,
				principalPhoneErrMsg: '',
				principalEmail: data?.data?.coordinator_email,
				principalEmailErr: false,
				principalEmailErrMsg: '',
				coordinatorName: data?.data?.altcoordinator_name,
				coordinatorNameErr: false,
				coordinatorNameErrMsg: '',

				coordinatorMobile:
					data?.data?.altcoordinator_mobile > 0
						? data?.data?.altcoordinator_mobile?.toString()
						: '',
				coordinatorMobileErr: false,
				coordinatorMobileErrMsg: '',
				coordinatorPhone:
					data?.data?.altcoordinator_phone > 0
						? data?.data?.altcoordinator_phone?.toString()
						: '',
				coordinatorPhoneErr: false,
				coordinatorPhoneErrMsg: '',
				coordinatorEmail: data?.data?.altcoordinator_email?.toString(),
				coordinatorEmailErr: false,
				coordinatorEmailErrMsg: '',
			});
		}
	}, [getIsSucces, data]);

	useEffect(() => {
		if (editError && editIsError) {
			toast.error(editError?.message);
		}
	}, [editIsError, editError]);

	const [state, setState] = useState({
		principalName: '',
		principalNameErr: false,
		principalNameErrMsg: '',

		principalMobile: '',
		principalMobileErr: false,
		principalMobileErrMsg: '',
		principalPhone: '',
		principalPhoneErr: false,
		principalPhoneErrMsg: '',
		principalEmail: '',
		principalEmailErr: false,
		principalEmailErrMsg: '',
		coordinatorName: '',
		coordinatorNameErr: false,
		coordinatorNameErrMsg: '',

		coordinatorMobile: '',
		coordinatorMobileErr: false,
		coordinatorMobileErrMsg: '',
		coordinatorPhone: '',
		coordinatorPhoneErr: false,
		coordinatorPhoneErrMsg: '',
		coordinatorEmail: '',
		coordinatorEmailErr: false,
		coordinatorEmailErrMsg: '',
	});

	const handleChange = (_event) => {
		setState((_prevState) => ({
			..._prevState,
			[_event.target.name]: _event.target.value,
			[`${_event.target.name}Err`]: false,
			[`${_event.target.name}ErrMsg`]: '',
		}));
	};

	const handleSubmit = (_e) => {
		_e.preventDefault();

		try {
			fcEdit.parse(state);
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

		update({
			principalName: state.principalName,

			principalMobile: state.principalMobile,

			principalPhone: state.principalPhone,

			principalEmail: state.principalEmail,

			coordinatorName: state.coordinatorName,

			coordinatorMobile: state.coordinatorMobile,

			coordinatorPhone: state.coordinatorPhone,

			coordinatorEmail: state.coordinatorEmail,
		});
	};

	useEffect(() => {
		if (isError && error) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	// 	useEffect(() => {
	// 	update();
	// });

	useEffect(() => {
		if (isSuccess && updateSuccess) {
			toast.success(updateSuccess?.message);
			navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`)
		}
	}, [isSuccess, updateSuccess]);

	return (
		<AuthGuard>
			<Title title={`UPDATE INFO FOR ${user.username} - ${user?.name}`} />
			<Card
				sx={{
					mt: 1,
					mb: 1,
					borderRadius: '10px',
					backgroundColor: 'error.note',
					p: 2,
				}}
			>
				<Typography variant='h6' mt={1} sx={{ textDecoration: 'underline' }}>
					{'Instructions to the Institutes Officer'}:-
				</Typography>
				<Box display={'flex'}>
					<Typography variant='subtitle2' mt={1} component={'span'}>
						<KeyboardDoubleArrowRightIcon
							fontSize='small'
							sx={{ color: 'primary.main' }}
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
					<Typography variant='subtitle2' mt={1} component={'span'}>
						<KeyboardDoubleArrowRightIcon
							fontSize='small'
							sx={{ color: 'primary.main' }}
						/>{' '}
					</Typography>
					<Typography variant='subtitle2' mt={1}>
						Please update the following information as it is useful while contacting.
						Please enter the information of the Co-ordinator who will be available
						during the admission process.
					</Typography>
				</Box>
			</Card>

			<Container maxWidth='md'>
				<form onSubmit={handleSubmit}>
					<Box
						sx={{
							p: 1.5,
							borderRadius: '10px',
							border: '1px solid #dbd9d9',
							mt: 1,
						}}
					>
						<Box mb={1}>
							<Typography variant='subtitle2' sx={{ color: 'primary.main' }}>
								Institute Coordinator Details
							</Typography>
						</Box>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Co-ordinator / Principal Name : <Typography
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
									helperText={state.principalNameErrMsg}
									error={state.principalNameErr}
									autoFocus
									label='Coordinator Name'
									fullWidth
									margin='normal'
									name='principalName'
									onChange={handleChange}
									type='text'
									value={state.principalName}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									{' '}
									Co-ordinator / Principal Mobile : <Typography
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
									helperText={state.principalMobileErrMsg}
									error={state.principalMobileErr}
									label='(for eg : 9372042004)'
									fullWidth
									margin='normal'
									name='principalMobile'
									onChange={(e) => {
										if (e.target.value?.length <= 10) {
											handleChange(e);
										}
									}}
									type='number'
									value={state.principalMobile}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Co-ordinator / Principal Phone :
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									helperText={state.principalPhoneErrMsg}
									error={state.principalPhoneErr}
									label='(for eg : 022-22692102)'
									fullWidth
									margin='normal'
									name='principalPhone'
									onChange={(e) => {
										if (e.target.value?.length <= 10) {
											handleChange(e);
										}
									}}
									type='number'
									value={state.principalPhone}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Co-ordinator / Principal Email : <Typography
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
									helperText={state.principalEmailErrMsg}
									error={state.principalEmailErr}
									label='Coordinator Email'
									fullWidth
									margin='normal'
									name='principalEmail'
									onChange={handleChange}
									type='text'
									value={state.principalEmail}
									size='small'
								/>
							</Grid>
						</Grid>
					</Box>

					<Box
						sx={{
							p: 1.5,
							borderRadius: '10px',
							border: '1px solid #dbd9d9',
							mt: 1,
						}}
					>
						<Box mb={1}>
							<Typography variant='subtitle2' sx={{ color: 'primary.main' }}>
								Alternative Institute Coordinator Details
							</Typography>
						</Box>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Alternative Coordinator Name
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									helperText={state.coordinatorNameErrMsg}
									error={state.coordinatorNameErr}
									label='Alternative Coordinator Name'
									fullWidth
									margin='normal'
									name='coordinatorName'
									onChange={handleChange}
									type='text'
									value={state.coordinatorName}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Alternative Coordinator Mobile
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									helperText={state.coordinatorMobileErrMsg}
									error={state.coordinatorMobileErr}
									label='(for eg : 9372042004)'
									fullWidth
									margin='normal'
									name='coordinatorMobile'
									onChange={(e) => {
										if (e.target.value?.length <= 10) {
											handleChange(e);
										}
									}}
									type='number'
									value={state.coordinatorMobile}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Alternative Coordinator Phone
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									helperText={state.coordinatorPhoneErrMsg}
									error={state.coordinatorPhoneErr}
									label='(for eg : 022-22692102)'
									fullWidth
									margin='normal'
									name='coordinatorPhone'
									onChange={(e) => {
										if (e.target.value?.length <= 10) {
											handleChange(e);
										}
									}}
									type='number'
									value={state.coordinatorPhone}
									size='small'
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<Typography variant='subtitle2'>
									Alternative Coordinator Email
								</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									helperText={state.coordinatorEmailErrMsg}
									error={state.coordinatorEmailErrMsg}
									label='Alternative Coordinator Email'
									fullWidth
									margin='normal'
									name='coordinatorEmail'
									onChange={handleChange}
									type='text'
									value={state.coordinatorEmail}
									size='small'
								/>
							</Grid>
						</Grid>
					</Box>
					<Grid container spacing={2} mt={2}>
						<Grid item xs={6} md={6} display={'flex'} justifyContent={'flex-end'}>
							<LoadingButton
								// ={formik.isSubmitting}
								fullWidth
								size='small'
								type='submit'
								variant='contained'
								sx={{ maxWidth: '150px' }}
								loading={isLoading}
							>
								Save
							</LoadingButton>
						</Grid>
						<Grid item xs={6} md={6}>
							<Button
								type='button'
								variant='contained'
								color='error'
								fullWidth
								size='small'
								sx={{ maxWidth: '150px' }}
								onClick={() => {
									navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`);
								}}
							>
								{'Back'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</AuthGuard>
	);
}
Component.displayName = 'EditFc';
