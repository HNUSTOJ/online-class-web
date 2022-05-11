import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import request from "@/utils/request";


import vueFilePreview from 'gxd-file-preview';

//初始化自定义插件，（pdf.js,worker.js文件建议放在本地服务器),cdn有可能不稳定
Vue.use(vueFilePreview,{
  pdf: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.min.js', //pdf插件
  worker:'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.worker.min.js',//pdf.work插件
});


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
