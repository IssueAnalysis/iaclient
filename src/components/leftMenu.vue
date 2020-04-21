<template>
    <div>
        <el-menu
                :default-active="this.$route.path.split('/')[1]"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                backgroundColor="#545c64"
                textColor="white"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span style="margin-left: 10px">用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="user_center" @click="routeTo('/issue_detail')">我的收藏</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="pass_manage" @click="routeTo('/modify_password')">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span style="margin-left: 10px">Issue管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="issue_check" @click="routeTo('/issue_check')">Issue查看</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="issue_post" @click="routeTo('/issue_post')">Issue导入</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            routeTo(path){
                this.$router.push(path);
            },
            handleOpen() {
            },
            handleClose() {
            },
        }
    };
</script>

<style scoped>

</style>