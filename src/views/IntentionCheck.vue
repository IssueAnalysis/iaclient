<template>
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
    </el-table>
</template>

<script>
    // import hljs from 'highlight.js'
    import axios from 'axios'
    export default {
        name: "IntentionCheck",
        data () {
            return {
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
                    app.$message.error(err)
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
            }
        }
    }
</script>

<style scoped>

</style>