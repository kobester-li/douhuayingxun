// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import jsonp from 'vue-jsonp'
Vue.config.productionTip = false
// Vue.use(jsonp)
// var jsonp = require('jsonp')
// jsonp('https://api.douban.com/v2/movie/search?q=张艺谋',null,function(err,data){
//   if(err){
//     console.error(err.message)
//   }else{
//     console.log(data)
//     return data;
//   }
// })
/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
template: '<App/>',
  components: { App }
})
