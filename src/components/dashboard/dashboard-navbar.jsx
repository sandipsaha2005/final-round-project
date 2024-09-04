import { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	ButtonBase,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Menu as MenuIcon } from '../../icons/menu';
import { AccountPopover } from './account-popover';
import { ContactsPopover } from './contacts-popover';
import { ContentSearchDialog } from './content-search-dialog';
import { NotificationsPopover } from './notifications-popover';
import { LanguagePopover } from './language-popover';
import { Bell as BellIcon } from '../../icons/bell';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Search as SearchIcon } from '../../icons/search';
import { Users as UsersIcon } from '../../icons/users';
import { Language as LanguageIcon } from '../../icons/language';

const languages = {
	en: '/static/icons/uk_flag.svg',
	de: '/static/icons/de_flag.svg',
	es: '/static/icons/es_flag.svg',
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.shadows[3],
		  }
		: {
				backgroundColor: theme.palette.background.paper,
				borderBottomColor: theme.palette.divider,
				borderBottomStyle: 'solid',
				borderBottomWidth: 1,
				boxShadow: 'none',
		  }),
}));

export const LanguageButton = () => {
	const anchorRef = useRef(null);
	const { i18n } = useTranslation();
	const [openPopover, setOpenPopover] = useState(false);

	const handleOpenPopover = () => {
		setOpenPopover(true);
	};

	const handleClosePopover = () => {
		setOpenPopover(false);
	};

	const src = languages[i18n.language];

	return (
		<>
			<IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
				<Box
					sx={{
						display: 'flex',
						height: 20,
						width: 20,
						'& img': {
							width: '100%',
						},
					}}
				>
					<LanguageIcon fontSize='small' />
				</Box>
			</IconButton>
			<LanguagePopover
				anchorEl={anchorRef.current}
				onClose={handleClosePopover}
				open={openPopover}
			/>
		</>
	);
};

export const ContentSearchButton = () => {
	const [openDialog, setOpenDialog] = useState(false);

	const handleOpenSearchDialog = () => {
		setOpenDialog(true);
	};

	const handleCloseSearchDialog = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<Tooltip title='Search'>
				<IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
					<SearchIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<ContentSearchDialog onClose={handleCloseSearchDialog} open={openDialog} />
		</>
	);
};

export const ContactsButton = () => {
	const anchorRef = useRef(null);
	const [openPopover, setOpenPopover] = useState(false);

	const handleOpenPopover = () => {
		setOpenPopover(true);
	};

	const handleClosePopover = () => {
		setOpenPopover(false);
	};

	return (
		<>
			<Tooltip title='Contacts'>
				<IconButton onClick={handleOpenPopover} sx={{ ml: 1 }} ref={anchorRef}>
					<UsersIcon fontSize='small' />
				</IconButton>
			</Tooltip>
			<ContactsPopover
				anchorEl={anchorRef.current}
				onClose={handleClosePopover}
				open={openPopover}
			/>
		</>
	);
};

export const NotificationsButton = () => {
	const anchorRef = useRef(null);
	const [unread, setUnread] = useState(0);
	const [openPopover, setOpenPopover] = useState(false);
	// Unread notifications should come from a context and be shared with both this component and
	// notifications popover. To simplify the demo, we get it from the popover

	const handleOpenPopover = () => {
		setOpenPopover(true);
	};

	const handleClosePopover = () => {
		setOpenPopover(false);
	};

	const handleUpdateUnread = (value) => {
		setUnread(value);
	};

	return (
		<>
			<Tooltip title='Notifications'>
				<IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
					<Badge color='error' badgeContent={unread}>
						<BellIcon fontSize='small' />
					</Badge>
				</IconButton>
			</Tooltip>
			<NotificationsPopover
				anchorEl={anchorRef.current}
				onClose={handleClosePopover}
				onUpdateUnread={handleUpdateUnread}
				open={openPopover}
			/>
		</>
	);
};

export const AccountButton = () => {
	const anchorRef = useRef(null);
	const [openPopover, setOpenPopover] = useState(false);
	// To get the user from the authContext, you can use
	// `const { user } = useAuth();`
	const user = {
		avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
		name: 'Anika Visser',
	};

	const handleOpenPopover = () => {
		setOpenPopover(true);
	};

	const handleClosePopover = () => {
		setOpenPopover(false);
	};

	return (
		<>
			<Box
				component={ButtonBase}
				onClick={handleOpenPopover}
				ref={anchorRef}
				sx={{
					alignItems: 'center',
					display: 'flex',
					ml: 2,
				}}
			>
				<Avatar
					sx={{
						height: 30,
						width: 30,
					}}
					src={user.avatar}
				>
					<UserCircleIcon fontSize='small' />
				</Avatar>
			</Box>
			<AccountPopover
				anchorEl={anchorRef.current}
				onClose={handleClosePopover}
				open={openPopover}
			/>
		</>
	);
};

export const DashboardNavbar = (props) => {
	const { onOpenSidebar, ...other } = props;
	const { t } = useTranslation();
	return (
		<>
			<DashboardNavbarRoot
				sx={{
					left: {
						lg: 280,
					},
					width: {
						lg: 'calc(100% - 280px)',
					},
				}}
				{...other}
			>
				<Toolbar
					disableGutters
					sx={{
						minHeight: 64,
						left: 0,
						px: 2,
					}}
				>
					<IconButton
						onClick={onOpenSidebar}
						sx={{
							display: {
								xs: 'inline-flex',
								lg: 'none',
							},
						}}
					>
						<MenuIcon fontSize='small' />
					</IconButton>
					<Box
						sx={{
							pl: 2,
							pt: 2,
						}}
					>
						<Typography color='neutral.900' variant='h6'>
							CET State Common Entrance Test Cell, Maharashtra State, Mumbai 8th
							Floor, New Excelsior Building, A.K.Nayak Marg, Fort, Mumbai-400001.
						</Typography>
						<Typography
							color='neutral.900'
							variant='subtitle2'
							mt={1}
							mb={1}
							sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
						>
							<Typography variant='subtitle2'>
								Post Graduate Professional Technical Course in Architecture [ M.Arch
								] Admission {import.meta.env.VITE_CURRENT_YEAR}
							</Typography>

							<Typography variant='subtitle2'>
								आर्किटेक्चरमधील पदव्युत्तर व्यावसायिक तांत्रिक अभ्यासक्रम [ M.Arch]
								प्रवेश २०२४-२५
							</Typography>
						</Typography>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					{/* <LanguageButton /> */}
					{/* <ContentSearchButton />
					<ContactsButton />
					<NotificationsButton /> */}
					<AccountButton />
				</Toolbar>
			</DashboardNavbarRoot>
		</>
	);
};
