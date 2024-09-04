import { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme } from '@/theme';
import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './route';
import { store } from './redux/store/index';

function App() {
	const notify = () => toast.success('toast');

	return (
		<Provider store={store}>
			{/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
			<ThemeProvider
				theme={createTheme({
					direction: 'ltr',
					responsiveFontSizes: true,
					mode: 'light',
				})}
			>
				<CssBaseline />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/>

			
				{/* <p className='read-the-docs'>Click on the Vite and React logos to learn more</p> */}
				<Routes />
				{/* <button onClick={notify}>Notify!</button> */}
			</ThemeProvider>
			{/* </LocalizationProvider> */}
		</Provider>
	);
}

export default App;
