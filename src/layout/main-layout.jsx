import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import { Footer } from "@/components/footer";
import { MainNavbar } from '@/components/main/main-navbar';
import { MainSidebar } from '@/components/main/main-sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const MainLayoutRoot = styled('div')(({ theme }) => ({
	display: 'flex',
	flex: '1 1 auto',
	maxWidth: '100%',
	paddingTop: 64,
	// [theme.breakpoints.up('lg')]: {
	// 	paddingLeft: 280,
	// },
}));

export const MainLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// console.log(window.location.pathname);
	// function checkLayout() {
	// 	switch (window.location.pathname) {
	// 		case '/login':
	// 			return true;
	// 			break;
	// 		case '/registration':
	// 			return true;
	// 			break;

	// 		default:
	// 			return false;
	// 			break;
	// 	}
	// }
	// useEffect(() => {
	// 	checkLayout();
	// }, [window.location.pathname]);

	return (
		<>
			<MainLayoutRoot>
				<Box
					sx={{
						// display: 'flex',
						// flex: '1 1 auto',
						// flexDirection: 'column',
						width: '100%',
					}}
				>
					
					<Box
						sx={{
							backgroundColor: 'background.default',
							mt: { xs: '80px', sm: '90px', md: '80px' },
							// minHeight: '100vh',
						}}
					>
						<Outlet />
					</Box>
				</Box>

				{/* <Footer /> */}
			</MainLayoutRoot>

		</>
	);
};
