<template>
    <div>
        <el-row>
            <el-col span="1.5">
                <img src="../assets/logo.png" style="margin: 10px;width:50px;height:50px"/>
            </el-col>
            <el-col span="12">
                <h1 style="color:yellow;margin-top: 16px">IssueAnalysis</h1>
            </el-col>
            <el-col class="logout" span="10">
                <template>
                    <div class="navOperater">
                        <el-button
                                type="text"
                                class="submit"
                                @click="handleLogout"
                        >退出登录</el-button>
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
    </div>
</template>

<script>
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {ElButton},
        methods:{
            handleLogout() {
                sessionStorage.clear()
                this.$router.push('/login')
                console.log(sessionStorage.getItem('accessToken'))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .logout {
        text-align: right;
        .navOperater {
            width: 80px;
            height: 80px;
            float: right;
            line-height: 45px;
            margin-top:8px;
        }
        .submit{
            color: white;
            margin-right:6px;
        }
    }
</style>
