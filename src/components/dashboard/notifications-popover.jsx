import { Fragment, useEffect, useMemo, useState } from 'react';

//import { format, subDays, subHours } from 'date-fns';
import {
	Avatar,
	Box,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Popover,
	Tooltip,
	Typography,
} from '@mui/material';
import { ChatAlt as ChatAltIcon } from '../../icons/chat-alt';
import { MailOpen as MailOpenIcon } from '../../icons/mail-open';
import { X as XIcon } from '../../icons/x';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
// import { Notification } from '../../types/notification';
import { Scrollbar } from '../scrollbar';

const getNotificationContent = (notification) => {
	switch (notification.type) {
		case 'job_add':
			return (
				<>
					<ListItemAvatar sx={{ mt: 0.5 }}>
						<Avatar src={notification.avatar}>
							<UserCircleIcon fontSize='small' />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								<Typography sx={{ mr: 0.5 }} variant='subtitle2'>
									{notification.author}
								</Typography>
								<Typography sx={{ mr: 0.5 }} variant='body2'>
									added a new job
								</Typography>
								<Link href='/dashboard/jobs' underline='always' variant='body2'>
									{notification.job}
								</Link>
							</Box>
						}
						secondary={
							<Typography color='textSecondary' variant='caption'>
								{111}
							</Typography>
						}
						sx={{ my: 0 }}
					/>
				</>
			);
		case 'new_feature':
			return (
				<>
					<ListItemAvatar sx={{ mt: 0.5 }}>
						<Avatar>
							<ChatAltIcon fontSize='small' />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexWrap: 'wrap',
								}}
							>
								<Typography variant='subtitle2' sx={{ mr: 0.5 }}>
									New feature!
								</Typography>
								<Typography variant='body2'>{notification.description}</Typography>
							</Box>
						}
						secondary={
							<Typography color='textSecondary' variant='caption'>
								{333}
							</Typography>
						}
						sx={{ my: 0 }}
					/>
				</>
			);
		case 'company_created':
			return (
				<>
					<ListItemAvatar sx={{ mt: 0.5 }}>
						<Avatar src={notification.avatar}>
							<UserCircleIcon fontSize='small' />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Box
								sx={{
									alignItems: 'center',
									display: 'flex',
									flexWrap: 'wrap',
									m: 0,
								}}
							>
								<Typography sx={{ mr: 0.5 }} variant='subtitle2'>
									{notification.author}
								</Typography>
								<Typography variant='body2' sx={{ mr: 0.5 }}>
									created
								</Typography>
								<Link href='/dashboard/jobs' underline='always' variant='body2'>
									{notification.company}
								</Link>
							</Box>
						}
						secondary={
							<Typography color='textSecondary' variant='caption'>
								{444}
							</Typography>
						}
						sx={{ my: 0 }}
					/>
				</>
			);
		default:
			return <Fragment />;
	}
};

export const NotificationsPopover = (props) => {
	const { anchorEl, onClose, onUpdateUnread, open, ...other } = props;
	// const [notifications, setNotifications] = useState(data);
	const [notifications, setNotifications] = useState([]);
	const unread = useMemo(
		() => notifications.reduce((acc, notification) => acc + (notification.read ? 0 : 1), 0),
		[notifications]
	);

	useEffect(() => {
		onUpdateUnread?.(unread);
	}, [onUpdateUnread, unread]);

	const handleMarkAllAsRead = () => {
		setNotifications((prevState) =>
			prevState.map((notification) => ({
				...notification,
				read: true,
			}))
		);
	};

	const handleRemoveOne = (notificationId) => {
		setNotifications((prevState) =>
			prevState.filter((notification) => notification.id !== notificationId)
		);
	};

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'left',
				vertical: 'bottom',
			}}
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 380 } }}
			transitionDuration={0}
			{...other}
		>
			<Box
				sx={{
					alignItems: 'center',
					backgroundColor: 'primary.main',
					color: 'primary.contrastText',
					display: 'flex',
					justifyContent: 'space-between',
					px: 3,
					py: 2,
				}}
			>
				<Typography color='inherit' variant='h6'>
					Notifications
				</Typography>
				<Tooltip title='Mark all as read'>
					<IconButton
						onClick={handleMarkAllAsRead}
						size='small'
						sx={{ color: 'inherit' }}
					>
						<MailOpenIcon fontSize='small' />
					</IconButton>
				</Tooltip>
			</Box>
			{notifications.length === 0 ? (
				<Box sx={{ p: 2 }}>
					<Typography variant='subtitle2'>There are no notifications</Typography>
				</Box>
			) : (
				<Scrollbar sx={{ maxHeight: 400 }}>
					<List disablePadding>
						{notifications.map((notification) => (
							<ListItem
								divider
								key={notification.id}
								sx={{
									alignItems: 'flex-start',
									'&:hover': {
										backgroundColor: 'action.hover',
									},
									'& .MuiListItemSecondaryAction-root': {
										top: '24%',
									},
								}}
								secondaryAction={
									<Tooltip title='Remove'>
										<IconButton
											edge='end'
											onClick={() => handleRemoveOne(notification.id)}
											size='small'
										>
											<XIcon sx={{ fontSize: 14 }} />
										</IconButton>
									</Tooltip>
								}
							>
								{getNotificationContent(notification)}
							</ListItem>
						))}
					</List>
				</Scrollbar>
			)}
		</Popover>
	);
};
