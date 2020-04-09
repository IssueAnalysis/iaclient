<template>
    <div>
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
    </div>
</template>

<script>
    export default {
        methods:{

        }
    }
</script>

<style lang="scss">
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
</style>