import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
	CardHeader,
	Avatar,
	CardContent,
	Link as RouterLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { GuestGuard } from '../../components/authentication/guest-guard';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Title from '@/components/common/title';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { GuestGuard } from '@/guards/guest-guard';
import { Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import {
	useNotificationsMutation,
	useDownloadMutation,
	useNewsMutation,
} from '@/redux/slices/other';

// import { useLoaderData } from "react-router-dom";



export function Component() {
	// const data = useLoaderData() as string;
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	// const [getNotifications, { data, isLoading, isSuccess }] = useNotificationsMutation();
	const [
		getNotifications,
		{
			data: notificationsData,
			isLoading: notificationsLoading,
			isSuccess: notificationsSuccess,
		},
	] = useNotificationsMutation();
	const [getNews, { data: newsData, isLoading: newsLoading, isSuccess: newsSuccess }] =
		useNewsMutation();
	const [
		getDownload,
		{ data: downloadData, isLoading: downloadLoading, isSuccess: downloadSuccess },
	] = useDownloadMutation();
	useEffect(() => {
		if (i18n.language) {
			getNotifications(i18n.language);
		}
		if (i18n.language) {
			getDownload(i18n.language);
		}
		if (i18n.language) {
			getNews(i18n.language);
		}
	}, [i18n.language]);

	return (
		<GuestGuard>
			<Box flexDirection={'row'} display={'flex'} pb={1}>
				<Typography
					sx={{ backgroundColor: 'error.main' }}
					p={2}
					variant='h6'
					color='background.sideBar'
				>
					IMPORTANT
				</Typography>
				<Box display={'flex'} alignItems={'center'} width={'100%'}>
					<marquee>
						<Typography color={'primary.main'} variant='subtitle2'>
							<Typography component={'span'} color='error.main' variant='inherit'>
								New!
							</Typography>
							Comming soon
						</Typography>
					</marquee>
				</Box>
			</Box>

			<Box>
				<Grid container spacing={2}>
					<Grid item container xs={12} md={8}></Grid>
					<Grid item container xs={12} md={4}>
						<Grid item xs={12} p={2}>
							<Card>
								<Box
									display='flex'
									justifyContent='space-between'
									p={1}
									backgroundColor='primary.main'
									color='background.sideBar'
								>
									<Typography variant='h6'>Notification</Typography>
									<RouterLink
										component={Link}
										to={`/${import.meta.env.VITE_SUBFOLDER_NAME}/notifications`}
										underline='none'
										// color='background.sideBar'
									>
										<Typography
											variant='subtitle2'
											textAlign='end'
											sx={{ cursor: 'pointer', textDecoration: 'underline' }}
											color='background.sideBar'
										>
											Show More
										</Typography>
									</RouterLink>
								</Box>
								<CardContent sx={{ p: 0 }}>
									<Box>
										<marquee
											width='100%'
											direction='up'
											height='100px'
											scrollamount='2'
											onMouseOver={(event) => {
												event.currentTarget.stop();
											}}
											onMouseOut={(event) => {
												event.currentTarget.start();
											}}
										>
											<Typography variant='subtitle2' component={'ul'}>
												{notificationsSuccess &&
													notificationsData?.data?.map((_e) => (
														<li>{_e.title}</li>
													))}
											</Typography>
										</marquee>
									</Box>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} p={2}>
							<Card>
								<Box
									display='flex'
									justifyContent='space-between'
									p={1}
									backgroundColor='primary.main'
									color='background.sideBar'
								>
									<Typography variant='h6'>News</Typography>
									<RouterLink
										component={Link}
										to={`/${import.meta.env.VITE_SUBFOLDER_NAME}/news`}
										underline='none'
										// color='background.sideBar'
									>
										<Typography
											variant='subtitle2'
											textAlign='end'
											sx={{ cursor: 'pointer', textDecoration: 'underline' }}
											color='background.sideBar'
										>
											Show More
										</Typography>
									</RouterLink>
								</Box>
								<CardContent sx={{ p: 0 }}>
									<Box>
										<marquee
											width='100%'
											direction='up'
											height='100px'
											scrollamount='2'
											onMouseOver={(event) => {
												event.currentTarget.stop();
											}}
											onMouseOut={(event) => {
												event.currentTarget.start();
											}}
										>
											<Typography variant='subtitle2' component={'ul'}>
												{newsSuccess &&
													newsData?.data?.map((_e) => <li>{_e.news}</li>)}
											</Typography>
										</marquee>
									</Box>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} p={2}>
							<Card>
								<Box
									display='flex'
									justifyContent='space-between'
									p={1}
									backgroundColor='primary.main'
									color='background.sideBar'
								>
									<Typography variant='h6'>Download</Typography>
									<RouterLink
										component={Link}
										to={`/${import.meta.env.VITE_SUBFOLDER_NAME}/download`}
										underline='none'
										// color='background.sideBar'
									>
										<Typography
											variant='subtitle2'
											textAlign='end'
											sx={{ cursor: 'pointer', textDecoration: 'underline' }}
											color='background.sideBar'
										>
											Show More
										</Typography>
									</RouterLink>
								</Box>
								<CardContent sx={{ p: 0 }}>
									<Box>
										<marquee
											width='100%'
											direction='up'
											height='100px'
											scrollamount='2'
											onMouseOver={(event) => {
												event.currentTarget.stop();
											}}
											onMouseOut={(event) => {
												event.currentTarget.start();
											}}
										>
											<Typography variant='subtitle2' component={'ul'}>
												{downloadSuccess &&
													downloadData.data.map((_e) => (
														<li>{_e.name}</li>
													))}
											</Typography>
										</marquee>
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</GuestGuard>
	);
}

Component.displayName = 'Home';
