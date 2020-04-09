<template>
    <div>
        <el-menu
                default-active="1"
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
                    <el-menu-item index="11" @click="userCenter">个人中心</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="12" @click="modifyPw">修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span style="margin-left: 10px">Issue管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="21" @click="viewIssue">Issue查看</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="22" @click="importIssue">Issue导入</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleOpen() {
            },
            handleClose() {
            },
            userCenter(){
//                this.$router.push('/')
            },
            modifyPw(){
            },
            viewIssue(){
            },
            importIssue(){
            }
        }
    };
</script>

<style>
    .el-aside {
        display: block;
        position: relative;
        background-color: #545c64;
        opacity: 0.75;
    }
    .el-submenu__title {
        font-size: 20px;
        font-weight: 800;
    }
</style>