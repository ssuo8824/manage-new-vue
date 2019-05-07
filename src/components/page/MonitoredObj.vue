<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i> 监视对象</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!--删除按钮-->  <el-button  type="danger" icon="deleteUser-icon" class="handle-del mr10"   @click="delAll"><i class="el-icon-lx-delete" ></i> 批量删除</el-button>

        <!--刷新-->     <el-button type="success"icon="reFresh-icon" class="handle-del mr10"  ><i class="el-icon-lx-shuaxin"></i>刷新</el-button>
        <div class="right" style="position: relative; display: inline-block;">
          <!--文本框-->     <el-input v-model="select_word" placeholder="用户" class="handle-input mr10" style="padding: 6px 10px;"></el-input>
          <!--搜索-->       <el-button type="primary" icon="search" @click="search" >搜索</el-button>
        </div>
      </div>

      <!--表格-->
      <el-table  :data="tableData.slice((this.currpage - 1) * this.pagesize, this.currpage * this.pagesize)"
                 border class="table"
                 ref="multipleTable"
                 @selection-change="handleSelectionChange"
                 :default-sort = "{prop: 'time', order: 'descending'}">

        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <!--<el-table-column prop="id" label="ID" sortable width="180"></el-table-column>-->
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>

        <el-table-column prop="time" label="时间" width="350">
        </el-table-column>

        <el-table-column prop="username" label="用户" width="350">
        </el-table-column>

        <el-table-column  prop="user_ip" label="IP" width="400">
        </el-table-column>



        <el-table-column prop=log label="日志内容" width="450">

        </el-table-column>


      </el-table>
      <div class="pagination">
        <el-pagination background @current-change="handleCurrentChange"  layout="prev, pager, next, sizes, total, jumper"
                       :page-sizes="[30, 40, 50, 60]"
                       :page-size="pagesize":total="tableData.length"
        >
        </el-pagination>
      </div>

    </div>


  </div>

</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              select_word: '',
              cur_page: 1,
              multipleSelection: [],
              del_list: [],
              pagesize: 30,
              currpage: 1,
              tableData: [
                {
                  time:'2018-12-12 10:08',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                },
                {
                  time:'2018-12-13 08:19',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                },
                {
                  time:'2018-12-30 07:20',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                },
                {
                  time:'2019-4-137 15:20',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                },
                {
                  time:'2019-4-18 10:20',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                },
                {
                  time:'2019-4-20 10:00',
                  username:'admin',
                  user_ip:'1.202.67.221',
                  log:'admin登录成功'
                }
              ],


            }
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
