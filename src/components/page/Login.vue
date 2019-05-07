<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">数据库管理系统</div >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <!--username-->
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username" autocomplete="on">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <!--password-->
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password" >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>

        </el-form-item>
        <!--登录  loading加载动画-->
        <div class="login-btn">
          <el-button type="primary"   @click.prevent="submitForm('ruleForm') " :loading="logining">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>


</template>
<script type="text/ecmascript-6">
  export default {
    name:"login",
    data() {
      return {
        logining:false,
        ruleForm:{
          username:'',
          password:''
        },

        rules:{
          username:[
            { required: true, message: '请输入账号', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 0 到 10个字符', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
          ]


        }
      }
    },
    methods:{
      submitForm(ruleForm){
        this.$refs[ruleForm].validate((valid)=>{

          if (valid) {
            this.logining = true;
            var testForm= {
              user :this.ruleForm.username,
              pass : this.ruleForm.password

            };
            console.log(this.logining);
            var params = new URLSearchParams();
            params.append('user', testForm.user);
            params.append('pass', testForm.pass);
  /*          https://www.easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/getToken1*/
           /* this.$axios.post("/api/rest/user/doLogin",{
              params: {
                /!*testForm*!/
                name:testForm.user,
                pass:testForm.pass,
              }*/
            this.$axios.post('/api/rest/user/doLogin ',params).then(response=>{
              console.log("oklogin");

              console.log("responseLogin");
              console.log(response.data);


              if(response.status==200){

                console.log("response.data.token");
                console.log(response.data.token);
                this.$cookies.set("dbUser_token",response.data.token,"16h");
                /*this.$axios.defaults.headers.common['Authentication-Token'] = response.data.token*/
                //以后会获取token
                //现在测试跳转
                /*this.logining = false;*/
                localStorage.setItem('ms_username',JSON.stringify(testForm.user));
                localStorage.setItem('ms_password',JSON.stringify(testForm.pass));
                localStorage.setItem('ms_token',JSON.stringify(response.data.token));
                this.$router.push('/');
                console.log("ok");
              }else if(response.status==400){
                this.logining=false;
                this.$alert('用户名或密码错误！', '提示信息', {
                  confirmButtonText: '确定'
                });
                this.ruleForm.username="";
                this.ruleForm.password="";
              }
              else if(response.status==500){
                this.logining=false;
                this.$alert('服务器错误，请稍后登录！', '提示信息', {
                  confirmButtonText: '确定'
                });
                this.ruleForm.username="";
                this.ruleForm.password="";
              }
            }) .catch(function (error) {

              console.log(error);
            });

          }else {
            console.log('error submit!!');
            return false;
          }


        })

      }
    }
  }
</script>




<style>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
  /*  background-image: url(../../assets/login-bg.jpg);*/
    background-size: 100%;
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
  }

</style>



