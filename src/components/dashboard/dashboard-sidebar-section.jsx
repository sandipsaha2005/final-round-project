import { List, ListSubheader } from '@mui/material';

import { DashboardSidebarItem } from './dashboard-sidebar-item';
import { useSelector, useDispatch } from 'react-redux';
const renderNavItems = (items, path, depth = 0) => (
	<List disablePadding>
		{items.reduce(
			(acc, item) =>
				reduceChildRoutes({
					acc,
					item,
					depth,
					path,
				}),
			[]
		)}
	</List>
);

const reduceChildRoutes = ({ acc, item, depth, path }) => {
	const key = `${item.title}-${depth}`;
	const partialMatch = path.includes(item.path);
	const exactMatch = path === item.path;

	if (item.children) {
		acc.push(
			<DashboardSidebarItem
				active={partialMatch}
				chip={item.chip}
				depth={depth}
				icon={item.icon}
				info={item.info}
				key={key}
				// open={partialMatch}
				open={item.open}
				path={item.path}
				title={item.title}
				user={item.user}
				external={item.external}
				type={item.type}
				windowopen={item?.windowopen ?? null}
			>
				{renderNavItems(item.children, path, depth + 1)}
			</DashboardSidebarItem>
		);
	} else {
		acc.push(
			<DashboardSidebarItem
				active={exactMatch}
				chip={item.chip}
				depth={depth}
				icon={item.icon}
				info={item.info}
				key={key}
				path={item.path}
				title={item.title}
				external={item.external}
				user={item.user}
				type={item.type}
				windowopen={item?.windowopen ?? null}
			/>
		);
	}

	return acc;
};

export const DashboardSidebarSection = (props) => {
	const { isEfc } = useSelector((state) => state.auth?.user);
	const { items, path, title, isEfcVerify, ...other } = props;
	// alert(isEfc);
	return (
		<>
			<List
				subheader={
					<ListSubheader
						disableGutters
						disableSticky
						sx={{
							color: title?.includes('Hello') ? 'primary.main' : 'neutral.500',
							fontSize: '0.75rem',
							fontWeight: 700,
							lineHeight: 2.5,
							ml: title?.includes('Hello') ? 0 : 4,
							textTransform: 'uppercase',
							textAlign: title?.includes('Hello') ? 'center' : 'left',
							textDecoration: 'underline',
						}}
					>
						{title}
					</ListSubheader>
				}
				{...other}
			>
				{renderNavItems(items, path)}
			</List>
		</>
	);
};
