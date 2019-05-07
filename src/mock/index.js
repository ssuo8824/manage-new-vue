//调用模拟数据方法
/*Mock.mock('#/test', (req, res) => {
  return {
    data: ['a','b']
  }
})*/
const Mock = require('mockjs');
const data = Mock.mock({
  items: [
    {
      icon:'el-icon-lx-home',
      index: 'dashboard',
      title: '系统首页',
      subs: [
        {
          index: 'test1',
          title: '二级菜单'
        },
        {
          index: '3-2',
          title: '二级菜单包含三级',
          subs: [
            {
              index: 'test31',
              title: '3级1有四',
              subs:[
                {
                  index: 'test4',
                  title: '四级菜单'
                },
              ]
            },
            {
              index: 'test32',
              title: '3级2'
            },

          ]
        }
      ]
    },
    {
      icon: 'el-icon-lx-cascades',
      index: 'table',
      title: '基础表格'
    },

  ]
});
Mock.mock('#/test', data);
