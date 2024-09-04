import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './root-reducer';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from '../slices/apiSlice';

let devtool = false;
let middleware = [];
devtool = true;
middleware = [apiSlice.middleware];

/* @ts-ignore */
if (import.meta.env.DEV === true) {
	// middleware = [logger, apiSlice.middleware];
	middleware = [apiSlice.middleware];
	devtool = true;
}

export const store = configureStore({
	reducer: rootReducer,
	devTools: devtool,
	middleware: (getDefaultMiddleware) =>
		// adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
		getDefaultMiddleware().concat(...middleware),
});

export const useDispatch = () => useReduxDispatch();
// setupListeners(store.dispatch);
