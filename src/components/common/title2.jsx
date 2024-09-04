import React from 'react';
import {
	Box,
	Card,
	Container,
	Divider,
	Grid,
	TextField,
	Typography,
	FormHelperText,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';
const Title2 = ({ title, title2, muiStyle }) => {
	return (
		<Box sx={{ p: 1.5, borderRadius: '10px', border: '1px solid #dbd9d9', ...muiStyle }}>
			<Typography variant='subtitle2' component={'span'}>
				{title}
			</Typography>
			<Typography variant='subtitle2' color='primary.main' component={'span'}>
				{title2}
			</Typography>
		</Box>
	);
};

export default Title2;
