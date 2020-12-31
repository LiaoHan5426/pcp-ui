<template>
  <div id="box">
    <div class="box" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" v-loading.lock="loading">
      <ul class="list">
        <li v-for="(data,index) in list" class="list-item" :key="index">
          <slot :data="data,index">
          </slot>
        </li>
        <li v-if="noMore">
          <p  style="margin-top:10px;font-size:13px;color:#ccc;text-align: center">没有更多了</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: "InfiniteScroll",
    props: {
      url: String,
      keyWord: String,
    },
    data() {
      return {
        searchUrl: '',
        loading: false,
        pageInfo: {
          pageNum: 0,//起始页数值为1
          pageSize: 10,
          hasNextPage: true
        },
        list: [] //后端返回的数组
      }
    },
    computed: {
      noMore() {
        //当起始页数大于总页数时停止加载
        return !this.pageInfo.hasNextPage;
      },
      disabled() {
        return this.loading || this.noMore;
      }
    },
    created() {
      this.getMessage();
    },
    methods: {
      load() {
        //滑到底部时进行加载
        this.loading = true;
        const self = this;
        setTimeout(() => {
          if (!self.disabled) {
            self.getMessage(); //调用接口，此时页数+1，查询下一页数据
          }
        }, 2000);
      },
      getMessage() {
        let param = {
          keyWord: this.keyWord ? this.keyWord : '',
          pageNum: this.pageInfo.pageNum + 1,
          pageSize: this.pageInfo.pageSize
        }
        const self = this;
        this.BaseHttp.get(this.searchUrl, param).then(res => {
          const {pageInfo} = res.data;
          if (pageInfo !=undefined) {
            self.pageInfo = pageInfo;
            this.list = this.list.concat(self.pageInfo.list); //因为每次后端返回的都是数组，所以这边把数组拼接到一起
          }
          this.loading = false;
        })
          .catch(err => {
            console.log(err);
          });
      }
    },
    watch: {
      url: {
        handler: function (val, oldVal) {
          this.searchUrl = val;
          this.list = []
          this.pageInfo = {
            pageNum: 0,
            pageSize: 10
          }
          this.load()
        },
        immediate: true
      },
      keyWord: {
        handler: function (val, oldVal) {
          this.list = []
          this.pageInfo = {
            pageNum: 0,
            pageSize: 10
          }
          this.load()
        },
        immediate: true
      }
    }
  }
</script>

<style scoped>
  #box {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }

  .box {
    width: 100%;
    margin: 0 auto;
  }

  .list {
    padding: 0;
    font-size: 14px;
  }

  .list-item {
    width: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    list-style: none;
    padding: 0 1rem;
    box-sizing: border-box;
    mix-height: 150px;
    /*line-height: 70px;*/
    border-bottom: 1px solid #e7e7e7;
    cursor: pointer;
  }

  .loading span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #409eff;
    border-left: transparent;
    animation: zhuan 0.5s linear infinite;
    border-radius: 50%;
  }

  @keyframes zhuan {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
