<template>
    <div class="firstdemo" style="background:url(../assets/1c.png)">
        <el-form ref="form" :model="form" label-width="100px">
            <br><br><br><br><br><br><br><br>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <el-form-item>
                        <v-img
                                contain
                                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3808335119,2126377622&fm=26&gp=0.jpg"
                                height="300"
                                max-height="300"
                                max-width="500"
                                width="500"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="账户：" prop="name">
                        <el-input v-model="form.name" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="form.password" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <br>
            <el-row type="flex" justify="center">
                <el-col :span="1">
                    <el-form-item>
                        <el-button type="primary" @click="submit">登录</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item>
                        <el-button @click="register">注册</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>-->
    </div>
</template>


<!--数据存贮交互，事件控制地区-->
<script>
    export default {
        name: 'firstdemo',
        data () {
            return {
                form:{
                    name:'',
                    password:'',
                },

            }
        },
        methods:{
            /*提交进行判断的函数 */
            submit:function(){
                if(this.form.name==="张三"&&this.form.password==="123456")
                    alert("登录成功")
                else
                    alert("账号或密码错误")
            },
            register:function(){},
        },
    }
</script>

<!-- 写样式的地方 -->
<style scoped>
    .firstdemo{
        background-image: url(https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3225229108,1886865633&fm=26&gp=0.jpg);
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%
    }
</style>