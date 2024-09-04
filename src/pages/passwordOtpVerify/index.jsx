import {
	Box,
	Card,
	Container,
	Divider,
	TextField,
	Typography,
	Grid,
	Paper,
	OutlinedInput,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// import { GuestGuard } from '../../components/authentication/guest-guard';
import { ToastContainer, toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GuestGuard } from '@/guards/guest-guard';
import { useTranslation } from 'react-i18next';

import { useForgotPasswordOtpVerifyMutation, useResendOtpMutation } from '@/redux/slices/auth';
import OtpInput from '../../components/OtpInput';

// import { useLoaderData } from "react-router-dom";

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

export function Component() {
	const { i18n, t } = useTranslation();
	const [otpVerify, { data, isLoading, isSuccess, error, isError }] =
		useForgotPasswordOtpVerifyMutation();
	const [resendOtp] = useResendOtpMutation();
	const navigate = useNavigate();
	const [otp, setotp] = useState();
	const [otpError, setotpError] = useState(false);
	const [errorText, setErrorText] = useState('');
	const initialMinutes = 5;
	const [minutes, setMinutes] = useState(initialMinutes);
	const [seconds, setSeconds] = useState(0);
	const [isButtonActive, setIsButtonActive] = useState(false);

	const handelSubmit = async () => {
		try {
			if (otp?.length !== 6) {
				setotpError(true);
				setErrorText('Please enter the correct OTP');
				return;
			}
			const res = await otpVerify({ otp });
			console.log(res);

			if (res?.data?.token) {
				localStorage.removeItem('token');
			} else {
				toast.error(res.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handelResendOtp = async () => {
		try {
			const res = await resendOtp({});
			console.log(res);
			if (res.data) {
				toast.success(res.data.message);
				setMinutes(initialMinutes);
				setSeconds(0);
				setIsButtonActive(false);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (error && isError) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);
	useEffect(() => {
		const timerInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else if (minutes > 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				// Timer has reached 0, you can perform any action here
				clearInterval(timerInterval);
				setIsButtonActive(true);
			}
		}, 1000);

		return () => clearInterval(timerInterval); // Cleanup interval on component unmount
	}, [minutes, seconds]);

	return (
		<GuestGuard>
			<Box
				p={2}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				height={'100%'}
			>
				<Card
					// elevation={10}
					sx={{
						minHeight: '200px',
						p: 2,
						display: 'flex',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexDirection: 'column',
					}}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<OtpInput
						value={otp}
						numInputs={6}
						onChange={(_e) => {
							// setotp(_e);
							// if (otpError) {
							// 	setotpError(false);
							// }
							// if (resentOtpisSuccess) {
							// 	resetOtpCall();
							// }
							setotp(_e);
							setotpError(false);
							setErrorText('');
						}}
						renderInput={(props) => (
							<OutlinedInput
								{...props}
								fullWidth
								error={otpError}
								variant='outlined'
								sx={{
									'& input': {
										color: 'black', // Set text color to black
									},
									'& fieldset': {
										borderColor: 'black', // Set border color to black
									},
									'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button':
										{
											WebkitAppearance: 'none',
											margin: 0,
										},
									'input[type=number]': {
										MozAppearance: 'textfield',
									},
									fontSize: '20px',
								}}
							/>
						)}
					/>

					<Typography variant='body' color='error' component={'p'} textAlign={'left'}>
						{errorText}
					</Typography>
					<Box width={'100%'}>
						<Box
							display={'flex'}
							justifyContent='space-between'
							alignItems={'center'}
							flexDirection={'column'}
							mt={2}
						>
							<LoadingButton
								variant='contained'
								color='primary'
								fullWidth
								// disableElevation
								onClick={handelSubmit}
								className='submit-btn'
								loading={isLoading}
							>
								SEND
							</LoadingButton>

							{/* <LoadingButton
								component='p'
								// variant="body2"
								textAlign={'center'}
								// underline='hover'
								sx={{ cursor: 'pointer' }}
								onClick={handelResendOtp}
								disabled={!isButtonActive}
							>
								Resend OTP
							</LoadingButton> */}
							{/* <Typography variant='body' color='primary' component={'p'}>
								Time Remaining: {String(minutes).padStart(2, '0')}:
								{String(seconds).padStart(2, '0')}
							</Typography> */}
						</Box>
					</Box>
				</Card>
			</Box>
		</GuestGuard>
	);
}

Component.displayName = 'OtpVerify';
