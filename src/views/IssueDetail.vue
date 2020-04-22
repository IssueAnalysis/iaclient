<template>
    <div class="issue_detail">
        <div class="detailBox">
            <el-form
                    :label-position="labelPosition"
                    ref="detailForm"
                    label-width="100px"
                    :model="detailForm"
            >
                <el-form-item
                        label="ID"
                        style="margin-top:100px;margin-left:100px;"
                        class="formItem"
                >
                    <el-row>
                        <el-col :span="3">
                            <el-input
                                    type="textarea"
                                    class="inps"
                                    v-model="detailForm.issue_id"
                                    readonly
                                    autosize
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label="概括"
                        style="margin-top:50px;margin-left:100px;margin-right:100px;"
                        class="formItem"
                >
                    <el-row>
                        <el-col>
                            <el-input
                                    type="textarea"
                                    class="inps"
                                    v-model="detailForm.summary"
                                    readonly
                                    autosize
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label="详细描述"
                        style="margin-top:50px;margin-left:100px;margin-right:100px;"
                        class="formItem"
                >
                    <el-row>
                        <el-col>
                            <el-input
                                    type="textarea"
                                    class="inps"
                                    v-model="detailForm.description"
                                    readonly
                                    autosize
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label="关注点"
                        style="margin-top:50px;margin-left:100px;margin-right:100px;"
                        class="formItem"
                >
                    <el-row>
                        <el-col>
                            <el-input
                                    type="textarea"
                                    class="inps"
                                    v-model="detailForm.intention"
                                    readonly
                                    autosize
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item
                        label="考虑"
                        style="margin-top:50px;margin-left:100px;margin-right:100px;"
                        class="formItem"
                >
                    <el-row>
                        <el-col>
                            <el-input
                                    type="textarea"
                                    class="inps"
                                    v-model="detailForm.consideration"
                                    readonly
                                    autosize
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!--<el-form-item style="margin-top:100px;">-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--round-->
                            <!--class="submit"-->
                            <!--@click="handleModify"-->
                    <!--&gt;确认</el-button>-->
                    <!--<el-button-->
                            <!--type="primary"-->
                            <!--round-->
                            <!--class="submit"-->
                            <!--@click="handleReturn"-->
                    <!--&gt;返回</el-button>-->
                <!--</el-form-item>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'issue_detail',
        data () {
            return {
                labelPosition: 'left',
                detailForm:{
                    issue_id: '',
                    summary:'',
                    description:'',
                    intention:'',
                    consideration:''
                },
                confPassword:''
            }
        },
        created() {
            this.initialize()
        },
        methods:{
            initialize(){
//                const app = this
//                app.detailForm.issue_id = this.$route.query.issue_id
            },
            handleModify(){

            },
            handleReturn(){

            }
        },
    }
</script>

<style lang='less' scoped>
    .issue_detail {
        height: 90vh;
        position: relative;
        .detailBox {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin-right:20px;
            box-shadow: 10px 15px 15px rgba(6, 17, 47, 0.7);
            opacity: 1;
            background-color:white;

            .submit {
                background-color: transparent;
                color: #39f;
                width: 160px;
                height: 50px;
            }
        }
    }
</style>

<style>
    .formItem .el-form-item__label{
        font-size: 20px;
    }
</style>