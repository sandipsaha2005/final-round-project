import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import {
	Box,
	Divider,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Popover,
	Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';

// import { Cog as CogIcon } from "../../icons/cog";
// import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
// import { SwitchHorizontalOutlined as SwitchHorizontalOutlinedIcon } from "../../icons/switch-horizontal-outlined";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/features-slice/user';

export const AccountPopover = (props) => {
	const { anchorEl, onClose, open, ...other } = props;
	const router = useNavigate();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// To get the user from the authContext, you can use
	// `const { user } = useAuth();`
	// const user = {
	//   avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
	//   name: "Anika Visser",
	// };

	const handleLogout = async () => {
		try {
			dispatch(logout());
			onClose?.();

			router(`/${import.meta.env.VITE_SUBFOLDER_NAME}/login`);
		} catch (err) {
			console.error(err);
			toast.error('Unable to logout.');
		}
	};

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
			PaperProps={{ sx: { width: 300 } }}
			transitionDuration={0}
			{...other}
		>
			{/* <Box
        sx={{
          alignItems: "center",
          p: 2,
          display: "flex",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
        <Box
          sx={{
            ml: 1,
          }}
        >
          <Typography variant="body1">{user.name}</Typography>
          <Typography color="textSecondary" variant="body2">
            Acme Inc
          </Typography>
        </Box>
      </Box> */}
			<Divider />
			<Box sx={{ my: 1 }}>
				{/* <Link to="/dashboard/social/profile">
          <MenuItem component="a">
            <ListItemIcon>
              <UserCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Profile</Typography>}
            />
          </MenuItem>
        </Link>
        <Link to="/dashboard/account">
          <MenuItem component="a">
            <ListItemIcon>
              <CogIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body1">Settings</Typography>}
            />
          </MenuItem>
        </Link>
        <Link to="/dashboard">
          <MenuItem component="a">
            <ListItemIcon>
              <SwitchHorizontalOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1">Change organization</Typography>
              }
            />
          </MenuItem>
        </Link>
        <Divider /> */}
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<LogoutIcon fontSize='small' />
					</ListItemIcon>
					<ListItemText primary={<Typography variant='body1'>Logout</Typography>} />
				</MenuItem>
				<MenuItem
					onClick={() => {
						navigate(`/${import.meta.env.VITE_SUBFOLDER_NAME}/forgot-password-auth`);
					}}
				>
					<ListItemIcon>
						<LockIcon fontSize='small' />
					</ListItemIcon>
					<ListItemText
						primary={<Typography variant='body1'>Change Password</Typography>}
					/>
				</MenuItem>
			</Box>
		</Popover>
	);
};

AccountPopover.propTypes = {
	anchorEl: PropTypes.any,
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
