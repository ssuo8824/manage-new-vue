<template>
  <div>
    <div class="crumbs">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 权限设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-container>
        <el-aside width="200px" >
          <el-aside width="200px" style="background-color: rgb(238, 241, 246);" node-key="id" >
            <el-tree
              :data="roles"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick" class="el-tabs__nav-wrap" style="    padding-right: 20%;">

              <span class="slot-t-node" slot-scope="{ node, data }">
                <i class="el-icon-lx-quanxianshezhi" style='margin-right:0px'></i>
                    <span :class="el-icon-lx-quanxianshezhi">{{data.name}} {{data.username}}</span>

              </span>

            </el-tree>
          </el-aside>
        </el-aside>

        <el-main>
          <el-form  :model="form" class="demo-form-inline">

            <el-form-item label="权限设置">




              <div v-for="(list,index2) in operationList" class="line-check" :key="list.eventypeid">
                 <div v-model="checkAll" :label="list.eventypeid" >{{list.eventtyname}}{{list.ischecked}}</div>

                 <el-checkbox-group v-model="from.checkOne" class="checkGroup" @change="handleCheckedCitiesChange(2,index2)" :disabled="list.ruleid==1">

                   <el-checkbox  v-for="(operate,indexx) in list.operation" :label="operate.actionid"   @change="handleCheckedCitiesChange(3,index2,indexx)" :key="operate.actionid"  name="checkOne" >
                    {{operate.actionname}} {{operate.ischecked}}  {{operate.permission}}</el-checkbox>


                    </el-checkbox-group>
              </div>


            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
            </el-form-item>
          </el-form>

        </el-main>
      </el-container>


    </div>


  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      components:{

      },
        data() {
          return {

            num1:0,//没选择的计数
            num2:0,//选中的计数
            getruleid:'',
            getoperator:'',
            checkAll:[],
            checkOne1:[],
            from:{
              checkOne:[],
            },




            isIndeterminate: true,
            //角色权限列表
            operationList: [


           ],
           //admin权限
            operationListadmin: [
              {
                ruleId:1,
                ruleid: 1,
                eventypeid:"010100",
                eventtyname:'功能',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {

                    actionid:"10101001",
                    actionname:'全文检索',
                    eventypeid:"010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',
                    role:0
                  },
                  {

                    actionid:"10101002",
                    actionname:'导入导出',
                    eventypeid:"1010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission:true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleId:1,
                ruleid: 1,
                eventypeid:"1010101",
                eventtyname:'数据库权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"10101011",
                    actionname:'连接数据库',
                    eventypeid:"1010101",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission:true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"10101012",
                    actionname:'查看数据库',
                    eventypeid:"1010101",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleid: 1,
                ruleId:1,
                eventypeid:"1010102",
                eventtyname:'数据表权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"10101021",
                    actionname:'设计表',
                    eventypeid:"1010102",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission:true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"10101022",
                    actionname:'更新表',
                    eventypeid:"1010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"10101023",
                    actionname:'删除表',
                    eventypeid:"1010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              }

            ],
            //角色权限列表
            operationListUser1: [
              {
                ruleId:12,

                eventypeid:"12010100",
                eventtyname:'功能',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"120101001",
                    actionname:'全文检索',
                    eventypeid:"12010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"120101002",
                    actionname:'导入导出',
                    eventypeid:"12010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleId:1,
                eventypeid:"12010101",
                eventtyname:'数据库权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"120101011",
                    actionname:'连接数据库',
                    eventypeid:"12010101",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"120101012",
                    actionname:'查看数据库',
                    eventypeid:"12010101",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'0',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleId:1,
                eventypeid:"12010102",
                eventtyname:'数据表权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"120101021",
                    actionname:'设计表',
                    eventypeid:"12010102",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission: false,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"120101022",
                    actionname:'更新表',
                    eventypeid:"12010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"120101023",
                    actionname:'删除表',
                    eventypeid:"12010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: false,
                    ischecked:'0',
                    isvisible:'1',

                  }
                ],
              }

            ],
            //角色权限列表
            operationListUser2: [
              {
                ruleId:13,
                eventypeid:"13010100",
                eventtyname:'功能',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"130101001",
                    actionname:'全文检索',
                    eventypeid:"13010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"130101002",
                    actionname:'导入导出',
                    eventypeid:"13010100",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleId:1,
                eventypeid:"13010101",
                eventtyname:'数据库权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"130101011",
                    actionname:'连接数据库',
                    eventypeid:"13010101",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"130101012",
                    actionname:'查看数据库',
                    eventypeid:"13010101",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              },
              {
                ruleId:1,
                eventypeid:"13010102",
                eventtyname:'数据表权限',
                ischecked:"1",
                isvisible:"1",
                operation:[
                  {
                    actionid:"130101021",
                    actionname:'设计表',
                    eventypeid:"13010102",
                    actionurl:"../components/page/linkDatabase.vue",
                    permission: false,
                    ischecked:'1',
                    isvisible:'1',

                  },
                  {
                    actionid:"130101022",
                    actionname:'更新表',
                    eventypeid:"13010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: false,
                    ischecked:'0',
                    isvisible:'1',

                  },
                  {
                    actionid:"130101023",
                    actionname:'删除表',
                    eventypeid:"13010102",
                    actionurl:"../components/page/Fullselect.vue",
                    permission: true,
                    ischecked:'1',
                    isvisible:'1',

                  }
                ],
              }

            ],

            //用户角色列表
            roles: [
              {
                ruleid: 1,
              uid: 1,
              pid: 0,
              name: '超级管理员',
              operator: 'Admin',
              username: 'admin',
              password: '000',
              role: '0',
              status: '1',
              children: [
                {
                  ruleid: 12,
                  pid: 1,
                  name: '普通用户',
                  operator: 'User',
                  username: 'tjw',
                  password: '123',
                  role: '1',
                  status: '1',
                },
                {
                  ruleid: 13,
                  pid: 1,
                  name: '普通用户',
                  operator: 'User',
                  username: 'tjw1',
                  password: '123',
                  role: '1',
                  status: '1',
                },

              ],
             },
          ],


          }
        },
    /*  mounted(){
        this.get()
      },*/
      created(){




      },

      methods: {
        //获取role和operator
        get(){
          if(this.getruleid==1 && this.getoperator=="Admin"){
            console.log("ok1")
             this.operationList=this.operationListadmin
          }
          if(this.getruleid==12 && this.getoperator=="User"){
            console.log("ok2")
            this.operationList=this.operationListUser1
          }
          if(this.getruleid==13 && this.getoperator=="User"){
            console.log("ok3")
            this.operationList=this.operationListUser2
          }
          for(var i=0;i<this.operationList.length;i++){

            for(var k=0;k<this.operationList[i].operation.length;k++){
              if(this.operationList[i].operation[k].ischecked==1){
                console.log("i");
                console.log(this.operationList.length);
                console.log("k");
                console.log(this.operationList[i].operation.length);
                console.log(this.operationList[i].operation[k].actionid)
                this.from.checkOne.push(this.operationList[i].operation[k].actionid);
                console.log( "this.from.checkOne");
                console.log( this.from.checkOne);
              }
            }
          }
        },
    /* handleCheckedCitiesChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.cities.length;
          console.log(value);
        },*/
        handleNodeClick(data) {
          console.log("单击角色");
          console.log(data);
          this.getoperator=data.operator
          console.log(this.getoperator);
          this.getruleid=data.ruleid
          console.log(  this.getruleid);
          this.get()
        },
        handleCheckedCitiesChange(type,a=0,c=0,val)
        {//多选框


          //单选
          if (type == 3) {

          console.log("else")
          console.log("a")
          console.log(a)
          console.log("c")
          console.log(c)
          console.log(" this.operationList[0].operation[0]")
          console.log(this.operationList[0].operation[c])
          var num1 = 0;
          var num2 = 0;
          var len = this.operationList[a].operation.length;//单选框长度
          console.log("len")
          console.log(len)
          if (val == true) {
            console.log("123")
          }
          this.operationList[a].operation[c].ischecked = this.operationList[a].operation[c].ischecked == 1 ? 0 : 1;
            this.operationList[a].operation[c].permission = this.operationList[a].operation[c].ischecked == true? false : true;
          for (var i = 0; i < len; i++) {
            if (this.operationList[a].operation[i].ischecked == 1) {
              num2++;//选中计数
            } else {
              num1++;//没选计数
            }

            if (num1 == len) {
              this.checkAll = this.checkAll.map(res => {
                if (res != this.operationList[a].eventtypeid) {
                  return res;
                }
              });
              this.operationList[a].ischecked = 0;
            }
            if (num2 == len) {
              this.checkAll.push(this.operationList[a].eventtypeid)
              this.operationList[a].ischecked = 1;
              this.$set(this.operationList[a], "ischecked", 1);
            }


            this.actionids = this.operationList[a].operation[c].actionid;


          }
        }
       },



      },

    }
</script>
<style>
  .el-tree {
    padding-left: 5%;
    padding-right: 20%;
    background-color: #FAFAFA;
    font-size: 1.0rem;
  }
  .el-tree i {
    color: #409EFF;
     padding-right: 0px;
  }
  .el-tree {
    padding-left: 5%;
    padding-right: 30%;
    background-color: #fff;
    font-size: 1.0rem;
  }
  .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 160px;
    bottom: 0;
    width: 2px;
    height: 100%;
    background-color: #e4e7ed;
    z-index: 1;
  }
</style>

