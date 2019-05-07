<template>
  <div>
     <div class="crumbs">
       <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-rizhi"></i> 运行及展示</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
    <div class="container">
      <div id="operator" class="panel-header panel-header-noborder  " style="padding:5px;height:auto">
        <div id="operator-btn">
          <el-button type="primary" icon="el-icon-caret-right" @click="run()" plain="true">执行(F8)</el-button>
          <el-button type="primary" icon=" el-icon-close" @click="clearSQL()" plain="true">清空(F7)</el-button>
          <el-button type="primary" icon="el-icon-document" @click="saveSearchDialog()" plain="true">SQL保存</el-button>
            &nbsp;当前数据库：<span id="currentDbTitle">db_420</span>
        </div>
        <div style="width:100%;height:85%; ">
          <textarea ref="mycode" class="codesql" v-model="code" style="height:200px;width:600px;"></textarea>
        </div>

      </div>



      <div class="panel layout-panel layout-panel-center layout-split-center" style="height: 425px;">
        <el-tabs type="border-card"  style="padding: 5px; height: auto;">
          <el-tab-pane label="运行结果">运行结果</el-tab-pane>

        </el-tabs>
      </div>




      </div>


  </div>

</template>
<script>
  import "codemirror/theme/ambiance.css";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/hint/show-hint.css";
  import sqlFormatter from "sql-formatter";
  let CodeMirror = require("codemirror/lib/codemirror");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require("codemirror/mode/sql/sql");
  require("codemirror/addon/hint/show-hint");
  require("codemirror/addon/hint/sql-hint");
  export default {
    name: "codeMirror",
    data () {
      return {
        code: '//按Ctrl键进行代码提示'
      }
    },
    format(){
      /*获取文本编辑器内容*/
      let sqlContent="";
      sqlContent=this.editor.getValue();
      /*将sql内容进行格式后放入编辑器中*/
      this.editor.setValue(sqlFormatter.format(sqlContent));
    },
    mounted () {

      debugger
      let mime = 'text/x-mariadb'
      let theme = 'ambiance'//设置主题，不设置的会使用默认主题
      let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
        mode: mime,//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        theme: theme,
        autofocus: true,
        extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
        hintOptions: {//自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      })
      //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
      editor.on('cursorActivity', function () {
        editor.showHint()
      })
    }
  }
</script>

<style>
  .codesql {
    font-size: 11pt;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }
</style>
