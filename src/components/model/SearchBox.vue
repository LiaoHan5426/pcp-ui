<template>
  <div>
    <el-input
      v-model="search"
      @focus="focus"
      @blur="blur"
      @keyup.enter.native="searchHandler"
      placeholder="搜索关键词"
      clearable
    >
      <el-button slot="append" icon="el-icon-search" id="search"  @click="searchHandler"></el-button>
    </el-input >
    <!---设置z-index优先级,防止被走马灯效果遮挡-->
    <el-card
      @mouseenter="enterSearchBoxHandler"
      v-if="isSearch"
      class="box-card"
      id="search-box"
      style="position:relative;z-index:15"
    >
      <div>
        <dl v-if="isHistorySearch">
          <dt class="search-title" style="text-align: left" v-show="history">
            <span >历史搜索</span>
            <el-link type="info" :underline="false">
              <i class="el-icon-delete" style="padding-left: 10px" @click="removeAllHistory"></i>
            </el-link>
          </dt>
          <el-tag
            v-for="search in historySearchList"
            :key="search.id"
            closable
            :type="search.type"
            @close="closeHandler(search)"
            @click="catchTag(search)"
            style="margin-right:5px; margin-bottom:5px;"
          >{{search.name}}
          </el-tag>
          <dt class="search-title" style="text-align: left">热门搜索</dt>
          <dd class="search-title" v-for="search in hotSearchList" >{{search}}</dd>
        </dl>
        <dl v-if="isSearchList">
          <dd v-for="search in searchList" :key="search.id">{{search}}</dd>
        </dl>
      </div>
    </el-card>


  </div>
</template>

<script>
  import RandomUtil from '../../assets/js/util/randomUtil'
  import Store from '../../assets/js/util/store'

  export default {
    name: "SearchBox",
    data() {
      return {
        search: "", //当前输入框的值
        isFocus: false, //是否聚焦
        hotSearchList: ["暂无热门搜索"], //热门搜索数据
        historySearchList: [], //历史搜索数据
        searchList: ["暂无数据"], //搜索返回数据,
        history: false,
        types: ["", "success", "info", "warning", "danger"] //搜索历史tag式样
      };
    },
    methods: {
      focus() {
        this.getHotSearchList();
        this.isFocus = true;
        this.historySearchList = Store.loadHistory() == null ? [] : Store.loadHistory();
        this.history = this.historySearchList.length == 0 ? false : true;
      },
      blur() {
        const self = this;
        this.searchBoxTimeout = setTimeout(function () {
          self.isFocus = false;
        }, 300);
      },
      enterSearchBoxHandler() {
        clearTimeout(this.searchBoxTimeout);
      },
      searchHandler() {
        //随机生成搜索历史tag式样
        let n = RandomUtil.getRandomNumber(0, 5);
        let exist =
          this.historySearchList.filter(value => {
            return value.name == this.search;
          }).length == 0 ? false : true;
        if (!exist) {
          this.historySearchList.push({name: this.search, type: this.types[n]});
          Store.saveHistory(this.historySearchList);
        }
        this.history = this.historySearchList.length == 0 ? false : true;
        this.BaseHttp.get("/hotWord/add",{hotWord: this.search}).then(res => {
          console.log(res.data)
        })

        this.$emit("searched", this.search);
      },
      closeHandler(search) {
        this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
        Store.saveHistory(this.historySearchList);
        clearTimeout(this.searchBoxTimeout);
        if (this.historySearchList.length == 0) {
          this.history = false;
        }
      },
      catchTag(search){
       this.search +=search.name;
        this.$emit("searched", this.search);
      },
      removeAllHistory() {
        Store.removeAllHistory();
      },
      getHotSearchList() {
        const self = this;
        this.BaseHttp.get("/hotWord/get",{topN: 10}).then(res => {
          self.hotSearchList = res.data.hotSearchList
          console.log(self.hotSearchList)
        })
      }
    },
    computed: {
      isHistorySearch() {
        return this.isFocus && !this.search;
      },
      isSearchList() {
        return this.isFocus && this.search;
      },
      isSearch() {
        return this.isFocus;
      }
    }
  }
</script>

<style scoped>

  #search {
    background-color: #ffc300;
    border-radius: 0%;
  }
  .search-title {
    color: #bdbaba;
    font-size: 15px;
    margin-bottom: 5px;
  }

  #search-box {
    width: 370px;
    height: 300px;
    margin-top: 0px;
    padding-bottom: 20px;
  }
</style>
