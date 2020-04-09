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
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="11" >个人中心</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="12" >修改密码</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="21">商品分类</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="22">商品管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>订单管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="31">订单管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>会员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="41">会员管理</el-menu-item>
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
        }
    };
</script>

<style scoped>
</style>