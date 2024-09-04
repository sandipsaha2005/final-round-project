import { useState } from 'react';

import { Box, Button, Collapse, ListItem } from '@mui/material';

import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const DashboardSidebarItem = (props) => {
	const { userrole } = useSelector((state) => state.auth?.user);
	const {
		active,
		children,
		chip,
		depth,
		icon,
		info,
		open: openProp,
		path,
		title,
		external,
		status,
		windowopen,
		type,
		user,
		...other
	} = props;
	console.log(user);
	const [open, setOpen] = useState(openProp);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	let paddingLeft = 24;

	if (depth > 0) {
		paddingLeft = 32 + 8 * depth;
	}

	// Branch
	if (children) {
		return (
			<ListItem
				disableGutters
				sx={{
					display: 'block',
					mb: 0.5,
					py: 0,
					px: 2,
					width: '100%',
				}}
				{...other}
			>
				<Button
					endIcon={
						!open ? (
							<ChevronRightIcon fontSize='small' />
						) : (
							<ChevronDownIcon fontSize='small' />
						)
					}
					disableRipple
					onClick={handleToggle}
					startIcon={icon}
					sx={{
						color: '#fff',
						justifyContent: 'flex-start',
						pl: `${paddingLeft}px`,
						pr: 3,
						textAlign: 'left',
						textTransform: 'none',
						width: '100%',
						backgroundColor: '#1d6ba1',
						'&:hover': {
							backgroundColor: 'rgba(255,255,255, 0.08)',
							color: 'neutral.700',
						},
						'& .MuiButton-startIcon': {
							color: active ? 'secondary.main' : 'neutral.400',
						},
						'& .MuiButton-endIcon': {
							color: 'neutral.400',
						},
					}}
				>
					<Box sx={{ flexGrow: 1 }}>{title}</Box>
					{info}
				</Button>
				<Collapse in={open} sx={{ mt: 0.5 }}>
					{children}
				</Collapse>
			</ListItem>
		);
	}

	// Leaf
	return (
		<>
			<ListItem
				disableGutters
				sx={{
					display: 'flex',
					mb: 0,
					mt: 0,
					py: 0,
					px: 2,
				}}
			>
				{windowopen ? (
					<Button
						component='a'
						startIcon={icon}
						endIcon={chip}
						disableRipple
						/* @ts-ignore */
						sx={{
							backgroundColor: active ? 'primary.main' : undefined,
							borderRadius: 1,
							color: active ? 'background.sideBar' : 'neutral.700',
							// fontWeight: active && 'fontWeightBold',
							justifyContent: 'flex-start',
							pl: `${paddingLeft}px`,
							pr: 3,
							textAlign: 'left',
							textTransform: 'none',
							width: '100%',
							'& .MuiButton-startIcon': {
								color: active ? 'background.sideBar' : 'neutral.700',
							},

							'&:hover': {
								// backgroundColor: undefined,
								color: 'primary.main',
								'& .MuiButton-startIcon': {
									color: 'primary.main',
								},
							},
						}}
						onClick={() => window.open(path, '_self')}
					>
						<Box sx={{ flexGrow: 1 }}>{title}</Box>
						{info}
					</Button>
				) : (
					<>
						{type == 'inner' ? (
							<Link to={path} target={external ? '_blank' : '_self'}>
								<Button
									component='a'
									startIcon={icon}
									endIcon={chip}
									disableRipple
									/* @ts-ignore */
									sx={{
										backgroundColor: active ? 'primary.main' : undefined,
										borderRadius: 1,
										color: active ? 'background.sideBar' : 'neutral.700',
										// fontWeight: active && 'fontWeightBold',
										justifyContent: 'flex-start',
										pl: `${paddingLeft}px`,
										pr: 3,
										textAlign: 'left',
										textTransform: 'none',
										width: '100%',
										'& .MuiButton-startIcon': {
											color: active ? 'background.sideBar' : 'neutral.700',
										},

										'&:hover': {
											// backgroundColor: undefined,
											color: 'primary.main',
											'& .MuiButton-startIcon': {
												color: 'primary.main',
											},
										},
									}}
								>
									<Box sx={{ flexGrow: 1 }}>{title}</Box>
									{info}
								</Button>
							</Link>
						) : (
							<Link to={path} target={external ? '_blank' : '_self'}>
								<Button
									component='a'
									startIcon={icon}
									endIcon={chip}
									disableRipple
									/* @ts-ignore */
									sx={{
										backgroundColor: active ? 'primary.main' : undefined,
										borderRadius: 1,
										color: active ? 'background.sideBar' : 'neutral.700',
										// fontWeight: active && 'fontWeightBold',
										justifyContent: 'flex-start',
										pl: `${paddingLeft}px`,
										pr: 3,
										textAlign: 'left',
										textTransform: 'none',
										width: '100%',
										'& .MuiButton-startIcon': {
											color: active ? 'background.sideBar' : 'neutral.700',
										},

										'&:hover': {
											// backgroundColor: undefined,
											color: 'primary.main',
											'& .MuiButton-startIcon': {
												color: 'primary.main',
											},
										},
									}}
								>
									<Box sx={{ flexGrow: 1 }}>{title}</Box>
									{info}
								</Button>
							</Link>
						)}
					</>
				)}
			</ListItem>
		</>
	);
};

// export default DashboardSidebarIte;

DashboardSidebarItem.defaultProps = {
	active: false,
	open: false,
};
