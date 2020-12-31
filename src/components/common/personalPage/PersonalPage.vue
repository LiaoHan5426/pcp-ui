<template>
    <el-container>
      <el-header>
        <el-button  icon="el-icon-arrow-left" size="small" type="primary" @click="back">返回</el-button>
      </el-header>
    </el-container>
</template>

<script>
    export default {
        name: "PersonalPage",
      methods:{
        back() {
          this.$router.push('/')
        }
      }
    }
</script>

<style scoped>

</style>
