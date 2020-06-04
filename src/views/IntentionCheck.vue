<template>
    <div>
        <el-table
                :data="tableData"
                :span-method="objectSpanMethod"
                border
                style="width: 100%; margin-top: 20px">
            <el-table-column
                    prop="description"
                    label="Intention">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="Type">
            </el-table-column>
            <el-table-column
                    prop="keyword"
                    label="Keyword">
            </el-table-column>
            <el-table-column
                    align="center">
                <template slot="header">
                    <el-button
                            size="mini"
                            @click="addIntention()">Add Intention</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="addKeyword(scope.row)">Add Keyword</el-button>
                </template>

            </el-table-column>

        </el-table>

        <el-dialog title="Add Intention" :visible.sync="addIntentionVisible">
            <el-form :model="form">
                <el-form-item label="Desc" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Keyword Desc" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addIntentionVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntentionVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Add Keyword" :visible.sync="addKeywordVisible">
            <el-form :model="form">
                <el-form-item label="Desc" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addIntentionVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntentionVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // import hljs from 'highlight.js'
    import axios from 'axios'
    export default {
        name: "IntentionCheck",
        data () {
            return {
                addIntentionVisible:false,
                addKeywordVisible:false,
                issueUpdatedID:-1,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px',
                tableData: [],
                init:false,
                focusInfoList:[{
                    id:0,
                    description:"desc",
                    type:"type",
                    keywordList:[{
                        description:"keywordDesc1"
                    },{
                        description:"keywordDesc2"
                    },]
                },{
                    id:1,
                    description:"desc",
                    type:"type",
                    keywordList:[{
                        description:"keywordDesc1"
                    },{
                        description:"keywordDesc2"
                    },]
                }]
            }
        },
        created() {
            this.initialize()

        },
        methods:{
            initialize(){
                const app = this
                app.transferList()
                axios.get('/api/statistic/focus_info')
                    .then(res=>{
                        app.focusInfoList = res.data.focusInfoList
                        app.transferList()
                    }).catch(err=>{
                    app.$message.error(err+"")
                })
            },
            transferList(){
                const focusList = this.focusInfoList
                for(let i = 0;i<focusList.length;i++){
                    let len = focusList[i].keywordList.length
                    for(let j = 0;j<len;j++){
                        let item = {
                            description:focusList[i].description,
                            type:focusList[i].type,
                            keyword:focusList[i].keywordList[j].description,
                            len:0
                        }
                        if(j===0){
                            item.len = len
                        }
                        this.tableData.push(item)
                    }
                }
            },
            objectSpanMethod({row,column,rowIndex, columnIndex }) {
                console.log(row+column)
                if (columnIndex !== 2) {
                    let len = this.tableData[rowIndex].len
                    if(len !== 0){
                        return {
                            rowspan: len,
                            colspan: 1
                        }
                    }else{
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            addIntention(){
                this.addIntentionVisible = true
            },
            addKeyword(item){
                this.addKeywordVisible = true
                this.issueUpdatedID = item.id
            },
            saveIntention(){

            },
            saveKeyword(){

            }
        }
    }
</script>

<style scoped>

</style>