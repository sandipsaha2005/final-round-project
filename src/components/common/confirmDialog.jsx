import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { LoadingButton } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, data, handelClose, handelSubmit, loading }) {
	return (
		<React.Fragment>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handelClose}
				aria-describedby='alert-dialog-slide-description'
				fullWidth
				maxWidth='sm'
			>
				{/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
				<DialogContent style={{ height: '150px' }}>
					<DialogContentText
						id='alert-dialog-slide-description'
						style={{
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					>
						{data}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LoadingButton
						//   disabled={formik.isSubmitting}
						// fullWidth
						size='small'
						type='submit'
						variant='contained'
						loading={loading}
						onClick={handelSubmit}
					>
						Confirm
					</LoadingButton>
					<Button
						type='button'
						variant='contained'
						color='error'
						size='small'
						onClick={handelClose}
					>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
