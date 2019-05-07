<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">数据库管理系统</div>
    <!--顶部导航-->
    <div class="title">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router><!--unique-opened	是否只保持一个子菜单的展开
             collapse是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
             default-active 当前激活菜单的 index
             outer	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
             -->
        <template v-for="item in titles">

          <template v-if="item.subs.length!=0"><!--判断如果有二级菜单-->
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
              </template>


              <template v-for="subItem in item.subs"><!--循环2级菜单下的数组 二级菜单-->
              <!--  <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">&lt;!&ndash;如果有3级菜单&ndash;&gt;
                    <template slot="title">{{ subItem.title }}</template>&lt;!&ndash;2级菜单标题&ndash;&gt;
                    &lt;!&ndash;循环3级菜单下的数组 三级菜单&ndash;&gt;
                    <template v-for="(threeItem,i) in subItem.subs" >   &lt;!&ndash;循环3级菜单下的数组 三级菜单&ndash;&gt;
                      <el-submenu v-if="threeItem.subs" :index="threeItem.index" :key="threeItem.index">&lt;!&ndash;如果有4级菜单&ndash;&gt;
                        <template slot="title">{{ threeItem.title }}</template>&lt;!&ndash;3级菜单标题&ndash;&gt;
                        <el-menu-item v-for="(FourItem,i) in threeItem.subs" :key="i" :index="FourItem.index">
                          {{ FourItem.title }}
                          &lt;!&ndash;四级菜单判断&ndash;&gt;
                        </el-menu-item>
                      </el-submenu>
                      <el-menu-item v-else :key="i" :index="threeItem.index">
                        {{ threeItem.title }}
                        &lt;!&ndash;四级菜单判断&ndash;&gt;
                      </el-menu-item>
                    </template>
                  &lt;!&ndash;四级菜单判断&ndash;&gt;


                </el-submenu>-->

                <!--没有三级菜单 直接显示二级-->
                <el-menu-item :index="subItem.index" :key="subItem.index">
                  {{ subItem.title }}  <!--没有三级菜单 直接显示二级-->
                </el-menu-item>
              </template>
            </el-submenu>
          </template>

          <!--没有二级菜单 直接显示一级-->
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i><span slot="title"> {{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>

    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      欢迎  {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">

            <router-link to="/UserInfo">
              <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
            </router-link>

            <router-link to="/Roles">
              <el-dropdown-item command="Quanxian">权限设置</el-dropdown-item>
            </router-link>


            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from '../common/bus';

  export default {
    data() {
      return {
        titles: [],
        collapse: false,
        fullscreen: false,
        name: 'linxin',
        message: 2,
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    created() {
      this.getAjax();
    },
    computed: {
      username() {
        let username = localStorage.getItem('ms_username');
        return username ? username : this.name;
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getAjax: function () {


        /*  https://easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/item*/
        /* this.$http.get('#/test'*/
      /*  https://www.easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/title*/
        this.$axios.get(' /api/rest/menu'
        )
          .then(response => {
              console.log("ok");
              console.log();
              /*      console.log(response.config.params);*/
              console.log("datatitle:");
              /* console.log(response.data.items);*/

              console.log(response.data);
              // this.items=response.data
              console.log(" benitems:");
              console.log(this.items);
            console.log(response.data);
              this.titles = response.data
            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        this.$message('click on item ' + command);
        if (command == 'loginout') {
          localStorage.removeItem('ms_username')
          localStorage.removeItem('ms_token')
          this.$router.push('/login');
        }
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse);
      },
      // 全屏事件
      handleFullScreen() {
        //FullScreen全屏元素
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;

    line-height: 70px;
  }

  .header .title {
    float: left;
    margin-left: 210px;
    margin-right: 210px;
    border-left-width: 210px;
    padding-left: 40px;
    padding-right: 0px;
    line-height: 70px;
    position: absolute;
  }

  .header .title ul {
    /*    background-color: #242f42;*/

  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell, .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }

  .el-menu-item {
    font-size: 14px;
  }

  .el-submenu__title {
    font-size: 14px;
  }
</style>
