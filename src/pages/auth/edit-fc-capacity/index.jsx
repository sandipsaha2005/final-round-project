import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import {
	Box,
	Typography,
	Grid,
	Slide,
	TextField,
	Link as RouterLink,
	TableContainer,
	Table,
	TableHead,
	Button,
	TableRow,
	TableBody,
	TableCell,
	InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import axios from 'axios';

import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthGuard } from '../../../guards/auth-guard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import Title from '../../../components/common/title';
import SearchIcon from '@mui/icons-material/Search';
import {
	useCapacityListMutation,
	useActiveCapacityMutation,
	useEditCapacityMutation,
} from '../../../redux/slices/editFcCapacity';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export function Component(e) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();

	// const [refreshAuth] = useMeMutation();
	const myRefs = useRef([]);

	const [getBookSlot, { data: docData, isSuccess: isDocSuccess }] = useCapacityListMutation();

	const [openModal, setopenModal] = useState({ open: false, data: '' });
	const [open, setOpen] = useState({ open: false, data: null });
	const [openCrop, setOpenCrop] = useState({ open: false, data: null });

	const fileRef = useRef();
	const [imgSrc, setImgSrc] = useState('');

	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const rowsPerPage = 15; //

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	useEffect(() => {
		if (docData && isDocSuccess) {
			console.log(docData);
			const newData = docData?.data?.map((item) => ({
				...item,
			}));
			setfilelist(newData);
		}
	}, [isDocSuccess, docData]);
	// useEffect(() => {
	//     if (activeData && isActiveSuccess) {
	//         console.log(activeData);
	//         const newData = activeData?.data?.map((item) => ({
	//             ...item,
	//         }));
	//         setfilelist(newData);
	//     }
	// }, [isActiveSuccess, activeData]);

	const [filelist, setfilelist] = useState([]);
	const [editCapacity, { data: editData, isSuccess: isEditSuccess }] = useEditCapacityMutation();
	const handleCapacityChange = (id, index) => {
		const input = document.getElementById(`capacity[${index}]`);

		editCapacity({ id: id, capacity: input.value });
	};
	const [getActive, { data: activeData, isSuccess: isActiveSuccess }] =
		useActiveCapacityMutation();

	const handleStatusChange = (index, is_active, id) => {
		getActive({ id: id, active: !is_active });
	};

	useEffect(() => {
		getBookSlot();
		// getActive();
		// editCapacity();
	}, []);

	useEffect(() => {
		if (activeData && isActiveSuccess) {
			toast.success(activeData?.message);
			getBookSlot();
		}
	}, [isActiveSuccess, activeData]);

	useEffect(() => {
		if (editData && isEditSuccess) {
			toast.success(editData?.message);
			getBookSlot();
		}
	}, [isEditSuccess, editData]);

	return (
		<AuthGuard>
			<Title sx={{}} title={t('EDIT FC CAPACITY')} />

			<Box>
				<Search style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						style={{ border: '1px solid #000', borderRadius: '10px' }}
						placeholder='Search…'
						inputProps={{ 'aria-label': 'search' }}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</Search>

				<Grid container spacing={1}>
					<Grid item md={12} sm={12}>
						<TableContainer style={{ marginTop: '20px' }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Sr NO</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Capacity</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Array.isArray(filelist) &&
										filelist
											.slice((page - 1) * rowsPerPage, page * rowsPerPage)
											.map((e, index) => (
												<TableRow key={index}>
													<TableCell>
														{index + 1 + (page - 1) * rowsPerPage}
													</TableCell>
													<TableCell>
														{moment(e.fc_date?.split('T')[0]).format(
															'DD/MM/YYYY'
														)}
													</TableCell>
													<TableCell>
														<TextField
															variant='outlined'
															defaultValue={Number(e.capacity)}
															id={`capacity[${index}]`}
															size='small'
															type='number'
														/>
													</TableCell>
													<TableCell>
														{e.is_active == 1 ? (
															<Box
																sx={{
																	bgcolor: '#56bf453d',
																	p: 1,
																	borderLeft: '1px solid #1d7926',
																	borderRight:
																		'1px solid #1d7926',
																}}
																display={'flex'}
																justifyContent={'center'}
															>
																<Typography
																	variant='subtitle2'
																	color='#1d7926'
																>
																	Active
																</Typography>
															</Box>
														) : (
															<Box
																sx={{
																	bgcolor: '#9c00002b',
																	p: 1,
																	borderLeft: '1px solid #9c0000',
																	borderRight:
																		'1px solid #9c0000',
																}}
																display={'flex'}
																justifyContent={'center'}
															>
																<Typography
																	variant='subtitle2'
																	color='#9c0000'
																>
																	Inactive
																</Typography>
															</Box>
														)}
													</TableCell>
													<TableCell>
														<Button
															size='small'
															type='submit'
															variant='contained'
															onClick={() => {
																handleCapacityChange(e.id, index);
															}}
														>
															Update
														</Button>
														&nbsp;&nbsp;
														{/* <Button
                                                            type='button'
                                                            variant='contained'
                                                            color={e.is_active ? 'error' : 'success'} 
                                                            size='small'
                                                            onClick={() => {
                                                                handleStatusChange(
                                                                    e.is_active, 
                                                                    moment(e.date?.split('T')[0]).format('YYYY/MM/DD')
                                                                );
                                                            }}
                                                        >
                                                            {e.is_active == true ? 'Inactive' : 'Active'} 
                                                        </Button> */}
														<Button
															type='button'
															variant='contained'
															color={
																e.is_active == true
																	? 'error'
																	: 'success'
															} // Set color based on active state
															size='small'
															onClick={() => {
																handleStatusChange(
																	index,
																	e.is_active, // Toggle the active state
																	e.id
																);
															}}
														>
															{e.is_active == true
																? 'Inactive'
																: 'Active'}{' '}
															{/* Change button label based on active state */}
														</Button>
													</TableCell>
												</TableRow>
											))}
								</TableBody>
							</Table>
						</TableContainer>
						<Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'flex-end' }}>
							{' '}
							<Stack spacing={2}>
								<Pagination
									count={Math.ceil(filelist.length / rowsPerPage)}
									page={page}
									onChange={handleChangePage}
									variant='outlined'
									color='primary'
								/>
							</Stack>
						</Box>
					</Grid>
				</Grid>

				<Grid container spacing={2}></Grid>
			</Box>

			{/* <DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleClose}>Agree</Button>
				</DialogActions> */}

			{/* <AlertDialogSlide
                open={openModal.open}
                data={openModal.data}
                handelClose={handelCloseModal}
                handelSubmit={handelFinalSubmit}
                loading={loading}
            /> */}

			{/* <DialogTitle >{"Use Google's location service?"}</DialogTitle> */}
		</AuthGuard>
	);
}

Component.displayName = 'DocumentUpload';
