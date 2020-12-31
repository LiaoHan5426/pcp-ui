<template>
    <span>
       <el-dropdown @command="commandHandler">
        <a href="javascript:void (0)" @click="!isLogined ? loginHandler() : (0)">
          <i v-if="!isLogined" class="el-icon-user"/>
          <span v-if="isLogined">user</span>
          <i v-if="isLogined" class="el-icon-arrow-down el-icon--right"></i>
        </a>
        <el-dropdown-menu slot="dropdown" v-if="isLogined">
          <el-dropdown-item icon="el-icon-monitor" command="PersonalPage">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
          <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
      <el-dialog title="登录" :visible.sync="dialogFormVisible" :before-close="cancel" width="400px">
        <el-form :model="loginForm" ref="loginForm">
          <el-form-item :label-width="formLabelWidth" prop="username" size="medium ">
              <i class="el-icon-user" slot="label"/>
              <el-input v-model="loginForm.username" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="password">
            <i class="el-icon-key" slot="label"/>
            <el-input v-model="loginForm.password" autocomplete="off" style="width: 200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>
    </span>
</template>

<script>
  import Store from '../../../assets/js/util/store'

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        formLabelWidth: '80px',
        dialogFormVisible: false,
        isLogined: false
      };
    },
    mounted: function () {
      let token = localStorage.getItem("token");
      if (token) {
        this.isLogined = true;
      }
    },
    methods: {
      loginHandler() {
        this.dialogFormVisible = true
      },
      cancel() {
        this.dialogFormVisible = false
      },
      submit() {
        this.BaseHttp.login("/oauth/login", this.loginForm).then(res => {
          console.log(res)
          let {access_token} = res.data;
          Store.saveToken(access_token);
        })
        this.$refs.loginForm.resetFields();
        this.cancel()
      },
      commandHandler(command) {
        this.$router.push({name: command})
      }
    }
  }
</script>

<style scoped>

</style>
