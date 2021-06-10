import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
import Vue from 'vue';
import App from './AppORG.vue';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import EventBus from '@/bus/event.bus'
import http from './http';
import HttpClient from "./http/api/connector/http.client";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

Vue.config.productionTip = false

Vue.prototype.appName = process.env.VUE_APP_NAME;
Vue.prototype.$eventBus = EventBus;

Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;


// handle error
Vue.config.errorHandler = function (err, vm, info) {
  // Global Error Handler
  console.log("Error Handler ", err);
};

let app = {
  router,
  store,
  vuetify,
  render: h => h(App),
  beforeCreate: function () {
    http.registerListeners();
    http.registerStatusListeners();
    HttpClient.init(process.env.VUE_APP_BASE_URL);
  },
};

import serviceContext from './http/api/services/serviceContext'
serviceContext({Vue});


new Vue(app).$mount('#app');

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
