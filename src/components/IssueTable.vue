<template>
        <v-card>
            <v-card-title>
                Issue Table
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="issues"
                    :search="search"
                    sort-by="id"
                    class="elevation-1"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn color="rgba(255, 0, 0, 0)" @click="check(item)">
                        <img :src=checkIcon style="width:20px;height:20px"/>
                    </v-btn>

                    <v-btn color="rgba(255, 0, 0, 0)" @click="collect(item)">
                        <img :src=collectIcons[item.collect?1:0] style="width:20px;height:20px"/>
                    </v-btn>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>
</template>

<script>
    import axios from 'axios'
    import collectIcon from '../assets/collect.png'
    import noCollectIcon from '../assets/noCollect.png'
    import checkIcon from '../assets/check.png'
    export default {
        name: "issueTable",
        data: () => ({
            search:"",
            operator:"",
            headers: [
                { text: 'ID',value: 'id'},
                { text: '概括', value: 'summary' },
                { text: '简要描述', value: 'brief_description',align: 'start' },
                { text: '', value: 'actions', sortable: false },
            ],
            collectIcons:[collectIcon,noCollectIcon],
            checkIcon: checkIcon,
            issues: [{
                id:"1",
                csv_id:0,
                summary:"testSummary",
                brief_description:"\"I am using Hadoop-2.10.0.<pre><code>int main(){ print(\"hello world!\");}</code></pre>\n" +
                    "<br>" +
                    "<br>" +
                    "<span style='color: red'>The configuration parameter `dfs.namenode.audit.loggers` allows `default` (which is the default value) and `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`.</span>\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "When I use `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`, namenode will not be started successfully because of an `InstantiationException` thrown from `org.apache.hadoop.hdfs.server.namenode.FSNamesystem.initAuditLoggers`.åÊ\n" +
                    "\n" +
                    "\n" +
                    "\n" +
                    "The root cause is that while initializing namenode, `initAuditLoggers` will be called and it will try to call the default constructor of `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger` which doesn't have a default constructor. Thus the `InstantiationException` exception is thrown.\n" +
                    "\n",
                collect:false
            },
                {
                    id:"2",
                    summary:"testSummary",
                    brief_description:"这是一段代码<pre><code>int main(){ print(\"hello world!\");}</code></pre>",
                    collect:false
                }],
        }),
        props:{
            actionType:String
        },
        created() {
            this.initialize()
        },
        methods:{
            initialize(){
                const app = this
                let url = "/api/issue/"+app.actionType
                axios.get(url)
                    .then(res=>{
                        app.issues = res.data
                    })
                console.log("init  "+this.actionType)
            },
            check(item){
                this.$router.push({path:'/issue_detail',query:{issue_id:item.id,csv_id:item.csv_id}})
            },
            collect(item){
                const app = this
                const index = app.issues.indexOf(item)
                let msg = "收藏失败, 请稍后重试"
                axios.post('/api/action/collect_issues',{
                    issues: [item.id]
                }).then(res=>{
                    if(res.data.ret){
                        app.issues[index].collect = !app.issues[index].collect
                        msg = "收藏成功"
                        app.$message.success(msg)
                    }
                    app.$message.error(msg)
                }).catch(()=>{
                    app.$message.error(msg)
                })
            }
        }
    }
</script>

<style scoped>
    #nostyle{

    }
</style>