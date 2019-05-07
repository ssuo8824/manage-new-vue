<template>
  <div class="userinfo">
    <!--小图标-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-people"></i> 用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--信息列表-->
    <div class="container">
      <div class="handle-box">
        <!--删除按钮-->  <el-button type="primary" icon="deleteUser-icon" class="handle-del mr10"   @click="delAll"><i class="el-icon-lx-delete" ></i> 批量删除</el-button>
        <!--添加按钮--> <el-button type="primary" icon="addUser-icon" class="handle-del mr10"   @click="handleAdd"><i class="el-icon-lx-tianjia-"></i>添加</el-button>
        <!--刷新-->     <el-button type="primary" icon="reFresh-icon" class="handle-del mr10"  ><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
        <div class="right" style="position: relative; display: inline-block;float: right;">
          <!--文本框-->     <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10" style="padding: 6px 10px;"></el-input>
          <!--搜索-->       <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </div>
      </div>
      <!--表格-->
      <el-table  :data="data11.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize)" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" >

        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <!--<el-table-column prop="id" label="ID" sortable width="180"></el-table-column>-->
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>

        <el-table-column prop="username" label="用户名" width="300">
        </el-table-column>

        <el-table-column prop="password" label="密码" width="300">
        </el-table-column>

        <el-table-column  prop="role" label="角色" width="300">
        </el-table-column>



        <el-table-column prop="createdate" label="创建日期" width="350">
        </el-table-column>




        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange"  layout="prev, pager, next, sizes, total, jumper"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="pagesize":total="tableData.length"
        >
        </el-pagination>
      </div>



      <!-- 删除提示框 -->
      <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="修改" :visible.sync="editVisible" width="20%">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="ruleForm2.username" ></el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>


          <el-form-item>
            <!-- <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->

            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </el-form>

      </el-dialog>



      <!-- 添加框 -->
      <el-dialog title="添加" :visible.sync="addVisible" width="20%">
        <el-form :model="addForm2" status-icon :rules="addrules" ref="addForm2" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户名" prop="user">
            <el-input type="text" v-model="addForm2.username" ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="addForm2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="addForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="addForm2.role" placeholder="角色">
              <el-option label="普通用户" value="普通用户"></el-option>

            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
            <el-button type="primary" @click="addsubmitForm('addForm2')">添加</el-button>
            <el-button @click="resetForm('addForm2')">重置</el-button>
          </el-form-item>

        </el-form>

      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import qs from 'qs';

  export default {

    data() {
      //添加
      var checkNameadd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if ((this.addForm2.username !== '')){
            callback(new Error('请输入姓名'));
          } else {

            callback();

          }
        }, 1000);
      };
      var validatePassadd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addForm2.checkpass !== '') {
            this.$refs.addForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2add = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };


      //修改验证
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if ((this.ruleForm2.username !== '')){
            callback(new Error('请输入姓名'));
          } else {

            callback();

          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkpass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addForm2:{
          username:'',
          password: '',
          role:'',
        },
        addrules:{
          username: [
            { validator: checkNameadd, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassadd, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2add, trigger: 'blur' }
          ],

        },
        ruleForm2: {

          username:'',
          password: '',
          checkPass: '',



        },
        rules2: {
          username: [
            { validator: checkName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],

        },
        quanxianList:[

        ],
        idx: -1,
        is_search: false,
        delVisible: false,
        editVisible: false,
        addVisible:false,
        select_word: '',
        cur_page: 1,
        multipleSelection: [],
        del_list: [],
        tableData: [],
        pagesize: 5,
        currpage: 1,
        timer:'',



      };


    },
    /*  created() {
        this.getAjax();
       },*/
    mounted(){
      if(this.timer){
        clearInterval(this.timer);
      }else {
        this.timer=setInterval(()=>{
          this.getAjax()
          //vm实例 会监听自己身上data中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data上同步到页面中
          //好处是程序员只需要关心数据，不需要考虑如何重新渲染dom


        },400)
      }
      this.getAjax()
    },
    destroyed(){
      clearInterval(this.timer);
    },
    computed: {
      data11() {
        return this.tableData.filter((d) => {
          let is_del = false;
          for (let i = 0; i < this.del_list.length; i++) {
            if (d.username === this.del_list[i].username) {
              is_del = true;
              console.log("ok")
              break;
            }
          }
          if (!is_del) {
            if (d.username.indexOf(this.select_word) > -1) {
              console.log(d)
              return d;

            }
          }
        })
      },

    },
    methods: {
      search() {
        this.is_search = true;
        /*   this.tableData.filter(d => {
             if (d.username.includes(select_word)) {
               return d
             }
           })
           return tableData*/



      },
      addsubmitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData.push(this.addForm2)
            console.log("this.addForm2")
            console.log(this.addForm2.username)
            this.$axios.get('https://easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/userinfo',{
              params: {
                password:  this.addForm2.password,
                name: this.addForm2.username

              },headers:{
                'Access-Cotrol-Allow-Origin':'*',


              }
            })
              .then((response)=>{
                console.log(response)
                alert('添加成功!');
                console.log('请求成功')
              })
              .catch((res)=>{
                console.log(res,'请求失败')
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },


      // 保存编辑
      saveEdit() {

        this.$set(this.tableData, this.idx, this.ruleForm2);

        this.editVisible = false;
        this.$message.success(`修改第 ${this.idx+1} 行成功`);
      },
      //点击编辑 修改密码
      handleEdit(index, row) {
        this.idx = index;
        const item = this.tableData[index];
        this.ruleForm2 = {
          username: item.username,


        }
        this.editVisible = true;
      },
      //点击添加弹出
      handleAdd(index, row) {
        this.idx = index;

        this.addVisible = true;
      },
      // 确定删除
      deleteRow(){
        this.tableData.splice(this.idx, 1);
        this.$message.success('删除成功');
        this.delVisible = false;
      },
      //点击删除
      handleDelete(index, row) {
        console.log("index");
        console.log(index);
        this.idx = index;
        this.delVisible = true;
      },
      // 分页导航
      handleCurrentChange(val) {
        this.currpage = val;
        this.getAjax();

      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("val");
        console.log(val);
        console.log( this.multipleSelection);
      },
      //批量删除
      delAll() {
        const length = this.multipleSelection.length;
        console.log(length);
        let str = '';
        this.del_list = this.del_list.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].username + ' ';

        }
        this.tableData.splice(this.del_list, length);
        this.$message.success('删除成功');
        console.log("this.del_list");
        console.log(this.del_list);
        this.$message.error('删除了' + str);
        this.multipleSelection = [];
      },
      //获取数据
      getAjax(){


        /*  https://easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/item*/
        /* this.$http.get('#/test'*/
        this.$axios.get('https://easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/userinfo'
        )
          .then(response =>{
              console.log("ok");
              console.log();
              /*      console.log(response.config.params);*/
              console.log("dataUserinfo:");
              /* console.log(response.data.items);*/
              console.log(response.status);
              console.log(response.data);


              console.log(" dataUserinfoitems:");

              var newitems=response.data.items
              console.log(response.data.items.length);
              console.log("response.data.items[0].checkList");
              console.log(response.data.items[0].checkList);
              //判断用户类型 0 1 2
              for(var  i=0;i<response.data.items.length;i++){

                this.quanxianList= response.data.items[i].checkList;
                console.log( " this.quanxianList");
                console.log( this.quanxianList);
                console.log(response.data.items[i].checkList);
                if(response.data.items[i].role=='0'　){
                  newitems[i].role='管理员'

                  console.log(newitems[i].role);

                  this.tableData =newitems
                  console.log(" 管理员this.tableData")
                  console.log(this.tableData)

                }else if (response.data.items[i].role!='0') {

                  newitems[i].role='普通用户'
                  console.log(newitems[i].role);
                  this.tableData =newitems
                  console.log(" 普通用户this.tableData")
                  console.log()

                }
              }



            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },
      indexMethod(index) {
        return index +1;
      },


    }
  }
</script>
<style scoped>
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: auto;
  }
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .table{
    width: 100%;
    font-size: 14px;
  }
  .red{
    color: #ff0000;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0px;
  }
</style>
