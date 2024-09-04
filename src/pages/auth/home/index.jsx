import { Box, Card, Container, Divider, TextField, Typography, Grid, Paper } from '@mui/material';
// import { GuestGuard } from '../../components/authentication/guest-guard';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/common/title';
import { GuestGuard } from '@/guards/guest-guard';
import { useTranslation } from 'react-i18next';
import { KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon } from '@mui/icons-material';
import { useNotificationsMutation } from '@/redux/slices/other';
import { AuthGuard } from '../../../guards/auth-guard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// import { useLoaderData } from "react-router-dom";

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

export function Component() {
	const { t } = useTranslation();
	const [msgCount, setMsgCount] = useState(0);
	const [log, setLog] = useState(0);
	const [url, setUrl] = useState('');
	const [candidateCount, setCandidateCount] = useState(0);
	const [succ, setSucc] = useState(false); // New state to handle success status

	useEffect(() => {
		// Simulating API calls or data retrieval
		const fetchMsgCount = async () => {
			// Simulating message count data
			const msgCountData = 5; // Example value
			setMsgCount(msgCountData);
		};

		const fetchCandidateCount = async () => {
			// Simulating candidate count data
			const candidateCountData = 0; // Example value
			setCandidateCount(candidateCountData);
		};

		fetchMsgCount();
		fetchCandidateCount();

		// Simulating the log and URL data
		setLog(1);
		setUrl('your-url-here');

		// Check if succ=1 in the URL query
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('succ') === '1') {
			setSucc(true);
		}
	}, []);

	// Placeholder function for handleChange
	const handleChange = (e) => {
		// Placeholder logic
	};

	return (
		<AuthGuard>
			{/* Render success status if log is 1 */}

			{/* Render success status if succ is true */}
			{succ && (
				<div className='status success'>
					<p className='closestatus'>
						<a href={url} title='Close'>
							x
						</a>
					</p>
					<p>
						{/* <img src="../../images/icons/icon_success.png" alt="Success" /> */}
						<span>Success!</span> Details saved successfully
					</p>
				</div>
			)}

			{/* Content box */}
			<div className='contentbox'>
				{/* Admission details */}
				<div className='conthead'>
					<Title title={`INSTRUCTIONS TO THE INSTITUTE OFFICER`} />
				</div>

				{/* Unread message count */}

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
							The Institute shall be following the following two steps to Lock the
							data:
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
							Step 1: Upload the Leaving Certificate of the Candidate, if not uploaded
							during uploading the admission of the candidate.
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
							Step 2: The institute shall mark the candidates for Cancellation who
							have cancelled the Admissions after the Cut Off date. The institute
							shall not require to submit the document of such candidates.
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
							Institute need to lock data of all the admitted candidates and submit to
							Regional Offer (RO) for Merit List Verification.
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
							Take the Print of the Admitted Candidates provided in ‘Choice Code wise
							Composite Report’. The candidate marked for cancellation shall be
							reflected with red colour.
						</Typography>
					</Box>
				</Card>

				{/* Candidate count */}
				{/* <div className='conthead'>
					<Title title='Grievance and Allotment Cancellation Requests' />
				</div> */}
			</div>
		</AuthGuard>
	);
}

Component.displayName = 'FcHome';
