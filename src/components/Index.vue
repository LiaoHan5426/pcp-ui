<template>
  <div>
    <el-container direction="vertical">
      <el-header style="position: relative;height: 70px;width: 100%;top:0;border-bottom: 1px solid #dddddd;">
          <el-row>
            <el-col :xs="4" :sm="5" :md="4" :lg="6" :xl="6" :span="5" :offset="18">
              <div>
                <login/>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="4" :sm="5" :md="4" :lg="6" :xl="6" :span="5" :offset="9">
              <div>
                <search-box @searched="searched"/>
              </div>
            </el-col>
          </el-row>
      </el-header>
        <el-container direction="horizontal" style="margin-top: 80px">
          <el-aside style="display: block;position: absolute;left: 0;top: 80px;bottom: 0">
            <el-menu :default-openeds="['1']"  @close="menuClose">
              <el-submenu index="1">
                <template slot="title" disabled><i class="el-icon-message"></i>导航一</template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main style="position: absolute;left: 300px;right: 0;top:79px;bottom: 0;overflow-y: auto;height: 500px;margin: 0">
            <infinite-scroll ref="ifScroll" style="width: 100%;height: 100%" :url="InfiniteScrollUrl" :key-word="keyWord">
              <template slot-scope="{data,index}">
                <a href="#" >
                  <div>
                    <h2>{{data.title}}</h2>
                    <p>{{data.context}}</p>
                    <div>
                      <span>作者：{{data.author}}</span>
                      <span>发布时间：{{moment(data.createTime).format("YYYY-MM-DD")}}</span>
                    </div>
                  </div>
                </a>
              </template>
            </infinite-scroll>
          </el-main>
        </el-container>
    </el-container>


  </div>
</template>

<script>
  import SearchBox from "./model/SearchBox";
  import InfiniteScroll from "./model/InfiniteScroll";
  import moment from 'moment'
  import Login from "./assembly/login/Login";

  export default {
    name: "Index",
    components: {Login, InfiniteScroll, SearchBox},
    data(){
      return{
        InfiniteScrollUrl: '/common/InfiniteScroll',
        keyWord: ''
      }
    },
    activated() {
      //由于缓存了本页面，每次激活页面都要判断是否重置相关参数，并重新加载数据
      // if (this.id !== this.$route.params.id) {
      //   this.id = this.$route.params.id //更新分类id
      //   this.curpage = 1 //初始化页面为1
      //   this.product = [] //清空上次不同分类的产品数据
      //   this.getProduct('/api/productList.php', this.id, this.curpage).then((res) => {
      //     this.ptotal = res.total
      //     res.products.forEach((item) => {
      //       this.product.push(item)
      //     })
      //     this.loading = false
      //   })
      // }
    },
    methods: {
      moment,
      searched(search) {
        if (search == undefined || search == '') {
          this.InfiniteScrollUrl = "/common/InfiniteScroll";
        } else {
          this.InfiniteScrollUrl = "/search/byKeyWord";
          if (this.keyWord == search) {
            this.$refs.ifScroll.load();
          } else {
            this.keyWord = search;
          }
        }
      },
      menuClose(index){
        console.log(index)
        if (index == 1) {
          return false
        }
      }
    }
  }
</script>

<style scoped>

</style>
