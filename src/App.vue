<template>
  <el-container>
    <el-header v-if="!isLogin">
      <myHeader />
    </el-header>
    <el-container>
      <el-aside v-if="!isLogin">
        <leftMenu />
      </el-aside>
      <el-main>
        <!-- Body -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import leftMenu from "./components/leftMenu";
  import myHeader from "./components/header";

  export default {
    name: "App",
    components: {
      leftMenu,
      myHeader
    },
    watch:{
      $route(to){
        this.isLogin = to.path.indexOf("login")!=-1
      }
    },
    data() {
      return {
        isLogin:false
      };
    }
  };
</script>
<style lang="scss" scoped>
  .el-container {
    height: 100vh;
    width: 100vw;
    padding: 0px;
    background-image: url("assets/bgi.jpg");
    background-size: 100%;

  }

  .el-main {
    text-align: center;
  }
</style>