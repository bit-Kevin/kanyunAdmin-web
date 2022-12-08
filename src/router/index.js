import Vue from 'vue'
import VueRouter from 'vue-router'
import logIn from '../components/logIn'
import home from '../components/home'
import welcome from '../components/welcome'
import userManage from '../components/userManage/userManage'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/logIn' },
    { path: '/logIn', component: logIn },
    {
        path: '/home',
        component: home,
        // 子组件带有/ 用/welcome访问 不带就用全路径/home/welcome
        redirect: '/home/welcome',
        children: [{
                name: 'welcome',
                path: 'welcome',
                component: welcome,
            },
            {
                name: 'userManage',
                path: 'userManage',
                component: userManage
            }
        ]
    }
]

const router = new VueRouter({
        routes
    })
    //添加路由守卫
router.beforeEach((to, from, next) => {
    //登录组件放行
    if (to.path === '/login') return next()

    //其余进行登录验证，失败重定向到登录页面
    const token = window.sessionStorage.getItem('token')
    if (!token) return next('/login')

    //通过验证放行
    next()
})

export default router