<template>
  <div class="createtbale">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 设计表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <el-form :model="inServForm" ref="dataList.infiledList"  size="small">
        <el-form-item  prop="servin" >

       <span> 表id{{this.biaoId}} 父id{{biao_parentId}}</span>  表名<el-input v-model="biaoName"></el-input>
          <!--添加按钮--> <el-button type="primary" icon="addUser-icon"   @click="addRow(dataList.infiledList)"><i class="el-icon-lx-tianjia-"></i>新增</el-button>
          <!--刷新-->     <el-button type="success"icon="reFresh-icon"  @click="reloadbtn"><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
          <el-button type="info" icon="el-icon-arrow-up">上移</el-button>
          <el-button type="info" icon="el-icon-arrow-down">下移</el-button>
          <el-button type="success" icon="el-icon-success" circle @click="addBiaoInfo('dataList.infiledList')"></el-button>
          <el-button type="danger" icon="el-icon-error" circle></el-button>
          <template>
            <el-table border :data="dataList.infiledList" style="width: 100%"   @row-click="handleCurrentChange" id="tableinfo">

              <el-table-column        prop="ziduan" label="字段名"style="width:6vw;" >
                <template scope="scope">
                  <el-input size="mini" v-model="scope.row.dbziduan"  style="    border: 0px solid #dcdfe6;"></el-input>
                </template>
              </el-table-column>


              <el-table-column   prop="type" label="类型">
                <template scope="scope">
                  <el-select v-model="scope.row.dbtype" clearable   @change="getdbtype">
                    <el-option
                      v-for="item in fildtps"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"

                    >
                    </el-option>
                  </el-select>

                </template>
              </el-table-column>

              <el-table-column    prop="long"  label="长度" >
                <template scope="scope">
                  <el-input size="mini" v-model="scope.row.dblong"   style="    border: 0px solid #dcdfe6;"></el-input>
                </template>
              </el-table-column>

              <el-table-column        prop="dbisnull" label="允许为空">
                <template scope="scope">
                  <el-radio v-model="scope.row.dbisnull" label="null">null</el-radio>
                  <el-radio v-model="scope.row.dbisnull" label="not null">not null</el-radio>
                </template>
              </el-table-column>


              <el-table-column
                prop="dbiskey"
                label="主键设置"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.dbiskey" label="true" style="    border: 0px solid #dcdfe6;">是</el-radio>
                </template>
              </el-table-column>

              <el-table-column
                prop="dbzizeng"
                label="自增"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-radio v-model="scope.row.dbzizeng" label="AUTO_INCREMENT" @change="getdbzizeng(scope.$index)" style="    border: 0px solid #dcdfe6;">AUTO_INCREMENT</el-radio>
                </template>
              </el-table-column>

              <el-table-column fixed="right"  label="操作">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, dataList.infiledList)" size="small"> 移除 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-form-item>
      </el-form>


    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  import bus from '../common/bus';
  export default {
    inject:['reload'],
    data() {


      return {
        dataList:{
          infiledList:[
            /*{"id":"1","dbziduan":"cid","dbtype":"int","dblong":"25","dbisnull":"not null","dbiskey":"true","dbzizeng":"AUTO_INCREMENT"}*/
          ]
        },

        biao_parentId:'',
        biaoId:'',
        biaoName:'',
        showzizeng:false,
        dbtypevalue:'',
        /*   infiledList:[],*/
        fildtps:[{text:'varchar',value:'varchar'},{text:'tinyint',value:'tinyint'},{text:'smallint',value:'smallint'},{text:'int',value:'int'},{text:'integer',value:'integer'},{text:'bigint',value:'bigint'},{text:'bit',value:'bit'}
          ,{text:'double',value:'double'},{text:'float',value:'float'},{text:'decimal',value:'decimal'},{text:'char',value:'char'},{text:'date',value:'date'},{text:'time',value:'time'},{text:'year',value:'year'}
          ,{text:'datetime',value:'datetime'},{text:'json',value:'json'}
        ],
        inServForm:{

        },
        tableData3: [{
          ziduan: '',
          type: '',
          long: '',
          zhushi: '',
          isnull: '',
        },
        ]
      }
    },
    mounted(){

      this.biaoId = localStorage.getItem('the_desiginBiao');
      this.biao_parentId = localStorage.getItem('the_desiginparentid');
      this.biaoName =  localStorage.getItem('the_tableName');
      this.getAjax()
    },
    created()
    {
      this.getAjax()
      bus.$on('desiginBiao', msg => {
        this.biaoId = msg;
        this.reload()
      })

      bus.$on('desiginparentid', msg => {
        this.biao_parentId = msg;
        this.reload()
      })
      bus.$on('tableName', msg => {
        this.biaoName = msg;
        this.reload()
      })
 /*     this.biaoId = localStorage.getItem('the_desiginBiao');
      this.biao_parentId = localStorage.getItem('the_desiginparentid');
      this.biaoName =  localStorage.getItem('the_tableName');*/

    /*  bus.$on('desiginBiao', msg => {
        this.biaoId = msg;
      })

      bus.$on('desiginparentid', msg => {
        this.biao_parentId = msg;
      })
      bus.$on('tableName', msg => {
        this.biaoName = msg;
      })*/
    },
    methods: {
      reloadbtn()
      {
       console.log("阿达")
    /*    this.reload()*/
        this.getAjax()
      },
      //获取数据
      getAjax(){
        console.log("---------------------------" )
        console.log("desianTable+this.biaoId"+this.biaoId)
        console.log("desianTable+this.biao_parentId"+this.biao_parentId)
        console.log("desianTable+this.biaoName"+this.biaoName)
        console.log("desianTable+databasetype"+ localStorage.getItem('the_databaseChoice'))
        var params = new URLSearchParams();
        params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
        params.append('biaoId',this.biaoId );
        params.append('biao_parentId',this.biao_parentId );
        params.append('biaoName', this.biaoName);
        this.$axios.get('/api/rest/db/showTableInfo',{
          params:{
            databasetype:localStorage.getItem('the_databaseChoice'),
            biaoId:this.biaoId,
            biao_parentId:this.biao_parentId,
            biaoName:this.biaoName

          }
          }
        )
          .then(response =>{
              console.log("ok");
              console.log("getTabkeInfo.response.data");
              console.log(response.data);
              /*      setTree: api.treelist,//节点树数据
                      maxexpandId: api.maxexpandId,//新增节点开始id
                      non_maxexpandId: api.maxexpandId,//新增节点开始id(不更改)*/
              this.dataList.infiledList=response.data.infiledList
            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },
      handleCurrentChange(row, event, column) {
        console.log("handleCurrentChange")
        console.log(row, event, column, event.currentTarget)
      },
      getdbzizeng(event)
      {

        console.log("getdbzizeng")
        console.log(event)
      },
      getdbtype(event) {     //change 触发事件
                             //直接就拿到当前的这个对象了
        console.log("getdbtype")

        console.log(event)

        this.dbtypevalue=event;
        if(event=="int" ||event=="tinyint"   ||event=="float" ||event=="bigint" ||event=="double" ||event=="smallint" ||event=="integer")
        {

          this.showzizeng=true;
        }else {
          this.showzizeng=false;
        }
      },

      /**
       * 创建表和字段按钮
       * */
      addBiaoInfo(infiledList){

        this.$refs[infiledList].validate((valid) => {
          if (valid) {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏

            if(""==this.biaoName)
            {
              alert("请输入表名")
              return false;
            }
            console.log("this.biaoId")
            console.log(this.biaoId)
            console.log(this.biaoName)
            console.log("类型"+localStorage.getItem('the_databaseChoice'))
            console.log(".stringify(this.infiledList)")
            console.log(JSON.stringify(this.infiledList))
            console.log("this.infiledList 创建表和字段的信息")
            console.log(this.infiledList )
            var params = new URLSearchParams();
            console.log("---------------------------" )
            console.log("this.biaoId")
            console.log(this.biaoId)
            console.log(this.biaoName)
            console.log(".stringify(this.infiledList)")
            console.log(JSON.stringify(this.dataList))
            console.log("this.infiledList 创建表和字段的信息")
            console.log(this.infiledList )

            console.log("---------------------------" )

            params.append('biaoId',this.biaoId );
            params.append('biao_parentId',this.biao_parentId );
            params.append('biaoName', this.biaoName);
            params.append('dataList', JSON.stringify(this.dataList));
            params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
            this.$axios.post('/api/rest/db/desginTable',params)
              .then((response)=>{
                //ALLdatabases
                console.log('创建表和字段')
                console.log(response.status)
                if(response.status==400){
                  alert("数据表已存在或字段参数有问题请重新填写");
                }
                if(response.status==404){
                  alert("数据表创建失败");
                }
                if(response.status==201){
                  alert("创建表成功");
                  this.reload()
                }
                console.log('请求成功')
                this.reload()
              })
              .catch((res)=>{
                console.log( "res");
                alert("数据表已存在或字段参数有问题请重新填写");

                console.log( res,'请求失败')
              })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteRow(index, rows) {//删除改行
        rows.splice(index, 1);
      },
      addRow(tableData,event){
        tableData.push({ dbziduan: '',dbtype:'',dblong:'',dbisnull:'',dbiskey:'',dbzizeng:''
        })
      },
    }

  }
</script>
<style scoped>

  .x-pane-header{

    background-image: none;
    background-color: #edf5f4;
    padding: 10px 10px 10px 10px;
    font-size: 13px;
    border: 0;
  }
  #tableinfo input{
    border: 0px solid #dcdfe6;
  }
  .el-input el-input--mini input{
    border: 0px solid #dcdfe6;
  }
  .x-panel-body{
    background: white;
    border: 0;
    color: black;
    font-size: 12px;
    font-weight: normal;
  }

</style>
