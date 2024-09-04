import { useState, useEffect } from 'react';

import { matchRoutes, useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { Box, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from '@/guards/auth-guard';

import { useSelector, useDispatch } from 'react-redux';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	paddingTop: 24,
	[theme.breakpoints.up('lg')]: {
		paddingLeft: 280,
	},
}));

DashboardLayoutRoot.displayName = 'DashboardLayoutRoot';

export const DashboardLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// console.log(location.pathname);

	return (
		<AuthGuard>
			<DashboardLayoutRoot>
				<Box
					sx={{
						width: '100%',
					}}
				>
					<DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
					<Box
						sx={{
							backgroundColor: 'background.default',
							mt: 13,
							p: 2,
							// minHeight: '100vh',
						}}
					>
						<Outlet />
					</Box>
				</Box>
			</DashboardLayoutRoot>

			<DashboardSidebar onClose={() => setIsSidebarOpen(false)} open={isSidebarOpen} />
		</AuthGuard>
	);
};
DashboardLayout.displayName = 'DashboardLayout';
