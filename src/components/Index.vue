<template>
  <div>
    <el-container direction="vertical">
      <el-header>
        <el-row :gutter="10">
          <el-col :xs="4" :sm="5" :md="4" :lg="6" :xl="6" :span="5" :offset="9">
            <div>
              <search-box @searched="searched"/>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="border-top: 1px solid #dddddd">
        <el-container direction="horizontal">
          <el-aside >
            <el-menu :default-openeds="['1']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>导航一</template>
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
          <el-main >
            <infinite-scroll ref="ifScroll" style="width: calc(100% - 450px);height: calc(100% - 200px)" :url="InfiniteScrollUrl" :key-word="keyWord">
              <template slot-scope="{data,index}">
                <a href="#" >
<!--                  <h2>{{data}}</h2>-->
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
      </el-main>
      <el-footer>
            footer
      </el-footer>
    </el-container>


  </div>
</template>

<script>
  import SearchBox from "./model/SearchBox";
  import InfiniteScroll from "./model/InfiniteScroll";
  import moment from 'moment'

  export default {
    name: "Index",
    components: {InfiniteScroll, SearchBox},
    data(){
      return{
        InfiniteScrollUrl: '/common/InfiniteScroll',
        keyWord: ''
      }
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


      }
    }
  }
</script>

<style scoped>

</style>
