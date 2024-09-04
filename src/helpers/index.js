import moment from 'moment';

export const hscBoardYearlist = () => {
	const currentYear = moment(new Date()).format('YYYY');

	let startYear = 1970;

	let yearArray = [];

	while (startYear <= currentYear) {
		yearArray.push({ id: startYear, year: startYear });
		startYear++;
	}

	return yearArray.reverse();
};

export const sscBoardYearlist = () => {
	const currentYear = moment(new Date()).format('YYYY') - 2;

	let startYear = 1970;

	let yearArray = [];

	while (startYear <= currentYear) {
		yearArray.push({ id: startYear, year: startYear });
		startYear++;
	}

	return yearArray.reverse();
};
