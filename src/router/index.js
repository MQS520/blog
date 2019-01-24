import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/login'
import Regist from '@/components/page/regist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
		{
			path: '/regist',
			name: 'Regist',
			component: Regist
		}
  ]
})
