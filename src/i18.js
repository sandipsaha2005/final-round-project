import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import home from './translation/home.json';
import mainSideBar from './translation/main-sidebar.json';
import registration from './translation/registration.json';
import common from './translation/common.json';
import typeofcandidature from './translation/typeofcandidature.json';
import personaldetail from './translation/personaldetail.json';
import typeB from './translation/typeB.json';
import typeC from './translation/typeC.json';
import typeD from './translation/typeD.json';
import typeE from './translation/typeE.json';
import typeOMS from './translation/typeOMS.json';

const resources = {
	en: {
		translation: {},
	},
	mar: {
		translation: {
			...home,
			...mainSideBar,
			...registration,
			...common,
			...typeofcandidature,
			...personaldetail,
			...typeB,
			...typeC,
			...typeD,
			...typeE,
			...typeOMS,
		},
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});
