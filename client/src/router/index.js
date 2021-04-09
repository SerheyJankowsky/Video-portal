import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth.vue')
    },
    {
      path:'/',
      redirect:{
        name:'video'
      }
    },
    {
      path:'/video',
      name:'video',
      meta:{auth:true},
      component:()=> import('../views/Main.vue'),
    }
  ]

})

router.beforeEach((to,from,next)=>{
  const auth = localStorage.getItem('access_token')
  const require = to.matched.some(e => e.meta.auth)

  if(!auth && require ){
    next('/login')
  }else{
    next()
  }
})


export default router
