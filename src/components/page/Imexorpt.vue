<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i> 导入导出数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">

      <div class="handle-box">
        <el-form ref="form" :model="form" label-width="80px">
          <!--文本框-->

          <el-form-item label="字符" style="display: inline-block; margin-left: 0px;" id="input1">
            <el-col :span="21">
              <el-input v-model="select_wordname"   ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="字本" style="display: inline-block; margin-left: 0px;" id="input2">
            <el-col :span="21">
              <el-input v-model="select_wordtext"   ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="数字"  style="display: inline-block;width: 380px; " id="input3" >
            <el-col :span="8">
              <el-input v-model="select_wordnumber"   ></el-input>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="8">
              <el-input v-model="select_word"  class="handle-input mr10" ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="日期" style="display: inline-block;margin-left: 0px;width: 350px; "  id="input4">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" style="width: auto;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">至</el-col>
            <el-col :span="11">
              <el-time-picker type="date" placeholder="选择日期" style="width: auto;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item size="large" style="display: inline-table;">
            <el-button type="primary" icon="search" @click="search" >搜索</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>

          </el-form-item>
        </el-form>

      </div>

      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="id"
          width="auto">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="name"
          width="auto">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>

              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="age"
          width="auto">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.age }}</span>
          </template>
        </el-table-column>


      </el-table>

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
        tableData: [{
          id: '1',
          name: 'kobe',
          age:'824'
        }, {
          id: '2',
          name: 'wade',
          age:'333'
        }, {
          id: '3',
          name: 'tmac',
          age:'111'
        }
        ]

      }
    }
  }
</script>
<style scoped>
  .el-col-2 {
    width: 6%;
  }
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: auto;
  }
  #input1 .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 5px 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-button+.el-button {
     margin-left: 0px;
  }
</style>
