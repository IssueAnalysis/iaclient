<template>
  <div>
  <el-container class="container">
    <el-header>
      <el-row>
        <el-col :span="12">
          <h1 style="margin-top: 10px">IssueAnalysis</h1>
        </el-col>
        <el-col class="logout" :span="12">
          <template>
            <div class="navOperater">
              <router-link :to="{ path: '/login' }">退出</router-link>
            </div>
            <div class="navOperater">
              <el-avatar
                      class="avatar"
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </div>
          </template>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside>
        <leftMenu />
      </el-aside>
      <el-main>
        <template>

        </template>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
    import leftMenu from "../components/leftMenu.vue";

    export default {
        name: "home",
        components: {
            leftMenu
        },
        data() {
            return {
            };
        }
    };
</script>
<style lang="scss" scoped>
  .container {
    height: 100vh;
    width: 100vw;
    padding: 0px;
    background-image: url("../assets/bgi.jpg");
    background-size: 100%;

  }
  .el-header {
    text-align: left;
    background-color: #545c64;
    opacity: 0.75;
    .logout {
      text-align: right;
      .navOperater {
        width: 80px;
        height: 80px;
        float: right;
        line-height: 45px;
        margin-top:8px;
      }
      a{
        color: white;
      }
    }
  }
  .el-main {
    text-align: center;
  }
  .el-aside {
    display: block;
    position: relative;
    background-color: #545c64;
    opacity: 0.75;
  }
</style>