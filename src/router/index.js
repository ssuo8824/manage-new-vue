import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta:{title:'自述文件'},
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },

        {
          path: '/UserInfo',
          component: resolve => require(['../components/page/UserInfo.vue'], resolve),
          meta: { title: '用户信息' }
        },
        {
          path: '/fullselect',
          component: resolve => require(['../components/page/Fullselect.vue'], resolve),
          meta: { title: '全文检索' }
        },
        {
          path: '/import-export',
          component: resolve => require(['../components/page/Imexorpt.vue'], resolve),
          meta: { title: '导入导出' }
        },
        {
          path: '/spare-space',
          component: resolve => require(['../components/page/Sparespace.vue'], resolve),
          meta: { title: '剩余空间' }
        },
        {
          path: '/monitored-object',
          component: resolve => require(['../components/page/MonitoredObj.vue'], resolve),
          meta: { title: '监控对象' }
        },
        {
          path: '/database-information',
          component: resolve => require(['../components/page/DatabaseInf.vue'], resolve),
          meta: { title: '数据库信息' }
        },
        {
          path: '/sqlwindow',
          component: resolve => require(['../components/page/Sqlwindow.vue'], resolve),
          meta: { title: 'SQL窗口' }
        },
        {
          path: '/maintenance',
          component: resolve => require(['../components/page/Maintenance.vue'], resolve),
          meta: { title: '维护信息' }
        },
        {
          path: '/link',
          component: resolve => require(['../components/page/LinkDatabase.vue'], resolve),
          meta: { title: '数据库配置' }
        },
        {
          path: '/Roles',
          component: resolve => require(['../components/page/Roles.vue'], resolve),
          meta: { title: '权限设置' ,permission:true}
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
        },
        {
          path: '/createTable',
          component: resolve => require(['../components/page/CreateTable.vue'], resolve),
          meta: { title: '创建表' }
        },
        {
          path: '/designTable',
          component: resolve => require(['../components/page/DesignTable.vue'], resolve),
          meta: { title: '设计表' }
        },
        {
          path: '/openTable',
          component: resolve => require(['../components/page/OpenTable.vue'], resolve),
          meta: { title: '打开表' }
        }
      ]

    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },


  ]
})




// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('ms_token');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;

