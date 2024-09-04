import {
	AppBar,
	Box,
	Container,
	IconButton,
	Link as MuiLink,
	Toolbar,
	Typography,
} from '@mui/material';
import { Menu as MenuIcon } from '@/icons/menu';
import { Logo } from '@/components/logo';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';

import English from '../../assets/us_flag.svg';
import German from '../../assets/de_flag.svg';
import { Language as LanguageIcon } from '../../icons/language';

const languageOptions = {
	en: {
		icon: English,
		label: 'English',
	},
	mar: {
		icon: German,
		label: 'Marathi',
	},
};
const languages = {
	en: '/static/icons/uk_flag.svg',
	de: '/static/icons/de_flag.svg',
	es: '/static/icons/es_flag.svg',
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	// backgroundColor: 'red',
	// height: '100px',
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

import { LanguagePopover } from '../dashboard/language-popover';

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

export const MainNavbar = (props) => {
	const { t } = useTranslation();
	const { onOpenSidebar, ...other } = props;

	return (
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
						Tech-hub
					</Typography>
					<Typography
						color='neutral.900'
						variant='subtitle2'
						mt={1}
						mb={1}
						sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
					>
						<Typography variant='subtitle2'>
							{' '}
							navbat
						</Typography>

						<Typography variant='subtitle2'>
							{' '}
							content
						</Typography>
					</Typography>
				</Box>
				<Box sx={{ flexGrow: 1 }} />

				{/* <LanguageButton /> */}
				{/* <ContentSearchButton />
					<ContactsButton />
					<NotificationsButton /> */}
				{/* <AccountButton /> */}
			</Toolbar>
		</DashboardNavbarRoot>
	);
};
