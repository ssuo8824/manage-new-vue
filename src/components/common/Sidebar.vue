<template>
      <div class="sidebar">
        <el-container>
          <el-row style="width: 100%">
            <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="4" class="aside">
              <div class="asideButton" >

                <el-row>
                  <el-col>
                     <transition  mode="out-in" >
                      <el-button icon="el-icon-search" circle   v-if="collapse" @click="showSearch"  title="搜索"></el-button>
                      <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="filterText" size="medium"
                                v-if="!collapse">
                      </el-input>
                    </transition>
                   </el-col>
                </el-row>
              </div>
              <transition  mode="out-in" >
                <el-button icon="el-icon-lx-shitu-" circle   v-if="collapse" @click="showSearch"  title="数据库视图" style="margin-left: 10px;"></el-button>
                <el-aside style="padding-top:10px"  v-if="!collapse">
                  <el-tree :data="setTree" :props="defaultProps" node-key="id" ref="SlotMenuList" :filter-node-method="filterNode" @node-contextmenu='rihgtClick' accordion>
                  <span class="slot-t-node" slot-scope="{ node, data }">
                       <span v-show="!node.isEdit">
                       <span v-show="data.children && data.children.length >= 1" >
                          <i :class="{ 'fa fa-plus-square': !node.expanded, 'fa fa-minus-square':node.expanded} "  style='padding-right: 0px' />

                          <i :class="data.icon" style='padding-right: 0px'></i>
                          <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
                        </span>

                  <span v-show="!data.children || data.children.length == 0">

                    <i :class="data.icon" style='padding-right: 0px'></i>
                    <span :class="[data.id >= maxexpandId ? 'slot-t-node--label' : '']">{{node.label}}</span>
                   </span>
                 </span>
                    <!-- 编辑输入框 -->
                 <span v-show="node.isEdit">
                    <el-input class="slot-t-input" size="mini" autofocus
                              v-model="data.name"
                              :ref="'slotTreeInput'+data.id"
                              @blur.stop="NodeBlur(node, data)"
                              @keyup.enter.native="NodeBlur(node, data)"></el-input>
                 </span>
                 </span>
                  </el-tree>
                  <!--鼠标右键点击具体数据库 出现页面-->
                  <div v-show="menuVisible">
                    <el-menu
                      id = "rightClickMenu"
                      class="el-menu-vertical"
                      @select="handleRightSelect"
                      active-text-color="#fff"
                      text-color="#fff"
                      >
                      <el-menu-item index="1" class="menuItem">
                        <span slot="title" @click="dialogFormVisible = true">新建数据库</span>
                      </el-menu-item>
                      <el-menu-item index="2" class="menuItem">
                        <span slot="title" @click="dialogFormVisible2 = true">编辑数据库</span>
                      </el-menu-item>
                      <el-menu-item index="3" class="menuItem">
                        <span slot="title"  @click="outerVisible3 = true">删除数据库</span>
                      </el-menu-item>
                      <hr style="color: #ffffff">
                      <el-menu-item index="4" class="menuItem">
                        <span slot="title"  @click="dialogTableVisible4 = true">浏览数据库</span>
                      </el-menu-item>
                    </el-menu>
                  </div>


                  <el-dialog title="添加数据库" :visible.sync="dialogFormVisible_Tianjia">
                    <el-form :model="formTianjiDB" ref="formTianjiDB">
                      <el-form-item label="parentid" :label-width="formLabelWidth">
                        <el-input v-model="formTianjiDB.parentid" autocomplete="off" readonly></el-input>
                      </el-form-item>
                      <el-form-item label="addDbId" :label-width="formLabelWidth">
                        <el-input v-model="formTianjiDB.addDbId" autocomplete="off" readonly></el-input>
                      </el-form-item>
                      <el-form-item label="数据库名" :label-width="formLabelWidth">
                        <el-input v-model="formTianjiDB.databasename" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="字符集" :label-width="formLabelWidth">
                        <el-select v-model="formTianjiDB.zifuji" placeholder="">
                          <el-option label="utf8" value="utf8"></el-option>

                        </el-select>
                      </el-form-item>
                      <el-form-item label="排序规则" :label-width="formLabelWidth">
                        <el-select v-model="formTianjiDB.paixuguize" placeholder="utf8_general_ci">
                          <el-option label="utf8_general_ci" value="utf8_general_ci"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible_Tianjia=false ">取 消</el-button>
                      <el-button type="primary" @click="addDB('formTianjiDB')">确 定</el-button>
                    </div>
                  </el-dialog>


                  <el-dialog title="新建数据库" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                      <el-form-item label="数据库名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="所有者" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="admin">
                          <el-option label="sa" value="sa"></el-option>

                        </el-select>
                      </el-form-item>
                      <el-form-item label="排序规则" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="utf8_general_ci">
                          <el-option label="utf8_general_ci" value="utf8_general_ci"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible ">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>


                  <el-dialog title="编辑数据库" :visible.sync="dialogFormVisible2">
                    <el-form :model="form">
                      <el-form-item label="数据库名" :label-width="formLabelWidth">
                        <el-input v-model="form.name"placeholder="test" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="所有者" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="admin">
                          <el-option label="sa" value="sa"></el-option>

                        </el-select>
                      </el-form-item>
                      <el-form-item label="排序规则" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="utf8_general_ci">
                          <el-option label="utf8_general_ci" value="utf8_general_ci"></el-option>

                        </el-select>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
                    </div>
                  </el-dialog>




                  <el-dialog title="删除数据库" :visible.sync="outerVisible3">
                    <el-dialog
                      width="30%"
                      title="已删除"
                      :visible.sync="innerVisible3"
                      append-to-body>
                    </el-dialog>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="outerVisible = false">取 消</el-button>
                      <el-button type="primary" @click="innerVisible3 = true">确定删除</el-button>
                    </div>
                  </el-dialog>




                  <el-dialog title="db_420" :visible.sync="dialogTableVisible4">
                    <el-table :data="gridData2">
                      <el-table-column property="date" label="名称" width="150"></el-table-column>
                      <el-table-column property="name" label="所有者" width="200"></el-table-column>

                      <el-table-column property="address" label="创建时间"></el-table-column> <!--11111111-->
                    </el-table>
                  </el-dialog>




                  <!--鼠标右键点击 表 出现页面-->
                  <div v-show="menuVisibleBiao">
                    <el-menu
                      id = "rightClickbiao"
                      class="el-menu-vertical"
                      @select="handleRightSelect"
                      active-text-color="#fff"
                      text-color="#fff"
                      router>
                      <el-menu-item  class="menuItem"  index="createTable" >
                        <span slot="title">新建表</span>
                      </el-menu-item>

                    </el-menu>
                  </div>


                  <!--鼠标右键点击具体表 出现页面-->
                  <div v-show="menuVisibleBiao5">
                    <el-menu
                      id = "rightClickbiao5"
                      class="el-menu-vertical"
                      @select="handleRightSelect"
                      active-text-color="#fff"
                      text-color="#fff"
                      router>
                      <el-menu-item index="designTable" class="menuItem">
                        <span slot="title">设计表</span>
                      </el-menu-item>
                      <el-menu-item index="openTable" class="menuItem">
                        <span slot="title">打开表</span>
                      </el-menu-item>
                      <el-menu-item index="13" class="menuItem">
                        <span slot="title">删除表</span>
                      </el-menu-item>
                      <hr style="color: #ffffff">

                    </el-menu>
                  </div>


                  <!--鼠标右键点击 level 2数据库出现页面-->
                  <div v-show=" menuVisibleDasebase">
                    <el-menu
                      id = "rightClickDasebase"
                      class="el-menu-vertical"
                      @select="handleRightSelect"
                      active-text-color="#fff"
                      text-color="#fff">
                      <el-menu-item index="6" class="menuItem">
                        <span slot="title"  @click="dialogFormVisible_Tianjia = true">添加数据库</span>
                      </el-menu-item>

                    </el-menu>
                  </div>
                </el-aside>
              </transition>

            </el-col>

          </el-row>

        </el-container>
      </div>
</template>
<script type="text/ecmascript-6">
  import ElCol from "element-ui/packages/col/src/col";
  import api from '../../resource/api'
  import bus from '../common/bus';

  api.treelist = api.treelist
  let id = 1000;
  export default {

    inject:['reload'],
    components: { ElCol },
    data() {
      const item = {

      };
      return {

        formTianjiDB:{
          parentid:'',
          addDbId:'',
          databasename:'',
          zifuji:'',
          paixuguize:''

        },

        gridData2: [
          {
          date: 'db_420',
          name: 'root',

          address: '2019-4-20',
        },
          {
            date: 'db_413',
            name: 'root',

            address: '2019-4-19',
          },

          {
            date: 'db_441',
            name: 'root',

            address: '2019-4-17',
          },
        ],
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible4: false,
        outerVisible3: false,
        innerVisible3: false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible_Tianjia:false,
        dialogTableVisible2: false,
        dialogFormVisible2: false,

        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        databaseChoice:'',
        formLabelWidth: '120px',
        DATA: null,
        NODE: null,
        dialogNewFormVisible: false,
        dialogFormVisible: false,
        dialogClassifyVisible: false,
        tableData: Array(10).fill(item),
        setTree: [],//节点树数据
        maxexpandId: [],//新增节点开始id
        non_maxexpandId: [],//新增节点开始id(不更改)
        isLoadingTree: true,//是否加载节点树

        defaultProps: {
          children: 'children',
          label: 'name'
        },
        filterText: '',
        input: "",

        currentPage4: 4,
        editObj: {},
        menuVisible: false,
        menuVisibleBiao:false,
        menuVisibleDasebase:false,
        menuVisibleBiao5:false,
        objectID: null,

        collapse: false,

      }
    },
    computed:{
      onRoutes(){
        return this.$route.path.replace('/','');
      }
    },
    mounted(){
      localStorage.getItem('the_databaseChoice')
      console.log("the.databaseChoice")
      console.log(localStorage.getItem('the_databaseChoice'))
      this.getAjax()
    },
    created(){


      console.log("api.treelist")
      console.log(api.treelist)
      console.log(this.setTree)
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      bus.$on('collapse', msg => {
        this.collapse = msg;
      })
    },
    methods: {

      /**
       * 创建数据库按钮
       * */
      addDB(formTianjiDB){

        var params = new URLSearchParams();
        console.log("---------------------------" )
        console.log( localStorage.getItem('the_databaseChoice'))
        console.log(this.formTianjiDB.parentid )
        console.log(this.formTianjiDB.addDbId )
        console.log(this.formTianjiDB.databasename )
        console.log(this.formTianjiDB.zifuji )
        console.log(this.formTianjiDB.paixuguize )
        console.log("---------------------------" )
        params.append('parentid', this.formTianjiDB.parentid);
        params.append('addDbId', this.formTianjiDB.addDbId);
        params.append('databasename', this.formTianjiDB.databasename);
        params.append('zifuji', this.formTianjiDB.zifuji);
        params.append('paixuguize', this.formTianjiDB.paixuguize);
        params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
        this.$refs[formTianjiDB].validate((valid) => {
          if (valid) {

            console.log("this.formTianjiDB 添加数据库的信息")
            console.log(this.formTianjiDB )
            this.$axios.post('/api/rest/db/addDB',params/*,{
                 headers:{
                    'Access-Cotrol-Allow-Origin':'*',


                  }
                }*/)
              .then((response)=>{
                //ALLdatabases
                console.log('添加数据库的')
                console.log(response.status)
                if(response.status==400){
                  alert("数据库名已存在");
                }
             if(response.status==201){
               alert("数据添加成功");
               this.reload()
             }
                console.log('请求成功')
                this.reload()
              })
              .catch((res)=>{
                alert("数据库名已存在");
                this.reload()
                console.log( res,'请求失败')
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },





      //获取数据
      getAjax(){
        this.$axios.get('/api/rest/db/showDBMenu'
        )
          .then(response =>{
              console.log("ok");
            console.log("getLinkInfo.response.data");
              console.log(response.data);
      /*      setTree: api.treelist,//节点树数据
              maxexpandId: api.maxexpandId,//新增节点开始id
              non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)*/
             this.setTree=response.data.treelist;
             this.maxexpandId=response.data.maxexpandId;
            this.non_maxexpandId=response.data.maxexpandId;
            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },
      //点击左的圆圈搜索展开
      showSearch(){

      },

      filterNode(value, data) {
        console.log('value:',value)
        console.log('data:',data)
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleRightSelect(key) {
        console.log(key);
        if (key == 1) {
          console.log("key=1")
          this.NodeAdd(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 2) {
          console.log("key=2")
          this.NodeEdit(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if (key == 3) {
          console.log("key=3")
          this.NodeDel(this.NODE, this.DATA);
          this.menuVisible = false;
        } else if(key == 4){
          console.log("key=4")
          console.log('4')
          this.menuVisible = false;
        } else if(key == 5){
          console.log("key=5")
          this.NodeAddBiao(this.NODE, this.DATA);
          console.log('5')
          this.menuVisibleBiao = false;
        }
        else if(key == 6){
          console.log("key=6")
          this.NodeAddDasebase(this.NODE, this.DATA);
          console.log('6')
      /*    this.menuVisibleBiao = false;*/
          this.menuVisibleDasebase=false;
        }
        else if(key == 'designTable'){
          this.NodedesignTable(this.NODE, this.DATA);
          console.log('11')
          this.menuVisibleBiao5 = false;
        }else if(key == 'openTable'){
          this.NodeopenTable(this.NODE, this.DATA);
          console.log('12')
          this.menuVisibleBiao5 = false;
        }else if(key == 13){
          this.NodedelBaio(this.NODE, this.DATA);
          console.log('13')
          this.menuVisibleBiao5 = false;
        }else if(key == 'createTable'){
          this.NodecreateTable(this.NODE, this.DATA);
          console.log('14')
          this.menuVisibleBiao = false;
        }

      },

//删除数据
      NodeDel(n, d){
        console.log(n, d)
        let that = this;
        if(d.children && d.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
        }else{
          //新增节点可直接删除，已存在的节点要二次确认
          //删除操作
          let DelFun = () => {
            let _list = n.parent.data.children || n.parent.data;//节点同级数据
            let _index = _list.map((c) => c.id).indexOf(d.id);
            console.log(_index)
            _list.splice(_index, 1);
            this.$message.success("删除成功！")
          }
          //二次确认
          let ConfirmFun = () => {
            this.$confirm("是否删除此节点？","提示",{
              confirmButtonText: "确认",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              DelFun()
            }).catch(() => {})
          }
          //判断是否是新增节点
          d.id > this.non_maxexpandId ? DelFun() : ConfirmFun()
        }
      },

      //设计表
      NodedesignTable(n, d){
        console.log("设计表")
        console.log("n.")
        console.log(n)
        console.log("n.expanded")
        console.log(n.expanded)
        console.log("N.parent")
        console.log(n.parent)

        console.log("n.parent.data.children")
        console.log(n.parent.data.children)
        console.log("d")
        console.log(d)
        var data=d.id
        localStorage.setItem('the_desiginBiao',data);
        localStorage.setItem('the_desiginparentid',  d.parent_Id);
        localStorage.setItem('the_tableName',   d.name);
        bus.$emit('desiginBiao',  data)  //data就是触发updata事件要带走的数据
        bus.$emit('desiginparentid',  d.parent_Id)  //data就是触发updata事件要带走的数据
        bus.$emit('tableName',  d.name)  //data就是触发updata事件要带走的数据
        console.log("d.children")
        console.log(d.children)

        //判断层级
        if(n.level >= 6){
          this.$message.error("最多只支持6级！")
          return false;
        }



        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }


      },
  //打开表
  NodeopenTable(n, d){
    console.log("打开表")
    console.log("n.")
    console.log(n)
    console.log("n.expanded")
    console.log(n.expanded)
    console.log("N.parent")
    console.log(n.parent)

    console.log("n.parent.data.children")
    console.log(n.parent.data.children)
    console.log("d")

    var data=d.id
    localStorage.setItem('the_openBiao',data);
    console.log("data--"+data)
    localStorage.setItem('the_openparentid',  d.parent_Id);
    console.log(" d.parent_Id--"+ d.parent_Id)
    localStorage.setItem('the_opentableName',   d.name);
    console.log("  d.name--"+  d.name)
    bus.$emit('openBiao',  data)  //data就是触发updata事件要带走的数据
    bus.$emit('openparentid',  d.parent_Id)  //data就是触发updata事件要带走的数据
    bus.$emit('opentableName',  d.name)  //data就是触发updata事件要带走的数据
    console.log(d)
    console.log("d.children")
    console.log(d.children)

    //判断层级
    if(n.level >= 6){
      this.$message.error("最多只支持6级！")
      return false;
    }

    //如果等于对应的具体表添加数据库
    /*  if(n.level==2){
        //新增数据
        console.log("d.children")
        console.log(d.children)
        d.children.push({

          id: ++this.maxexpandId,
          name: 'db_Class',
          pid:  n.parent.data.children.id,
          children: [
            {

            }
          ]
        })


      }*/

    //同时展开节点
    if(!n.expanded){
      n.expanded = true
    }


  },
//新建表



      NodecreateTable(n, d){
        //组件A中，监听事件
        //组件B中，触发事件
        var data=d.id
        bus.$emit('createrbiao',  data)  //data就是触发updata事件要带走的数据

        bus.$emit('parentid',  d.parent_Id)  //data就是触发updata事件要带走的数据
        console.log("新建表")
        console.log("n.")
        console.log(n)
        console.log("n.expanded")
        console.log(n.expanded)
        console.log("N.parent")
        console.log(n.parent)

        console.log("n.parent.data.name")
        console.log(n.parent.data.name)
        console.log("当前的信息d")
        console.log(d)

        console.log( "this.parent_Id")
        console.log(    d.parent_Id)

        console.log( "this.表的Id")
        console.log( d.id)
        console.log("子的d.children")
        console.log(d.children)

        //判断层级
        if(n.level >= 6){
          this.$message.error("最多只支持6级！")
          return false;
        }

        //如果等于对应的具体表添加数据库
        /*  if(n.level==2){
            //新增数据
            console.log("d.children")
            console.log(d.children)
            d.children.push({

              id: ++this.maxexpandId,
              name: 'db_Class',
              pid:  n.parent.data.children.id,
              children: [
                {

                }
              ]
            })


          }*/

        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }


      },
      //新增数据库
      NodeAddDasebase(n, d){
        console.log("新增数据库")
        console.log("n.")
        console.log(n)
        console.log("n.expanded")
        console.log(n.expanded)
        console.log("N.parent")
        console.log(n.parent)

        console.log("n.parent.data.name")
        console.log(n.parent.data.name)
        console.log("当前的信息d")
        console.log(d)
        this.formTianjiDB.addDbId=d.id
        this.formTianjiDB.parentid=d.parent_Id
        console.log( "this.parent_Id")
        console.log( this.formTianjiDB.parentid)

        console.log( "this.addDbId")
        console.log(this.formTianjiDB.addDbId)
        console.log("子的d.children")
        console.log(d.children)

        //判断层级
        if(n.level >= 6){
          this.$message.error("最多只支持6级！")
          return false;
        }

        //如果等于对应的具体表添加数据库
      /*  if(n.level==2){
          //新增数据
          console.log("d.children")
          console.log(d.children)
          d.children.push({

            id: ++this.maxexpandId,
            name: 'db_Class',
            pid:  n.parent.data.children.id,
            children: [
              {

              }
            ]
          })


        }*/

        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }


      },

//编辑数据库
      NodeEdit(n,d){
        console.log("编辑数据库")
        console.log("n.")
        console.log(n)
        console.log("n.expanded")
        console.log(n.expanded)
        console.log("N.parent")
        console.log(n.parent)

        console.log("n.parent.data.children")
        console.log(n.parent.data.children)
        console.log("d")
        console.log(d)
        console.log("d.children")
        console.log(d.children)
      },

      //新建数据库
      NodeAdd(n, d){
        console.log("新建数据库")
        console.log("n.")
        console.log(n)
        console.log("n.expanded")
        console.log(n.expanded)
        console.log("N.parent")
        console.log(n.parent)

        console.log("n.parent.data.children")
        console.log(n.parent.data.children)
        console.log("d")
        console.log(d)
        console.log("d.children")
        console.log(d.children)
        //判断层级
        if(n.level >= 6){
          this.$message.error("最多只支持6级！")
          return false;
          //同时展开节点
          if(!n.expanded){
            n.expanded = true
          }
        }


        //测试数据新增的
     /*   //如果等于对应的具体表
        if(n.level==4){
          //新增数据
          n.parent.data.children.push({

            id: ++this.maxexpandId,
            name: 'User',
            pid:  n.parent.data.children.id,
            children: [
              {
                level:4,
                id: 42,
                name: "Int uid",
                pid: 1,
                remark: '',
                isEdit: false,
                children: [
                  {

                  }
                ]
              }
            ]
          })

          //同时展开节点
          if(!n.expanded){
            n.expanded = true
          }
        }

        //如果等于对应的数据库
        if(n.level==3){
          //新增数据
          n.parent.data.children.push({

            id: ++this.maxexpandId,
            name: 'db_abc',
            pid:  n.parent.data.children.id,
            children: [
              {
                level:4,
                id: 42,
                name: "表",
                pid: 1,
                remark: '',
                isEdit: false,
                children: [
                  {

                  }
                ]
              }
            ]
          })

          //同时展开节点
          if(!n.expanded){
            n.expanded = true
          }
        }


        //如果等于对应的具体表
        if(n.level==5){
          //新增数据
          n.parent.data.children.push({

            id: ++this.maxexpandId,
            name: 'User',
            pid:  n.parent.data.children.id,
            children: [
              {
                level:4,
                id: 42,
                name: "Int uid",
                pid: 1,
                remark: '',
                isEdit: false,
                children: [
                  {

                  }
                ]
              }
            ]
          })

          //同时展开节点
          if(!n.expanded){
            n.expanded = true
          }
        }*/


        //同时展开节点
        if(!n.expanded){
          n.expanded = true
        }
      },

      //新增表
      NodeAddBiao(n, d){
        console.log("新增节点表")

        //判断层级
        if(n.level >= 6){
          this.$message.error("最多只支持6级！")
          return false;
        }

        //如果等于对应的具体表
        if(n.level==4){
          //新增数据
          console.log("d.children")
          console.log(d)
          d.children.push({

            id: ++this.maxexpandId,
            name: 'Class',
            pid:  n.parent.data.children.id,
            children: [
              {
                level:5,
                id: 42,
                name: "Int cid",
                pid: 1,
                remark: '',
                isEdit: false,
                children: [
                  {

                  }
                ]
              }
            ]
          })


        }




      },

      /*点击右键*/
      rihgtClick(event, object, value, element) {
        console.log("object level")
        console.log(object.level)
        console.log("object")
        console.log(object)

        console.log("value")
        console.log(value)
        this.menuVisible=false
        this.menuVisibleBiao=false
        this.menuVisibleBiao5=false
        this.menuVisibleDasebase=false
        console.log(this.menuVisible)
        if (this.objectID !== object.id) {
          this.objectID = object.id;

          if( value.level==3)
          {
            console.log(" 点击右键3")
            this.menuVisible = true;



            this.DATA = object;
            this.NODE = value;
            console.log(this.menuVisible)
          }
          //右键表
          if(value.level==4){
            console.log("右键4 ")
            this.menuVisibleBiao = true;

            this.DATA = object;
            this.NODE = value;
            console.log(this.menuVisibleBiao)
          }
          //右键数据库
          if(value.level==2){
            console.log("右键2")
            this.menuVisibleDasebase = true;

            this.DATA = object;
            this.NODE = value;
            console.log(this.menuVisibleDasebase)
          }

          //右键具体表
          if(value.level==5)
          {
            console.log(" 右键5")
            this.menuVisibleBiao5 = true;
            this.DATA = object;
            this.NODE = value;
            console.log(this.menuVisibleBiao5)
          }

        } else{
          console.log("object.level")
          console.log(object.level)
          switch (value.level) {
            case 2 :
              this.menuVisibleDasebase=!this.menuVisibleDasebase
              break;
            case 3 :
              this.menuVisible=!this.menuVisible;
              break;
            case 4 :
              this.menuVisibleBiao=!this.menuVisibleBiao
              break;
            case 5 :
              this.menuVisibleBiao5=!this.menuVisibleBiao5
              break;

          }
        }
        document.addEventListener('click',(e)=>{
          this.menuVisible = false;
          this.menuVisibleBiao=false;
          this.menuVisibleBiao5=false;
          this.menuVisibleDasebase=false;
        })
        let menu = document.querySelector("#rightClickMenu");
        let menuBiao= document.querySelector("#rightClickbiao");
        let menuDasebase= document.querySelector("#rightClickDasebase");
        let menuBiao5= document.querySelector("#rightClickbiao5");
        /* 菜单定位基于鼠标点击位置 */
        menu.style.left = event.clientX + 20 + "px";
        menu.style.top = event.clientY - 30 + "px";
        menu.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        menu.style.width = 160 + "px";
        /* 菜单定位基于鼠标点击位置 */
        menuBiao.style.left = event.clientX + 20 + "px";
        menuBiao.style.top = event.clientY - 30 + "px";
        menuBiao.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        menuBiao.style.width = 160 + "px";
        /* 菜单定位基于鼠标点击位置 */
        menuDasebase.style.left = event.clientX + 20 + "px";
        menuDasebase.style.top = event.clientY - 30 + "px";
        menuDasebase.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        menuDasebase.style.width = 160 + "px";
        /* 菜单定位基于鼠标点击位置 */
        menuBiao5.style.left = event.clientX + 20 + "px";
        menuBiao5.style.top = event.clientY - 30 + "px";
        menuBiao5.style.position = "absolute"; // 为新创建的DIV指定绝对定位
        menuBiao5.style.width = 160 + "px";

      },

      dialogNewFormConfirm() {
        (this.dialogNewFormVisible = false),
          this.$message({
            type: "success",
            message: "新建成功!"
          });
      },
      handleNew() {
        this.dialogNewFormVisible = true;
      },

      handleEdit(index, row) {
        this.editObj = row;
        this.dialogFormVisible = true;
        console.log(index, row);
      },
      handleClassifyEdit(index, row) {
        console.log(index);
        console.log(row);
        this.dialogClassifyVisible = true;
        // console.log(index, row);
      }

    },
  }
</script>
<style lang="less" scoped>

  .el-tree i {
    margin-right: 0px;
  }
  .el-tree-node__content:hover {
    background-color: brown;
  }

  .v-enter,.v-leave-to{
    opacity: 0;

  }
  .v-enter-active,.v-leave-active{
    transition: all 0.4s ease;
  }
  .el-button{
    /*background-color: #324157;
    border: 1px solid #324157;
    color: #fff;*/
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #324157;
    border: 1px solid #606266;


  }
  .el-button:hover{
    /*background-color: #324157;
    border: 1px solid #324157;
    color: #fff;*/
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: yellowgreen;
    border: 1px solid #606266;

  }
  .sidebar{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
    
    width: 250px;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 250px;
  }
  .sidebar > ul {
    height:100%;
  }



  /*顶部按钮*/
  .slot-tree .slot-t-top{
    margin-bottom: 15px;
  }
  .slot-tree .slot-t-node span{
    display: inline-block;
  }
  /*节点*/
  .slot-tree .slot-t-node--label{
    font-weight: 600;
  }
  /*输入框*/
  .slot-tree .slot-t-input .el-input__inner{
    // height: 26px;
    // line-height: 26px;
  }
  /*按钮列表*/
  .slot-tree .slot-t-node .slot-t-icons{
    display: none;
    margin-left: 10px;
  }
  .slot-tree .slot-t-icons .el-button+.el-button{
    margin-left: 6px;
  }
  .slot-tree .el-tree-node__content:hover .slot-t-icons{
    display: inline-block;
  }



.el-col-lg-6 {
    width: 100%;
  }

  .el-tree-node__content>.el-tree-node__expand-icon {
    display: none;
  }

  .aside{
    border-right: 1px solid #e6e9f0;
    height: -webkit-fill-available;
    background-color: #324157;
  }
  .asideButton{

  }
  .asideButton .el-row{
    padding: 10px;
  }
  .asideButton .el-row i{
    color: #bdc1ca;
  }
  .el-tree {
    color: #fff;
    background-color: #324157;
  }
  .asideButton .el-input{
    width: 220px;
  }
  .asideButton .el-input input{
    border-radius: 35px;
  }
  label{
    line-height: 40px;
  }
  .el-table{
    margin-top: 25px
  }
  .el-table i{
    color: #777777;
    padding-right: 0px;
    margin-right: 20px;
  }
  .block{
    padding-top: 5%;
  }
  .block i{
    color: #777777;
  }




  /*************************标签鼠标右击页面样式******************************/
  .el-menu-vertical{
    border: 3px solid rgb(84, 92, 100);
    border-radius: 10px;
    z-index: 100;
  }
  .el-menu-vertical i{
    color: #777777;
  }
  .menuItem{
    height: 40px;
    line-height: 20px;
    background-color: #545c64;
    font-size: 1.2rem;
  }
  .menuItem:hover{
    background-color: #409EFF;
  }









</style>
