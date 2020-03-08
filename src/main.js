import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// Webpack Onsen CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS Onsen import
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately
Vue.use(VueOnsen); // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in 

//amplify
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)


Vue.config.productionTip = false
import { store } from "./store/store";

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
