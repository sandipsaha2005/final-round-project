import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

export const GuestGuard = (props) => {
	const { children } = props;
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const router = useNavigate();
	const [checked, setChecked] = useState(false);
	//const disableGuard = router.query.disableGuard as string;

	useEffect(() => {
		if (isAuthenticated === 'authenticated') {
			router(`/${import.meta.env.VITE_SUBFOLDER_NAME}/dashboard`);
		} else {
			setChecked(true);
		}
	}, [isAuthenticated]);

	if (!checked) {
		return null;
	}

	// If got here, it means that the redirect did not occur, and that tells us that the user is
	// not authenticated / authorized.

	return <>{children}</>;
};
