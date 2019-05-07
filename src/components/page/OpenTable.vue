<template>
  <div class="createtbale">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 设计表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <el-form :model="inServForm" ref="infiledListdata.data"  size="small">
        <el-form-item  prop="servin" >

          <span>表id{{this.biaoId}} 父id{{biao_parentId}}</span>  表名<el-input v-model="biaoName"></el-input>
          <!--添加按钮--> <el-button type="primary" icon="addUser-icon"   @click="addRow(infiledListdata.data)"><i class="el-icon-lx-tianjia-"></i>新增</el-button>
          <!--刷新-->     <el-button type="success"icon="reFresh-icon"  @click="reloadbtn"><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
          <el-button type="info" icon="el-icon-arrow-up">上移</el-button>
          <el-button type="info" icon="el-icon-arrow-down">下移</el-button>
          <el-button type="success" icon="el-icon-success" circle @click="addBiaoInfo('infiledListdata.data')"></el-button>
          <el-button type="danger" icon="el-icon-error" circle></el-button>

          <template>
            <el-table border :data="infiledListdata.data" style="width: 100%"   @row-click="handleCurrentChange" id="tableinfo">

              <el-table-column
                v-for="(item, index) in tableColumnArray"
                :prop="item.prop"
                :label="item.label"
                :key="item.id"
                :dbzizeng="item.dbzizeng"

                sortable
                show-overflow-tooltip
                style="width:6vw;" >
                <template scope="scope">
                  <el-input size="mini" v-model="scope.row[item.label]"  :id='item.label'  :readonly="item.dbzizeng=='AUTO_INCREMENT'" :disabled="item.dbzizeng=='AUTO_INCREMENT'"></el-input>
                  <br>

                 {{item.label}}
                <!--  :readonly="item.dbzizeng=='AUTO_INCREMENT'" :disabled="item.dbzizeng=='AUTO_INCREMENT'"-->
                  {{scope.$index}}
                </template>
              </el-table-column>

              <el-table-column fixed="right"  label="操作">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, infiledListdata.data)" size="small"> 移除 </el-button>
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
        dbzizeng:'',
        infiledListlength:'',

        dataList:{
          infiledList:[

          ]
        },
        infiledList: [


        ],
        infiledListdata: {
          data:[

             /* {
                "id": "1",
                "name": "kobe",
                "age": "824"
              },
              {
                "id": "2",
                "name": "wade",
                "age": "333"
              },
              {
                "id": "3",
                "name": "aa",
                "age": "123"
              },
              {
                "id": "4",
                "name": "zzzz",
                "age": "123"
              },
              {
                "id": "5",
                "name": "xx",
                "age": "412"
              }*/

          ],
          },
        tableColumnArray: [

         /* {id: "id", prop: "id", label: "id：唯一标识"},
          {id: "userName", prop: "userName", label: "userName：用户名"}*/
        ],
        biao_parentId:'',
        biaoId:'',
        biaoName:'',
        showzizeng:false,
        dbtypevalue:'',
        /*   infiledList:[],*/

        inServForm:{
          data:[


          ],
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

      this.biaoId = localStorage.getItem('the_openBiao');
      this.biao_parentId = localStorage.getItem('the_openparentid');
      this.biaoName =  localStorage.getItem('the_opentableName');
      this.getAjax()
      this.getAjaxdata();
    },
    created()
    {

      this.getAjax()
      this.getAjaxdata()
      bus.$on('openBiao', msg => {
        this.biaoId = msg;
        this.reload()
      })

      bus.$on('openparentid', msg => {
        this.biao_parentId = msg;
        this.reload()
      })
      bus.$on('opentableName', msg => {
        this.biaoName = msg;
        this.reload()
      })

    },
    methods: {
      reloadbtn()
      {
        console.log("阿达")
        /*    this.reload()*/
        this.getAjaxdata();
        this.getAjax()
      },
      //获取字段的信息
      getAjax(){
        console.log("---------------------------" )
        console.log("openTable+this.biaoId"+this.biaoId)
        console.log("openTableTable+this.biao_parentId"+this.biao_parentId)
        console.log("openTableTable+this.biaoName"+this.biaoName)
        console.log("openTableTable+databasetype"+ localStorage.getItem('the_databaseChoice'))
        var params = new URLSearchParams();
        params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
        params.append('biaoId',this.biaoId );
        params.append('biao_parentId',this.biao_parentId );
        params.append('biaoName', this.biaoName);
        this.$axios.get('/api/rest/db/showTableandDatainfo',{
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
              console.log("response.data.infiledList"+response.data.infiledList)
            this.infiledListlength=response.data.infiledList.length
            for(var i=0;i<response.data.infiledList.length;i++)
            {

              this.tableColumnArray.push({
                id: response.data.infiledList[i].dbziduan, prop: response.data.infiledList[i].dbziduan, label: response.data.infiledList[i].dbziduan,dbzizeng:response.data.infiledList[i].dbzizeng
              })
              console.log("response.data.infiledList.dbziduan-------"+response.data.infiledList[i].dbziduan)
            }



            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },


      //获取字段的数据信息
      getAjaxdata(){
        console.log("---------------------------" )
        console.log("openTable+this.biaoId"+this.biaoId)
        console.log("openTableTable+this.biao_parentId"+this.biao_parentId)
        console.log("openTableTable+this.biaoName"+this.biaoName)
        console.log("openTableTable+databasetype"+ localStorage.getItem('the_databaseChoice'))
        var params = new URLSearchParams();
        params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
        params.append('biaoId',this.biaoId );
        params.append('biao_parentId',this.biao_parentId );
        params.append('biaoName', this.biaoName);
        this.$axios.get('/api/rest/db/showTableZDdata',{
            params:{
              databasetype:localStorage.getItem('the_databaseChoice'),
              biaoId:this.biaoId,
              biao_parentId:this.biao_parentId,
              biaoName:this.biaoName

            }
          }
        )
          .then(response =>{
              console.log("字段的数据ok");
              console.log("字段的数据response.data："+response.data);
               this.infiledListdata.data=response.data
            console.log("字段的数据 this.infiledListdata.data："+this.infiledListdata.data);



            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },
      handleCurrentChange(row, event, column) {
        console.log("11handleCurrentChange")
        console.log(row, event, column, event.currentTarget)
      },


      /**
       * 创建表和字段按钮
       * */
      addBiaoInfo(infiledListdata){

        this.$refs[infiledListdata].validate((valid) => {
          if (valid) {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            var datamap = new Map();
            console.log("infiledListdata 长度----"+this.infiledListdata.length)

            for(var i=0;i<this.infiledListdata.length;i++)
             {

               for(var j=0;j<this.infiledListlength;j++)
               {


               }

             }
            console.log("this.biaoId")
            console.log(this.biaoId)
            console.log(this.biaoName)
            console.log("类型"+localStorage.getItem('the_databaseChoice'))


            console.log("this.infiledList打开表")
            console.log(this.infiledList )
            var params = new URLSearchParams();
            console.log("---------------------------" )
            console.log("this.biaoId")
            console.log(this.biaoId)
            console.log(this.biaoName)


            console.log("infiledListdata 字段值")
            console.log(this.infiledListdata )
          console.log("json:"+  JSON.stringify(this.infiledListdata))
            console.log("---------------------------" )

            params.append('biaoId',this.biaoId );
            params.append('biao_parentId',this.biao_parentId );
            params.append('biaoName', this.biaoName);
            params.append('dataList', JSON.stringify(this.infiledListdata));
            params.append('databasetype',  localStorage.getItem('the_databaseChoice'));
            this.$axios.post('/api/rest/db/handTable',params)
              .then((response)=>{
                //ALLdatabases
                console.log('字段数据')
                console.log('添加数据后返回状态：----'+response.status)
                console.log('添加数据后返回数据：----'+response)
                if(response.status==400){
                  alert("数据已存在或字段参数有问题请重新填写");
                }
                if(response.status==404){
                  alert("数据创建失败");
                  this.reload();
                }
                if(response.status==201){
                  alert("数据成功");
                    this.reload();
                }
                console.log('请求成功')

              })
              .catch((res)=>{
                console.log( "res");
                alert("数据已存在或字段参数有问题请重新填写");
                this.reload();
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
        tableData.push(
          {
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
