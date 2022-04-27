import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";


Vue.config.productionTip = false
Vue.use(ElementUI,{size: "mini"});
Vue.use(VueClipboard)
Vue.prototype.request=request

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')
