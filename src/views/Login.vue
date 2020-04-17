<template>
    <div class="login">
        <div class="loginBox">
            <h1 align="center">Issue Analysis</h1>
        <el-form
            ref="loginForm"
            label-width="20px"
            :model="loginForm"
        >
            <el-form-item
                label=""
                prop="username"
                style="margin-top:60px;"
            >
                <el-row>
                    <el-col :span='2'>
                        <span style= "font-size:20px;" class="el-icon-user"></span>
                    </el-col>
                    <el-col :span='22'>
                        <el-input
                            class="inps"
                            placeholder='用户名'
                            v-model="loginForm.username"
                            oninput="this.value=this.value.replace(/[^\w_]/g,'');"
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item
                label=""
                prop="password"
            >
                <el-row
                    style="margin-top:40px;"
                >
                    <el-col :span='2'>
                        <span style= "font-size:20px;" class="el-icon-lock"></span>
                    </el-col>
                    <el-col :span='22'>
                        <el-input
                            class="inps"
                            placeholder='密码'
                            show-password
                            v-model="loginForm.password"
                            oninput="this.value=this.value.replace(/[^\w_]/g,'');"
                        ></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item style="margin-top:80px;">
                <el-button
                    type="primary"
                    round
                    class="submit"
                    @click="handleLogin"
                >登录</el-button>
                <el-button
                        type="primary"
                        round
                        class="submit"
                        @click="handleSignup"
                >注册</el-button>
            </el-form-item>
        </el-form>
        </div>
    </div>
</template>


<script>
//    import axios from 'axios'
    export default {
        name: 'login',
        data () {
            return {
                loginForm:{
                    username:'',
                    password:'',
                },
            }
        },
        methods:{
            handleLogin(){
//                axios.post('/api/user/log_in',this.loginForm)
//                    .then(res=>{
//                    if(res.data){
//                        sessionStorage.setItem('accessToken',true)
//                        sessionStorage.setItem('username',this.username)
//                        sessionStorage.setItem('password',this.password)
//                        this.$router.push('/')
//                    }
//                    else{
//                        this.$message.error("账号或密码错误")
//                    }
//                })
                if(this.loginForm.username=='admin'&&this.loginForm.password=='123456'){
                    sessionStorage.setItem('accessToken',true)
                    sessionStorage.setItem('username',this.username)
                    this.$router.push('/')
                }
                else{
                    this.$message.error('Invalid username or password')
                }
            },
            handleSignup(){
                this.$router.push('/signup')
            },
        },
    }
</script>

<style lang='less' scoped>
    .login {
        width: 100vw;
        padding: 0;
        margin: 0;
        height: 100vh;
        background-position: left top;
        color: #fff;
        background-size: 100%;
        background-image: url("../assets/bgi.jpg");
        position: relative;
        .loginBox {
            width: 460px;
            height: 580px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            padding: 100px 50px 40px 40px;
            box-shadow: 10px 15px 15px rgba(6, 17, 47, 0.7);
            opacity: 1;
            background: linear-gradient(
                230deg,
                rgba(53, 57, 74, 0) 0%,
                rgb(0, 0, 0) 100%
            );
            /deep/ .inps input {
                border: none;
                color: #fff;
                background-color: transparent;
                font-size: 22px;
            }
            .submit {
                background-color: transparent;
                color: #39f;
                width: 160px;
                height: 50px;
            }
        }
    }
</style>