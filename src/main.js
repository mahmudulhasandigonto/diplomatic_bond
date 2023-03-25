import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import { store } from './store/store'
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import underscore from 'vue-underscore';
import VueLogger from 'vuejs-logger';
import VueAnimate from 'vue2-animate/dist/vue2-animate.min.css';

import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

const isProduction = process.env.NODE_ENV === 'production';

// console.log("env", isProduction)

const options = {
	isEnabled: true,
	logLevel: isProduction ? 'error' : 'debug',
	stringifyArguments: false,
	showLogLevel: false,
	showMethodName: false,
	separator: '',
	showConsoleColors: true
};

//Added by Shajir
// router.beforeEach((to, from, next) => {
// 	document.title = to.meta.title
// 	const token = localStorage.getItem("token")
// 	if (to.meta.requriesAuth) {
// 		if (token) {
// 			let turl = window.location.href.split('/')
// 			let surl = ""
// 			for(let i = 3; i<turl.length; i++){
// 				surl = surl+'/'+turl[i]
// 			}
// 			let menujson = JSON.parse(localStorage.getItem("lumos_menu"))
// 			let urls = []
// 			let len = menujson.length
// 			for(let i =0; i<len; i++){
// 				if(menujson[i].enable){
// 					urls.push(menujson[i].url)
// 					if(menujson[i].hasOwnProperty('children') &&  menujson[i].children.length > 0){
// 						for(let j =0; j<menujson[i].children.length; j++){
// 							if(menujson[i].children[j].enable){
// 								urls.push(menujson[i].children[j].url)
// 							}
// 						}
// 					}
// 				}
// 			}
// 			if(urls.includes(surl) ){

// 				next()
// 			}else{
// 				next({
// 					name: 'NotFound'
// 				})
// 			}

// 		} else {
// 			next({
// 				name: 'Login'
// 			})
// 		}
// 	}
// 	next()
// })

router.beforeEach((to, from, next) => {
	document.title = to.meta.title
	const token = localStorage.getItem("token")
	if (to.meta.requriesAuth) {
		if (token) {
			next()
		} else {
			next({
				name: 'Login'
			})
		}
	}
	next()
})

Vue.use(VueLogger, options);
Vue.use(underscore);
Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VeeValidate);
Vue.use(underscore);
Vue.use(VueAnimate);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})
