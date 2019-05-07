<template>
  <div class="designtable">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 打开表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <el-form :model="inServForm" ref="infiledList"  size="small">

        <el-form-item   prop="servin" >
          表id{{this.biaoId}} 父id{{biao_parentId}} 表名<el-input v-model="biaoName"></el-input>
          <!--添加按钮--> <el-button type="primary" icon="addUser-icon"   @click="addRow(infiledList)"><i class="el-icon-lx-tianjia-"></i>新增</el-button>
          <!--刷新-->     <el-button type="success"icon="reFresh-icon"  @click="reloadbtn"><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
          <el-button type="info" icon="el-icon-arrow-up">上移</el-button>
          <el-button type="info" icon="el-icon-arrow-down">下移</el-button>
          <el-button type="success" icon="el-icon-success" circle @click="addBiaoInfo('dataList.infiledList')"></el-button>
          <el-button type="danger" icon="el-icon-error" circle></el-button>

          <template  >
            <el-table border :data="infiledList" style="width: 100%"  @row-click="handleCurrentChange" >
              <el-table-column
                v-for="(item, index) in tableColumnArray"
                :prop="item.prop"
                :label="item.label"
                :key="item.id"
                sortable
                show-overflow-tooltip
                style="width:6vw;" >
                <template scope="scope">
                  <el-input size="mini" v-model="scope.row.fildna"  ></el-input>
                </template>
              </el-table-column>

              <el-table-column fixed="right"  label="操作">
                <template slot-scope="scope">
                  <el-button @click.native.prevent="deleteRow(scope.$index, infiledList)" size="small"> 移除 </el-button>
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
        biao_parentId:'',
        biaoId:'',
        biaoName:'',
        infiledList: [

          {id: "1", userName: "xiaohua"},
          {id: "2", userName: "小明"}
        ],
        fildtps: [{text: '字符', value: '1'}, {text: '数字', value: '2'}],

        inServForm:{

        },
        tableColumnArray: [

          {id: "id", prop: "id", label: "id：唯一标识"},
          {id: "userName", prop: "userName", label: "userName：用户名"}
        ]


      }

    },
    mounted(){

      this.biaoId = localStorage.getItem('the_desiginBiao');
      this.biao_parentId = localStorage.getItem('the_desiginparentid');
      this.biaoName =  localStorage.getItem('the_tableName');
      /*    this.getAjax()*/
    },
    created() {

      bus.$on('desiginBiao', msg => {
        this.biaoId = msg;
      })

      bus.$on('desiginparentid', msg => {
        this.biao_parentId = msg;
      })
      bus.$on('tableName', msg => {
        this.biaoName = msg;
      })
    },
    methods: {
      reloadbtn()
      {
        console.log("阿达")
        /*    this.reload()*/
        this.getAjax()
      },
      handleCurrentChange(row, event, column) {
        console.log("handleCurrentChange")
        console.log(row, event, column, event.currentTarget)
      },

      deleteRow(index, rows) {//删除改行
        rows.splice(index, 1);
      },
      addRow(tableData, event) {
        tableData.push({
          fildna: '', fildtp: '', remark: ''
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
  .x-panel-body{
    background: white;
    font-size: 12px;
    font-weight: normal;
  }
</style>
