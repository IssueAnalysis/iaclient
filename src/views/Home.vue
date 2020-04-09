<template>
  <el-container>
    <el-header>
      <myHeader />
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
</template>

<script>
    import leftMenu from "../components/leftMenu.vue";
    import myHeader from "../components/header.vue";

    export default {
        name: "home",
        components: {
            leftMenu,
            myHeader
        },
        data() {
            return {
            };
        }
    };
</script>
<style lang="scss" scoped>
  .el-container {
    height: 100vh;
    width: 100vw;
    padding: 0px;
    background-image: url("../assets/bgi.jpg");
    background-size: 100%;

  }

  .el-main {
    text-align: center;
  }
</style>