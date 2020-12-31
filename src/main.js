// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUi from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import {Loading} from "element-ui";
import myAxios from "./assets/js/http";

Vue.config.productionTip = false


Vue.prototype.BaseHttp = myAxios
Vue.use(ElementUi);

router.beforeEach(function(to,from,next){
  document.title = to.meta.title
  // 要离开页面如果设置为不滚回到顶部，则本页是要记住上滚动高度到vuex中，以便下次进来恢复高度
  if(from.meta.scrollToTop==false) {
    localStorage.setItem("recordScrollTop", String(document.documentElement.scrollTop));
  }
  next()
})
router.afterEach((to, from) => {

  // 如果进入后的页面是要滚动到顶部，则设置scrollTop = 0
  //否则从vuex中读取上次离开本页面记住的高度，恢复它
  if(to.meta.scrollToTop==true){
    setTimeout(()=>{
      document.documentElement.scrollTop = 0
    },10)
  }else{
    setTimeout(()=>{
      let scrollPosition = localStorage.getItem("recordScrollTop");
      document.documentElement.scrollTop = scrollPosition ? scrollPosition : 0;
    },50)

  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
