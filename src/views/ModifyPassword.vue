<template>
    <div class="modify_pw">
        <div class="modifyBox">
            <h1 align="center">Issue Analysis</h1>
            <el-form
                    ref="modifyForm"
                    label-width="20px"
                    :model="modifyForm"
            >
                <el-form-item
                        label=""
                        prop="ex_pw"
                        style="margin-top:50px;"
                >
                    <el-row>
                        <el-col :span='2'>
                            <span style= "font-size:20px;" class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='原密码'
                                    show-password
                                    v-model="modifyForm.ex_pw"
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
                            <span style= "font-size:20px;" class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span='17'>
                            <el-input
                                    class="inps"
                                    placeholder='新密码'
                                    show-password
                                    v-model="modifyForm.password"
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
                            @click="handleModify"
                    >确认</el-button>
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
        name: 'modify_pw',
        data () {
            return {
                modifyForm:{
                    username: sessionStorage.getItem('username'),
                    ex_pw:'',
                    password:'',
                },
                confPassword:''
            }
        },
        methods:{
            handleModify(){
                if(this.modifyForm.password != this.confPassword){
                    this.$message.error("请确认两次输入密码一致")
                }
                else if(this.modifyForm.ex_pw != sessionStorage.getItem('password')){
                    this.$message.error("请确认原密码输入正确")
                }
                else if(this.signupForm.password.length < 6 || this.signupForm.password.length > 12){
                    this.$message.error("请确认新密码符合长度")
                }
                else {
//                axios.post('/api/user/modify_password',this.modifyForm)
//                    .then(res=>{
//                    if(res.data){
//                        this.$message.success("修改成功")
//                        this.$router.push('/')
//                    }
//                    else{
//                        this.$message.error("修改失败")
//                    }
//                })
                }
            },
            handleReturn(){
                this.$router.push('/')
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