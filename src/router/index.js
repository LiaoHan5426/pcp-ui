import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: "history", //消去 #
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import("../components/Index"),
      meta:{
        title: "首页",
        keepAlive: true,
        scrollToTop: false
      }
    },{
      path: "/personal",
      name: "PersonalPage",
      component: () => import("../components/common/personalPage/PersonalPage")
    }
  ]
})
