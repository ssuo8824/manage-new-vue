// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import '../static/css/style.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/icon/iconfont.css'
import * as cookies from "vue-cookies";
import resource from './resource'
import VueRouter from "./router";
import * as axios from "axios";
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
//在axios请求中cookies
axios.defaults.withCredentials=true;

Vue.prototype.$axios = axios;
Vue.prototype.$cookies= cookies;
//请求的request拦截器携带token
axios.interceptors.request.use(
  /*.Authorization*/
  config => {
    if ( JSON.parse(localStorage.getItem('ms_token'))!="") {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.common['Authentication-Token']= JSON.parse(localStorage.getItem('ms_token'));
      console.log("config")
      console.log(config)
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

//响应拦截器异常处理
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:  401
          let token = localStorage.getItem('ms_token');
          if (token != 'null' || token != '') {
            // 返回 401 清除token信息并跳转到登录页面
            localStorage.removeItem('ms_token')
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
            })

          } else {
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
            })
          }
          return Promise.reject(error.response.data)
        break;
        case 412:  412

            router.replace({
              path: '/link',
              query: {redirect: router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
            })

          return Promise.reject(error.response.data)
          break;

      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    localStorage.removeItem('ms_username');
  }
  let user = JSON.parse(localStorage.getItem('ms_username'));
  let pass = JSON.parse(localStorage.getItem('ms_password'));
  let token = JSON.parse(localStorage.getItem('ms_token'));
  console.log("ms_username::"+user)
  console.log("ms_password::"+pass)
  console.log("ms_token::"+token)
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    });
  }else if(to.meta.permission){
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    user === 'admin' ? next() : next('/403');
  } else {
    next();
  }
});



/* eslint-disable no-new */
new Vue({

  router,
  resource,
  axios,//通过import引入，然后在这里调用
  components: { App },
  template: '<App/>',
  render:h=>h(App),
}).$mount('#app');
