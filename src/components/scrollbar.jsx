import { forwardRef } from 'react';

import SimpleBar from 'simplebar-react';

import SimpleBarCore from 'simplebar-core';
import 'simplebar/dist/simplebar.min.css';

export const Scrollbar = forwardRef(({ ref }, props) => {
	return <SimpleBar ref={ref} {...props} />;
});
