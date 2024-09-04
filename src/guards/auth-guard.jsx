import { useEffect, useState } from 'react';
// import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export const AuthGuard = (props) => {
	const { children } = props;
	// const auth = useAuth();
	const { isAuthenticated, user } = useSelector((state) => state.auth);
	const router = useNavigate();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (isAuthenticated === 'disconnected') {
			router(`/${import.meta.env.VITE_SUBFOLDER_NAME}/login`);
		} else {
			setChecked(true);
		}
	}, [isAuthenticated]);

	if (!checked) {
		return null;
	}

	// If got here, it means that the redirect did not occur, and that tells us that the user is
	// authenticated / authorized.

	return <>{children}</>;
};
