import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';

import English from '../../assets/us_flag.svg';
import German from '../../assets/de_flag.svg';

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

export const LanguagePopover = (props) => {
	const { anchorEl, onClose, open, ...other } = props;
	const { i18n, t } = useTranslation();

	const handleChange = (language) => {
		console.log(language, 'language');
		onClose?.();
		i18n.changeLanguage(language);
		toast.success(t('Language changed'));
	};

	// const src =
	//   languageOptions[i18n.language as unknown as keyof typeof languageOptions];

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'bottom',
			}}
			keepMounted
			onClose={onClose}
			open={open}
			PaperProps={{ sx: { width: 240 } }}
			transitionDuration={0}
			{...other}
		>
			{Object.keys(languageOptions).map((language, index) => (
				<MenuItem onClick={() => handleChange(language)} key={index}>
					<ListItemIcon>
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
							{/* {languageOptions[language].icon} */}
							<img
								/* @ts-ignore */
								alt={languageOptions[language].label}
								/* @ts-ignore */
								src={languageOptions[language].icon}
							/>
						</Box>
					</ListItemIcon>
					<ListItemText
						primary={
							<Typography variant='subtitle2'>
								{/* @ts-ignore */}
								{languageOptions[language].label}
							</Typography>
						}
					/>
				</MenuItem>
			))}
		</Popover>
	);
};
