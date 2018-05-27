import Vue from 'vue'
import Router from 'vue-router'
//按需加载
const Home = r => require.ensure( [], () => r (require('~@/components/Home')));
const HelloWorld = r => require.ensure( [], () => r (require('~@/components/HelloWorld')));

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
