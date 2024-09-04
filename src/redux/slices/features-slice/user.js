import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: 'disconnected',
	isInitialized: false,
	user: {},
};

export const slice = createSlice({
	name: 'authState',
	initialState,
	reducers: {
		setAuthUserState: (_state, _action) => {
			const { user, isAuthenticated, isInitialized } = _action.payload;
			return {
				..._state,
				isAuthenticated: isAuthenticated,
				user: user,
				isInitialized: isInitialized,
			};
		},
		updateReduxState: (_state, _action) => {
			const { user, isAuthenticated, isInitialized } = _action.payload;
			return {
				..._state,
				[_action.payload.key]: _action.payload.value,
			};
		},

		logout: (_state, _action) => {
			localStorage.removeItem('token');
			return { ..._state, user: {}, isAuthenticated: 'disconnected' };
		},
	},
});

// Action creators are generated for each case reducer function
export const { setAuthUserState, logout, updateReduxState } = slice.actions;

export default slice.reducer;

export const getAuthState = (state) => state.auth;
