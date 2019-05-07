<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i> 基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" id="container">
      <div class="infoBar pure-g">
        <div class="left-min pure-u-8-24">
          <div class="title">
            <span class="fonts" data-spm-anchor-id="a2c3o.10720561.0.i1.76504a9cnE1tTc">基本信息 </span>
          </div>
          <div class="cont">
            <ul>
              <li>产品 :  MySQL                                                                                                                                                                      </li>
              <li>版本号 :8.0.15                                                                                                                                                                                             </li>

              <li>用户名 : root                                                      </li>

            </ul>
          </div>
        </div>

        <div class="left-min pure-u-8-24">
          <div class="title">
            <span class="fonts">属性 </span>
          </div>
          <div class="cont">
            <ul>
              <li>内存 : 7.66MB </li>

              <li>服务端IP地址 : 172.17.0.2</li>
              <li>客户端IP地址 : 192.168.99.101</li>


            </ul>
          </div>
        </div>
      <!--  <div class="left-min pure-u-8-24">
          <div class="title">
            <span class="fonts" style="border-left:0">&nbsp; </span>
          </div>
          <div class="cont">
            <ul>

              <li>默认文件路径 : E:\SQLDATA\DATA</li>
              <li>默认日志路径 : E:\SQLDATA\DATA</li>
            </ul>
          </div>
        </div>-->

      </div>


    </div>


  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        }
    }
</script>
<style scoped>
   .pure-u-8-24 {
     display: inline-block;
    width: 30%;
    zoom: 1;
    letter-spacing: normal;
    word-spacing: normal;
    vertical-align: top;
    text-rendering: auto;
  }
   .title {
     height: 50px;
     line-height: 50px;
     border-bottom: 1px solid #ddd;
     padding: 0px 0 0 10px;
   }
   #container .infoBar .title .fonts {
     border-left: 3px solid #88b7e0;
     padding-left: 10px;
     color: #1c2c40;
     font-size: 14px;
   }
   #container .infoBar .cont {
     padding: 20px 0 0 20px;
     width: 100%;
   }
   ul, ol {
     list-style: none;
   }
   .infoBar .cont li {
     color: #666;
     height: 30px;
     line-height: 30px;
   }
</style>
