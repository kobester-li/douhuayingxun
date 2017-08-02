import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Hot from '@/components/hot'
import Comesoon from '@/components/comesoon'
import Beimei from '@/components/beimei'
import Top250 from '@/components/top250'
import Search from '@/components/search'
import Detailspage from '@/components/details_page'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Hot',
      component: Hot
    },
    {
      path:'/hot',
      component:Hot
    },
    {
      path:'/comesoon',
      component:Comesoon
    },
    {
      path:'/beimei',
      component:Beimei
    },
    {
      path:'/top250',
      component:Top250
    },
    {
      name:'search',
      path:'/search/:keyword',
      component:Search
    },
    {
      name:'details_page',
      path:'/details_page/:id',
      component:Detailspage
    }
  ]
})
