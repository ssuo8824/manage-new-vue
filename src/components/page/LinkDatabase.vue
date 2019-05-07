<template>
  <div class="linkDataBase">
    <!--小图标-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-shujukulianjie"></i> 数据库配置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--连接列表-->
    <div class="container">
      <div class="handle-box">
        <!--删除按钮-->  <el-button  type="danger" icon="deleteUser-icon" class="handle-del mr10"   @click="delAll"><i class="el-icon-lx-delete" ></i> 批量删除</el-button>
        <!--添加按钮--> <el-button type="primary" icon="addUser-icon" class="handle-del mr10"   @click="handleAdd"><i class="el-icon-lx-tianjia-"></i>添加</el-button>
        <!--刷新-->     <el-button type="success"icon="reFresh-icon" class="handle-del mr10"  @click="reloadbtn"><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
        <div class="right" style="position: relative; display: inline-block;float: right;">
          <!--文本框-->     <el-input v-model="select_word" placeholder="关键词" class="handle-input mr10" style="padding: 6px 10px;"></el-input>
          <!--搜索-->       <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </div>
      </div>

      <!--表格-->
      <el-table  :data="tableData.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize)" border class="table" ref="multipleTable" @selection-change="handleSelectionChange"  @cell-dblclick="doublebtn">

        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <!--<el-table-column prop="id" label="ID" sortable width="180"></el-table-column>-->
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>


        <el-table-column prop="databasename" label="连接名称" width="200">
        </el-table-column>


        <el-table-column prop="username" label="登录者" width="200">
        </el-table-column>


        <el-table-column prop="databasetype" label="数据库类型" width="200">
        </el-table-column>

        <el-table-column  prop="defaultdatabase" label="默认数据库" width="200">
        </el-table-column>



        <el-table-column prop="ipadress" label="主机名或Ip地址" width="400">

        </el-table-column>

        <el-table-column prop="databaseport" label="端口号" width="250">
        </el-table-column>

        <el-table-column prop="databaseusername" label="用户名" width="250">
        </el-table-column>




        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">

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
      <!-- 添加框 -->
      <el-dialog title="连接数据库" :visible.sync="addVisible" width="50%">
        <el-form :model="addLinkForm2" status-icon :rules="addLinkForm2rules" ref="addLinkForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择数据库" prop="databaseChoice">
            <el-radio-group v-model="addLinkForm2.databaseChoice">
              <el-radio label="MySQL"></el-radio>
              <el-radio label="Oracle"></el-radio>
              <el-radio label="SqlServer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="连接数据库名" prop="databasename">
            <el-input type="text" v-model="addLinkForm2.databasename" ></el-input>
          </el-form-item>

          <el-form-item label="主机或IP地址" prop="ipadress">
            <el-input type="text" v-model="addLinkForm2.ipadress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="databaseport">
            <el-input type="text" v-model="addLinkForm2.databaseport"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="databaseusername">
            <el-input type="text" v-model="addLinkForm2.databaseusername" ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="databasepassword">
            <el-input type="password" v-model="addLinkForm2.databasepassword" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item style="display: inline-block;">
            <el-button style="margin-left: 45px;" @click="resetForm('addLinkForm2')">重置</el-button>
          </el-form-item>
          <el-button type="primary" @click="addDatalink('addLinkForm2')">确 定</el-button>
          <el-button type="primary" @click="addDatalinkChenk('addLinkForm2')">测试连接</el-button>

        </el-form>
        <el-menu>
          <template v-for="item in linkDataBases">
            <el-submenu :index="item" :key="item">
              <span slot="title">{{ item.Database }}</span>
            </el-submenu>

          </template>

        </el-menu>




      </el-dialog>




      <!-- 修改框 -->
      <el-dialog title="编辑数据库" :visible.sync="editVisible" width="50%">
        <el-form :model="editLinkForm2" status-icon :rules="addLinkForm2rules" ref="editLinkForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="选择数据库" prop="databaseChoice">
            <el-radio-group v-model="editLinkForm2.databaseChoice">
              <el-radio label="MySQL"></el-radio>
              <el-radio label="Oracle"></el-radio>
              <el-radio label="SqlServer"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="连接数据库名" prop="databasename">
            <el-input type="text" v-model="editLinkForm2.databasename" ></el-input>
          </el-form-item>

          <el-form-item label="主机或IP地址" prop="ipadress">
            <el-input type="text" v-model="editLinkForm2.ipadress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="databaseport">
            <el-input type="text" v-model="editLinkForm2.databaseport"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="databaseusername">
            <el-input type="text" v-model="editLinkForm2.databaseusername" ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="databasepassword">
            <el-input type="password" v-model="editLinkForm2.databasepassword" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item style="display: inline-block;">
            <el-button style="margin-left: 45px;" @click="resetForm('editLinkForm2')">重置</el-button>
          </el-form-item>
          <el-button type="primary" @click="editDatalink('editLinkForm2')">确 定</el-button>
          <el-button type="primary" @click="editDatalinkChenk('editLinkForm2')">测试连接</el-button>

        </el-form>
        <el-menu>
          <template v-for="item in linkDataBases">
            <el-submenu :index="item" :key="item">
              <span slot="title">{{ item.Database }}</span>
            </el-submenu>

          </template>

        </el-menu>




      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import bus from '../common/bus';
    export default {
      inject:['reload'],
        data() {

          //修改验证
          var checkName = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('不能为空'));
            }
            setTimeout(() => {
              if ((this.addLinkForm2.databasename== '')){
                callback(new Error('请输入'));
              } else {

                callback();

              }
            }, 1000);
          };
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.addLinkForm2.databasepassword == '') {
                this.$refs.addForm2.validateField('databasepassword');
              }
              callback();
            }
          };

          var checkipadress = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('不能为空'));
            }
            setTimeout(() => {
              if ((this.addLinkForm2.ipadress== '')){
                callback(new Error('请输入'));
              } else {

                callback();

              }
            }, 1000);
          };
          var checkport = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('不能为空'));
            }
            setTimeout(() => {
              if ((this.addLinkForm2.databaseport== '')){
                callback(new Error('请输入'));
              } else {

                callback();

              }
            }, 1000);
          };
          var checkdatabaseusername = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('不能为空'));
            }
            setTimeout(() => {
              if ((this.addLinkForm2.databaseusername== '')){
                callback(new Error('请输入'));
              } else {

                callback();

              }
            }, 1000);
          };
            return {
              editLinkForm2:{
                databasename:'',
                ipadress: '',
                databaseport: '',
                databaseusername:'',
                databasepassword:'',
                databaseChoice:''
              },
              addLinkForm2: {

                databasename:'',
                ipadress: '',
                databaseport: '',
                databaseusername:'',
                databasepassword:'',
                databaseChoice:''
              },
              addLinkForm2rules: {
                databaseChoice: [
                  { required: true, message: '请选择', trigger: 'change' }
                ],
                databasename: [
                  { validator: checkName, trigger: 'blur' }
                ],
                ipadress: [
                  { validator: checkipadress, trigger: 'blur' }
                ],

                databasepassword: [
                  { validator: validatePass, trigger: 'blur' }
                ],
                databaseport: [
                  { validator: checkport, trigger: 'blur' }
                ],
                databaseusername: [
                  { validator: checkdatabaseusername, trigger: 'blur' }
                ],

              },
              idx: -1,
              linkDataBases:'',
              is_search: false,
              delVisible: false,
              editVisible: false,
              addVisible:false,
              editVisible:false,
              select_word: '',
              cur_page: 1,
              multipleSelection: [],
              del_list: [],
              tableData: [],
              pagesize: 7,
              currpage: 1,
              timer:'',

            }
        },
      mounted(){

        this.getAjax()
      },
      computed: {
        data11() {
          return this.tableData.filter((d) => {
            let is_del = false;
            for (let i = 0; i < this.del_list.length; i++) {
              if (d.userdbid === this.del_list[i].userdbid) {
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

/*          addLinkForm2: {

            databasename:'',
            ipadress: '',
            databaseport: '',
            databaseusername:'',
            databasepassword:'',
            databaseChoice:''
          }*/

        reloadbtn()
        {
          this.reload()
        },
          /**
           * 测试连接按钮事件
           * */
          addDatalinkChenk(addLinkForm2){
            var params = new URLSearchParams();
            params.append('databasename', this.addLinkForm2.databasename);
            params.append('ipadress', this.addLinkForm2.ipadress);
            params.append('databaseport', this.addLinkForm2.databaseport);
            params.append('databaseusername', this.addLinkForm2.databaseusername);
            params.append('databasepassword', this.addLinkForm2.databasepassword);
            params.append('databaseChoice', this.addLinkForm2.databaseChoice);

            this.$refs[addLinkForm2].validate((valid) => {
              if (valid) {

                console.log("this.addLinkForm2")
                console.log(this.addLinkForm2)
                this.$axios.post('/api/rest/db/checkLink',params/*,{
                 headers:{
                    'Access-Cotrol-Allow-Origin':'*',


                  }
                }*/)
                  .then((response)=>{
                    //ALLdatabases
                    console.log(response.data)
                    this.linkDataBases=response.data.data;
                    console.log(" this.linkDataBases")
                    console.log(this.linkDataBases)
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
        /**
         * 确定成功按钮事件
         * */
        addDatalink(addLinkForm2){
          var params = new URLSearchParams();
          params.append('databasename', this.addLinkForm2.databasename);
          params.append('ipadress', this.addLinkForm2.ipadress);
          params.append('databaseport', this.addLinkForm2.databaseport);
          params.append('databaseusername', this.addLinkForm2.databaseusername);
          params.append('databasepassword', this.addLinkForm2.databasepassword);
          params.append('databaseChoice', this.addLinkForm2.databaseChoice);

          this.$refs[addLinkForm2].validate((valid) => {
            if (valid) {

              console.log("this.addLinkForm2")
              console.log(this.addLinkForm2)
              this.$axios.post('/api/rest/db/toLink',params/*,{
                 headers:{
                    'Access-Cotrol-Allow-Origin':'*',


                  }
                }*/)
                .then((response)=>{
                  //ALLdatabases
                  console.log('数据库连接')
                  console.log("response.status")
                  console.log(response.status)
                      if(response.status==201)
                      {
                        console.log(this.addLinkForm2.databaseChoice)
                        localStorage.setItem('the_databaseChoice',this.addLinkForm2.databaseChoice);
                        bus.$emit('databaseChoice',  this.addLinkForm2.databaseChoice)  //data就是触发updata事件要带走的数据
                        alert("连接成功");
                      }
                  this.reload()
                  console.log('连接成功')

                })
                .catch((res)=>{
                  console.log(res,'连接失败')
                })

            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        search() {
          this.is_search = true;
          /*   this.tableData.filter(d => {
               if (d.username.includes(select_word)) {
                 return d
               }
             })
             return tableData*/



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
        doublebtn(row, column, cell, event)
        {
          this.editVisible=true;
          console.log("行信息row");

          console.log(row);
          this.editLinkForm2.databaseChoice=row.databasetype;

          this.editLinkForm2.databasename=row.databasename
          this.editLinkForm2.ipadress=row.ipadress
          this.editLinkForm2.databaseport=row.databaseport
          this.editLinkForm2.databaseusername=row.databaseusername
            this.editLinkForm2.databasepassword=row.databasepassword


        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
          console.log("val handleSelectionChange");
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
            str += this.multipleSelection[i].UserDBID + ' ';

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
          this.$axios.get('/api/rest/getLinkInfo'
          )
            .then(response =>{
                console.log("ok");
                console.log();
                /*      console.log(response.config.params);*/
                console.log("dataDataInfo:");
                /* console.log(response.data.items);*/
                console.log(response.status);
                console.log(response.data);


                console.log(" dataUserinfoitems:");

                var newitems=response.data
                console.log(response.data);



                    this.tableData =newitems

              console.log(" this.tableData");

              console.log(this.tableData);


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
