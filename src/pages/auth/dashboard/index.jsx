import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import {
	Box,
	Container,
	Divider,
	TextField,
	Typography,
	Card,
	CardContent,
	Accordion,
	FormHelperText,
	AccordionSummary,
	AccordionDetails,
	Paper,
	Button,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	Link as RouterLink,
} from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { ZodError } from 'zod';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link } from 'react-router-dom';
// import { GuestGuard } from '../../components/authentication/guest-guard';
import { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { AuthGuard } from '../../../guards/auth-guard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useFaqMutation } from '@/redux/slices/other';
import Title from '../../../components/common/title';

import { useMeMutation } from '../../../redux/slices/auth';

// const fill_status = 2;

export function Component() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { i18n, t } = useTranslation();
	const [refreshAuth] = useMeMutation();

	return <AuthGuard>changes</AuthGuard>;
}

Component.displayName = 'Faq';
