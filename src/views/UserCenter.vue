<template>
    <div>
        <v-card>
            <v-card-title>
                我的收藏
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
                :items="issues2"
                :search="search"
                sort-by="id"
                class="elevation-1"
            >
            </v-data-table>
        </v-card>
        <v-card style="margin-top:40px;">
            <v-card-title>
                我导入的Issue
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
                    :items="issues1"
                    :search="search"
                    sort-by="id"
                    class="elevation-1"
            >
            </v-data-table>
        </v-card>
    </div>
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
                { text: '描述', value: 'brief_description',align: 'start' },
                { text: '', value: 'actions', sortable: false },
            ],
            collectIcons:[collectIcon,noCollectIcon],
            checkIcon: checkIcon,
            issues1: [{
                id:"1",
                csv_id:0,
                summary:"DataNode.DataTransfer thread should catch all the expception and log it.",
                brief_description:"Some time If this thread is throwing exception other than IOException, will not be able to trash it."
            },
                {
                    id:"2",
                    summary:"RBF: Print stacktrace when DFSRouter fails to fetch/parse JMX output from NameNode",
                    brief_description:"When DFSRouter fails to fetch or parse JMX output from NameNode, it prints only the error message. Therefore we had to modify the source code to print the stacktrace of the exception to find the root cause.",
                }],
            issues2: [{
                id:"1",
                csv_id:0,
                summary:"Crashing bugs in NameNode when using a valid configuration for `dfs.namenode.audit.loggers`",
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
            },
                {
                    id:"2",
                    summary:"RBF: Print stacktrace when DFSRouter fails to fetch/parse JMX output from NameNode",
                    brief_description:"When DFSRouter fails to fetch or parse JMX output from NameNode, it prints only the error message. Therefore we had to modify the source code to print the stacktrace of the exception to find the root cause.",
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
                axios.get("/api/issue/find_collect")
                    .then(res=>{
                        app.issues1 = res.data
                    })
                axios.get("/api/issue/find_add")
                    .then(res=>{
                        app.issues2 = res.data
                    })
            },
        }
    }
</script>

<style scoped>

</style>