<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-favor"></i> 剩余空间信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
       <div>搜索数据库
         <el-autocomplete
         v-model="state4"
         :fetch-suggestions="querySearchAsync"
         placeholder="搜索数据库"
         @select="handleSelect"
         ></el-autocomplete>
         <button  v-bind:title="mag1" class="btn" v-on:click="show">刷新</button>
       </div>
      <el-main>
        <div class="schart-box">
          <div class="content-title">磁盘占用</div>
          <schart class="schart" canvasId="pie" :data="biao" type="pie" :options="options3"></schart>
        </div>
        <div class="schart-box">
          <div class="content-title">内存占用</div>
          <schart class="schart" canvasId="ring" :data="data22" type="ring" :options="options4"></schart>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort = "{prop: 'shuju', order: 'descending'}"
        >
          <el-table-column
            prop="Biaoname"
            label="表名"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="hang"
            label="行长(byte)"
            sortable
            width="180">
          </el-table-column>
          <el-table-column
            prop="shuju"
            label="数据"
            sortable
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="all"
            label="全部"
            sortable
            :formatter="formatter">
          </el-table-column>
          <el-table-column
            prop="role"
            label="排序规则"
            :formatter="formatter">
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
  import Schart from 'vue-schart';
  export default {

    name: 'basecharts',
    components: {
      Schart
    },

    data() {
      return {
        biao:[
          {name:'已使用',value:12.00},

          {name:'未使用',value:20.00}
        ],
        restaurants: [],
        state4: '',
        timeout:  null,
        intervalId:null,
        tableData: [
          {
            Biaoname:'tb_420',
            hang:'2340',
            shuju:'16KB',
            all:'16KB',
            role:'utf8_general_ci'


          }, {
            Biaoname:'db413',
            hang:'2048',
            shuju:'16KB',
            all:'48KB',
            role:'utf8_general_ci'


          },
        ],

        data22 : [
          {name:'已使用',value:25.00},

          {name:'未使用',value:30.00}
        ],

        options3: {
          title: '',
          bgColor: '#fff',
          titleColor: '#829dca',
          legendColor: '#829dca',
          radius: 80
        },
        options4: {
          title: '',
          bgColor: '#ffff',
          titleColor: '#829dca',
          legendColor: '#829dca',
          radius: 100,
          innerRadius:80
        }
      }

      },

    methods: {
    /*  getAjax(){

        this.$axios.get('https://www.easy-mock.com/mock/5c1a15d0e29fc768e8a53869/example/api/eMock/getspace1'
        )
          .then(response =>{
              console.log("ok");
              console.log("datasapce:");
              console.log(" datasapce:");
              console.log(response.data.data[0].name);
              for(var i=0;i<response.data.data.length;i++){
                this.biao[i].name=response.data.data[i].name;
                this.biao[i].value=response.data.data[i].value
                console.log(response.data.data[i].value);

              }

              this.biao=response.data.data
            console.log("this.biao");
            console.log(this.biao);




            }
          )
          .catch(function (error) {

            console.log(error);
          });
      },*/
      loadAll() {
        return [
          { "value": "db_test", "server": "127.0.0.1:3306" },
          { "value": "db_abc", "server": "127.0.0.1:3306" },
          { "value": "db_test2", "server": "127.0.0.1:3306" },
          { "value": "db_test3", "server": "127.0.0.1:3306" },
          { "value": "db_test4", "server": "127.0.0.1:3306" },

        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    created(){
      this.getAjax()
    },
    mounted() {
      this.restaurants = this.loadAll();

    }
  }
</script>

<style scoped>
  .schart-box{
    display: inline-block;
    margin: 20px;
  }
  .schart{
    width: 500px;
    height: 400px;
  }
  .content-title{
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }

</style>
