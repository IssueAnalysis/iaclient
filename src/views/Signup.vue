<template>
    <div class="signup">
        <div class="signupBox">
            <h1 align="center">Issue Analysis</h1>
            <el-form
                    ref="signupForm"
                    label-width="20px"
                    :model="signupForm"
            >
                <el-form-item
                        label=""
                        prop="username"
                        style="margin-top:50px;"
                >
                    <el-row>
                        <el-col :span='2'>
                            <span style= "font-size:20px;" class="el-icon-user"></span>
                        </el-col>
                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='用户名'
                                    v-model="signupForm.username"
                                    oninput="this.value=this.value.replace(/[^\w_]/g,'');"
                            ></el-input>
                        </el-col>
                        <el-col :span='5'>
                            <span style= "color:black">4-12字符</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label=""
                        prop="password"
                >
                    <el-row
                            style="margin-top:20px;"
                    >
                        <el-col :span='2'>
                            <span style= "font-size:20px;" class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='密码'
                                    show-password
                                    v-model="signupForm.password"
                                    oninput="this.value=this.value.replace(/[^\w_]/g,'');"
                            ></el-input>
                        </el-col>
                        <el-col :span='5'>
                            <span style= "color:black">6-12字符</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label=""
                        prop="password"
                >
                    <el-row
                            style="margin-top:20px;"
                    >
                        <el-col :span='2'>
                            <span style= "font-size:20px;" class="el-icon-connection"></span>
                        </el-col>
                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='确认密码'
                                    show-password
                                    v-model="confPassword"
                                    oninput="this.value=this.value.replace(/[^\w_]/g,'');"
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="margin-top:50px;">
                    <el-button
                            type="primary"
                            round
                            class="submit"
                            @click="handleSignup"
                    >注册</el-button>
                    <el-button
                            type="primary"
                            round
                            class="submit"
                            @click="handleReturn"
                    >返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>


<script>
    //    import axios from 'axios'
    export default {
        name: 'Signup',
        data () {
            return {
                signupForm:{
                    username:'',
                    password:'',
                },
                confPassword:''
            }
        },
        methods:{
            handleSignup(){
                if(this.signupForm.password != this.confPassword){
                    this.$message.error("请确认两次输入密码一致")
                }
                else if(this.signupForm.username.length < 4 || this.signupForm.username.length > 12){
                    this.$message.error("请确认用户名符合长度")
                }
                else if(this.signupForm.password.length < 6 || this.signupForm.password.length > 12){
                    this.$message.error("请确认密码符合长度")
                }
                else {
//                axios.post('/api/user/sign_up',this.signupForm)
//                    .then(res=>{
//                    if(res){
//                        this.$message.success("注册成功")
//                        this.$router.push('/login')
//                    }
//                    else{
//                        this.$message.error("该用户名已被注册")
//                    }
//                })
                }
            },
            handleReturn(){
                this.$router.push('/login')
            }
        },
    }
</script>

<style lang='less' scoped>
    .signup {
        width: 100vw;
        padding: 0;
        margin: 0;
        height: 100vh;
        background-position: left top;
        color: #fff;
        background-size: 100%;
        background-image: url("../assets/bgi.jpg");
        position: relative;
        .signupBox {
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