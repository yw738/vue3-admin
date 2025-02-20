/**
 * erp 的页面混淆模板
 * eg：
 * import publicMixin from '@/components/publicModule/publicMixin.js'
 * mixins: [publicMixin],
 */
// import {
//     ElLoading
// } from 'element-plus'
export default {
  data() {
    return {
      tableHeight: 500, //表格高度，动态计算
      // loadingInstance: null
      tableData: []
    };
  },
  methods: {
    /*查询*/
    check() {
      this.searchData.current = 1;
      if (this.getList) this.getList();
    },

    /**
     * 初始化 请求列表
     */
    async getList() {
      let res = null;
      if (!this.api) {
        return new Error('PageLayout 组件必须传入api接口!!!');
      }

      this.tableData = [
        {
          a: '111',
          switch: true
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];
      this.pagination.total = this.tableData.length || 0;
      return;

      try {
        let params = {};
        if (this.searchData) {
          params = JSON.parse(JSON.stringify(this.searchData));
          // null做处理
          for (let [label, value] of Object.entries(params)) {
            if (value == null) {
              params[label] = '';
            }
          }

          params.current = this.pagination.pageIndex;
          params.size = this.pagination.pageSize;
        }
        if (this.requestFormmter) {
          params = this.requestFormmter(params);
        }
        //检测是否有默认的附带参数
        if (this.requestData) {
          params = {
            ...params,
            ...this.requestData
          };
        }
        // res = await salesApi[this.apiType].getList(params); //请求列表
        res = await this.api(params); //请求列表
        if (res.code == 1) {
          let dataArr = [];
          // formmater 判断有没有处理数据的函数
          // 这样就可以自定义 处理数据的方法
          if (this.formmater) {
            dataArr = this.formmater(res.data.records) || [];
          } else {
            dataArr = res.data.records || [];
          }
          this.tableData = dataArr;
          this.pagination.total = res.data.total || 0;
          if (this.getListCb) this.getListCb(); //判断是否有回调
        }
        // this.loadingInstance.close()
      } catch (err) {
        console.log(err);
        this.tableData = [];
        this.tableData = [{}];
        // this.loadingInstance.close()
      }
    },
    /**
     * 重置按钮
     */
    resetFormInline() {
      /* 查看是否有自定义的重置功能，有的话，调用自定义的重置 */
      if (this.parentResetFn) {
        this.parentResetFn();
      } else {
        let params = JSON.parse(JSON.stringify(this.searchData));
        for (let label of Object.keys(params)) {
          if (label == 'pageSize' || label == 'pageIndex') {
            Object.assign(this.searchData, {
              pageSize: 10,
              pageIndex: 1
            });
          } else {
            //不清除指定的id
            let ids = [];
            if (!ids.includes(label)) {
              Object.assign(this.searchData, {
                [label]: null
              });
            }
          }
        }
      }
      // 重置完，请求一次列表
      if (this.getList) this.getList();
    },
    /*切换页*/
    handleCurrentChange(val) {
      this.searchData.pageIndex = val;
      if (this.getList) this.getList();
    },
    /*修改条数*/
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      if (this.getList) this.getList();
    },
    // 第一次获取table高度
    getTableHeight() {
      let navbar = 84,
        margin = 60,
        padding = 40;
      let searchForm = document.querySelector('#searchForm');
      let fullHeight =
        document.documentElement.clientHeight - navbar - margin - padding; //布局高度
      let searchH = searchForm && searchForm.clientHeight;
      if (this.tableBtnIsTopRight) {
        this.tableHeight = fullHeight - searchH - this.addedHeight + 50;
      } else {
        this.tableHeight = fullHeight - searchH - this.addedHeight;
      }
    },
    //动态获取浏览器高度
    getBodyHeight() {
      setTimeout(() => {
        window.onresize = () => this.getTableHeight;
      }, 300);
    }
  },
  mounted() {
    this.getTableHeight();
    this.getBodyHeight();
    if (this.getList) this.getList();
  }
};
