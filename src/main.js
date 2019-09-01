import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false;

const destroyed = window.Cookies.get('destroyed') === 'true';

if (!destroyed) {
  init();
}

function init() {
  new Vue({
    render: h => h(App),
  }).$mount('#app');
}
