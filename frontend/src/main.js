import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '../src/assets/styles/main.css';
import '../src/assets/styles/app.scss';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faCoffee, faEllipsis,
	faArrowLeft, faMagnifyingGlass, faXmark, faSquarePlus,
	faHouseLaptop, faHouseChimneyWindow, faBookOpen,
	faLaptopCode, faTruckMoving, faUser, faChevronLeft,
	faChevronRight, faSliders, faBookmark, faChevronUp, faChevronDown, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { faBookmark as faBookmarkRegular} from '@fortawesome/free-regular-svg-icons';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

library.add(faCoffee, faEllipsis, faArrowLeft, faMagnifyingGlass, faXmark, faSquarePlus,
	faHouseLaptop, faHouseChimneyWindow, faBookOpen, faLaptopCode, faTruckMoving, faUser,
	faChevronLeft, faChevronRight, faSliders, faBookmark, faBookmarkRegular, faChevronUp, faChevronDown, faTrashCan );

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
