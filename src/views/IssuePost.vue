<template>
    <v-container>
        <el-upload
                class="upload-demo"
                style="margin: 20px"
                drag
                ref="upload"
                action="/api/issue/post_file"
                multiple
                :file-list="fileList"
                :auto-upload="false"
                v-show="isFile">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-input
                style="margin: 20px"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                autosize
                v-model="textarea"
                v-show="!isFile">
        </el-input>
        <el-button style="margin: 20px" size="small" type="success" @click="changeType">切换上传方式</el-button>

        <el-button style="margin: 20px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "issuePost",
        data() {
            return {
                isFile:true,
                textarea: "",
                fileList: []
            };
        },
        methods: {
            changeType(){
                this.isFile = !this.isFile
            },
            submitUpload() {
                const app = this
                if(app.isFile) {
                    app.$refs.upload.submit();
                    this.$message.success("上传成功")
                }else{
                    axios.post('/api/issue/post_txt',{
                        issues:app.textarea
                    }).then(()=>{
                        this.$message.success("上传成功")
                        }
                    ).catch(error => {
                        this.$message.error('上传失败：Err = ' + error.response.data.message)
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
