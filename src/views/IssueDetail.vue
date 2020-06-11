<template>
    <v-app>
    <v-card shaped class="mx-auto">
        <v-card-title></v-card-title>
        <v-card-title style="margin-left:20px">Issue{{detailForm.id}}</v-card-title>
        <v-expansion-panels
                v-model="panel"
                multiple
                inset
        >
            <v-expansion-panel>
                <v-expansion-panel-header>Summary</v-expansion-panel-header>
                <v-expansion-panel-content align="left">
                    {{detailForm.summary}}
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Description</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-html="detailForm.description" v-highlight align="left"></div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-data-table
                :headers="intentionHeaders"
                :items="detailForm.focus"
                sort-by="vote"
                sort-desc="true"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Intentions</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="rgba(255, 0, 0, 0)" @click="voteIntention(item)">
                    <img :src=collectIcons[item.voted?0:1] style="width:20px;height:20px"/>
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>

        <v-data-table
                :headers="keywordHeaders"
                :items="detailForm.keyword"
                sort-by="vote"
                sort-desc="true"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Keywords</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="rgba(255, 0, 0, 0)" @click="voteKeyword(item)">
                    <img :src=collectIcons[item.voted?0:1] style="width:20px;height:20px"/>
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
        </v-data-table>

    </v-card>
    </v-app>
</template>

<script>
    import collectIcon from "../assets/voted.png";
    import noCollectIcon from "../assets/novoted.png";
    import axios from 'axios'
    import Qs from 'qs'

    export default {
        name: 'issue_detail',
        data () {
            return {
                intentionHeaders:[
                    { text: 'Description', value: 'description' },
                    { text: 'Type', value: 'type' },
                    { text: 'Vote Num', value: 'vote' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                keywordHeaders:[
                    { text: 'Description', value: 'description' },
                    { text: 'Vote Num', value: 'vote' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                panel:[0,1],
                items:5,
                collectIcons:[collectIcon,noCollectIcon],
                detailForm:{
                    id: 'testID',
                    csv_id:'',
                    summary:'summary',
                    description:"\"I am using Hadoop-2.10.0.</p><pre><code>int main(){\n" +
                        "print(\"hello world!\");}</code></pre>\n" +
                        "<span style='color: red;align-items: first'>The configuration parameter `dfs.namenode.audit.loggers` allows `default` (which is the default value) and `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`.</span>\n" +
                        "When I use `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger`, namenode will not be started successfully because of an `InstantiationException` thrown from `org.apache.hadoop.hdfs.server.namenode.FSNamesystem.initAuditLoggers`.åÊ\n" +
                        "\n" +
                        "\n" +
                        "\n" +
                        "The root cause is that while initializing namenode, `initAuditLoggers` will be called and it will try to call the default constructor of `org.apache.hadoop.hdfs.server.namenode.top.TopAuditLogger` which doesn't have a default constructor. Thus the `InstantiationException` exception is thrown.\n" +
                        "\n<",
                    focus:[{
                        description:"testFocus",
                        type:"",
                        vote:0,
                        voted:true,
                    }],
                    keyword:[{
                        description:"",
                        vote:0,
                        voted:true,
                    },{
                        description:"",
                        vote:2,
                        voted:true,
                    },{
                        description:"",
                        vote:1,
                        voted:true,
                    }],
                },
                confPassword:''
            }
        },
        created() {
            this.initialize()
        },
        methods:{
            initialize(){
                const app = this
                let id = app.$route.query.issue_id
                let csv_id = app.$route.query.csv_id
                axios.get("/api/issue/detail",{
                    params: {
                        id: id,
                        csv_id:csv_id
                    }
                })
                .then(res=>{
                    app.detailForm = res.data
                })
            },
            voteIntention(item){
                const app = this
                const index = app.detailForm.focus.indexOf(item)
                if(app.detailForm.focus[index].voted===true){
                    app.$message.warning("请勿重复投票")
                    return
                }
                let focus = app.detailForm.focus[index]
                let body = {
                    issue_id:app.detailForm.id,
                    csv_id:app.detailForm.csv_id,
                    focus_id:focus.id
                }
                axios.post("/api/issue/vote_focus",Qs.stringify(body))
                    .then(()=>{
                    app.detailForm.focus[index].voted = true
                    app.detailForm.focus[index].vote++
                    app.$message.success("投票成功")
                }).catch(err=>{
                    app.$message.error(err+"")
                })
            },
            voteKeyword(item){
                const app = this
                const index = app.detailForm.keyword.indexOf(item)
                if(app.detailForm.keyword[index].voted===true){
                    app.$message.warning("请勿重复投票")
                    return
                }
                let keyword = app.detailForm.keyword[index]
                let body = {
                    issue_id:app.detailForm.id,
                    csv_id:app.detailForm.csv_id,
                    keyword_id:keyword.id
                }
                axios.post("/api/issue/vote_keyword",Qs.stringify(body))
                    .then(()=>{
                    app.detailForm.keyword[index].voted = true
                    app.detailForm.keyword[index].vote++
                    app.$message.success("投票成功")
                }).catch(err=>{
                    app.$message.error(err+"")
                })
            },
        },
    }
</script>

<style lang='less' scoped>
</style>

<style>
    .formItem .el-form-item__label{
        font-size: 20px;
    }
</style>
