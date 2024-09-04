import PropTypes from 'prop-types';
import {
	Avatar,
	Box,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Popover,
	Typography,
} from '@mui/material';

export const ContactsPopover = (props) => {
	const { anchorEl, onClose, open, ...other } = props;

	return (
		<Popover
			anchorEl={anchorEl}
			anchorOrigin={{
				horizontal: 'center',
				vertical: 'bottom',
			}}
			onClose={onClose}
			open={open}
			PaperProps={{
				sx: {
					p: 2,
					width: 320,
				},
			}}
			transitionDuration={0}
			{...other}
		>
			<Typography variant='h6'>Contacts</Typography>
			<Box sx={{ mt: 2 }}>
				<List disablePadding>
					<ListItem disableGutters>
						<ListItemAvatar>
							<Avatar sx={{ cursor: 'pointer' }} />
						</ListItemAvatar>
						<ListItemText
							disableTypography
							primary={
								<Link
									color='textPrimary'
									noWrap
									sx={{ cursor: 'pointer' }}
									underline='none'
									variant='subtitle2'
								>
									{'contact'}
								</Link>
							}
						/>
						<Typography color='textSecondary' noWrap variant='caption'>
							{/* {formatDistanceToNowStrict(contact.lastActivity)} */}
							{'5 min'}
							ago
						</Typography>
						{/* {contact.isActive ? (
                  <StatusIndicator size="small" status="online" />
                ) : (
                  <Typography color="textSecondary" noWrap variant="caption">
                    
                    {"5 min"}
                    ago
                  </Typography>
                )} */}
					</ListItem>
				</List>
			</Box>
		</Popover>
	);
};

ContactsPopover.propTypes = {
	anchorEl: PropTypes.any,
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
