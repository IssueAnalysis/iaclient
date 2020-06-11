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
                <template slot-scope="scope">
                    <el-tag
                            disable-transitions>{{scope.row.description}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="Type">
                <template slot-scope="scope">
                    <el-tag
                            type="warning"
                            disable-transitions>{{scope.row.type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="keyword"
                    label="Keyword">
                <template slot-scope="scope">
                    <el-tag
                            type="success"
                            disable-transitions>{{scope.row.keyword}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    align="center">
                <template slot="header">
                    <el-button
                            size="mini"
                            type="success"
                            @click="addIntention()">Add Intention</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="warning"
                            @click="addKeyword(scope.row)">Add Keyword</el-button>
                </template>

            </el-table-column>

        </el-table>

        <el-dialog title="Add Intention" :visible.sync="addIntentionVisible">
            <el-form :model="editedIntention">
                <el-form-item label="Desc" :label-width="formLabelWidth">
                    <el-input v-model="editedIntention.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Type" :label-width="formLabelWidth">
                    <el-input v-model="editedIntention.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Keyword" :label-width="formLabelWidth">
                    <el-input v-model="editedIntention.keywordList[0].description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addIntentionVisible = false">Cancel</el-button>
                <el-button type="primary" @click="saveIntention">OK</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Add Keyword" :visible.sync="addKeywordVisible">
            <el-form>
                <el-form-item label="Desc" :label-width="formLabelWidth">
                    <el-input v-model="keywordDesc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addIntentionVisible = false">Cancel</el-button>
                <el-button type="primary" @click="saveKeyword">OK</el-button>
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
                intentionUpdatedID:-1,
                keywordDesc:"",
                editedIntention:{
                    id:0,
                    description:"",
                    type:"",
                    keywordList:[{
                        description:""
                    }]
                },
                defaultIntention:{
                    id:0,
                    description:"",
                    type:"",
                    keywordList:[{
                        description:""
                    }]
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
                        app.focusInfoList = res.data
                        app.transferList()
                    }).catch(err=>{
                    app.$message.error(err+"")
                })
            },
            transferList(){
                this.tableData = []
                const focusList = this.focusInfoList
                for(let i = 0;i<focusList.length;i++){
                    let len = focusList[i].keywordList.length
                    if(len===0){
                        let item = {
                            id:focusList[i].id,
                            description: focusList[i].description,
                            type: focusList[i].type,
                            keyword: "",
                            len: 1
                        }
                        this.tableData.push(item)
                    }else {
                        for (let j = 0; j < len; j++) {
                            let item = {
                                id:focusList[i].id,
                                description: focusList[i].description,
                                type: focusList[i].type,
                                keyword: focusList[i].keywordList[j].description,
                                len: 0
                            }
                            if (j === 0) {
                                item.len = len
                            }
                            this.tableData.push(item)
                        }
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
                console.log("focusInfoList:")
                console.log(this.focusInfoList)
                console.log("tableData:")
                console.log(this.tableData)
                this.addIntentionVisible = true
            },
            addKeyword(item){
                this.addKeywordVisible = true
                this.intentionUpdatedID = item.id
            },
            saveIntention(){
                let app = this
                axios.post("/api/statistic/add_focus",app.editedIntention)
                    .then(res=>{
                        app.editedIntention.id = res.data
                        app.focusInfoList.push(app.editedIntention)
                        app.transferList()
                        app.editedIntention = Object.assign({},app.defaultIntention)
                        this.addIntentionVisible = false
                        app.$message.success("添加成功")
                    }).catch(err=>{
                    app.$message.error(err+"")
                })
            },
            saveKeyword(){
                let app = this
                let index = app.findIndexOfFocus()
                if(index===-1){
                    app.$message.error("关注点不存在")
                }else{
                    app.focusInfoList[index].keywordList.push({
                        description:app.keywordDesc
                    })
                    axios.post("/api/statistic/update_focus",app.focusInfoList[index])
                        .then(()=>{
                            app.transferList()
                            this.addKeywordVisible = false
                            app.$message.success("添加成功")
                        })
                        .catch(err=>{
                            app.$message.error(err+"")
                        })
                }
            },
            findIndexOfFocus(){
                for(let i=0;i<this.focusInfoList.length;i++){
                    if(this.focusInfoList[i].id===this.intentionUpdatedID){
                        return i
                    }
                }
                return -1
            }
        }
    }
</script>

<style scoped>

</style>
