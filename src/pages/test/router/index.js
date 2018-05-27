import Vue from 'vue'
import Router from 'vue-router'
//按需加载
const Login = r => require.ensure( [], () => r (require('../components/Login')));

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
