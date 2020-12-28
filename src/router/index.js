import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: "history", //消去 #
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import("../components/Index")
    }
  ]
})
