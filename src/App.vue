<template>
  <el-container>
    <el-header v-if="$route.path!='/login'&&$route.path!='/signup'&&$route.path!='/modify_password'">
      <myHeader />
    </el-header>
    <el-container>
      <el-aside v-if="$route.path!='/login'&&$route.path!='/signup'&&$route.path!='/modify_password'">
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
    background-image: url("assets/bgi.jpg");
    background-size: 100%;
  }
  .el-aside{
    width: 30px;
  }

  .el-main {
    text-align: center;
  }
  .el-aside {
    background-color: #545c64;
    opacity: 0.75;
  }
  .el-header {
    text-align: left;
    background-color: #545c64;
    opacity: 0.75;
  }
</style>

<style>
  .el-submenu__title {
    font-size: 20px;
    font-weight: 800;
  }
</style>