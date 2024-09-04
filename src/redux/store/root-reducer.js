import { combineReducers } from '@reduxjs/toolkit';
// import { reducer as calendarReducer } from '../slices/calendar';
import authReducer from '../slices/features-slice/user';
import { apiSlice } from '../slices/apiSlice';

export const rootReducer = combineReducers({
	// auth: authReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	// chat: chatReducer,
	// kanban: kanbanReducer,
	// mail: mailReducer
});
