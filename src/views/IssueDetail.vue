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
                    <v-spacer></v-spacer>
                    <v-dialog v-model="intentionDialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">New</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedIntention.description" label="Description"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedIntention.type" label="Type"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeIntention">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="saveIntention">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="rgba(255, 0, 0, 0)" @click="voteIntention(item)">
                    <img :src=collectIcons[item.is_voted?1:0] style="width:20px;height:20px"/>
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
                    <v-spacer></v-spacer>
                    <v-dialog v-model="keywordDialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">New</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedKeyword.description" label="Description"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeKeyword">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="saveKeyword">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn color="rgba(255, 0, 0, 0)" @click="voteKeyword(item)">
                    <img :src=collectIcons[item.is_voted?1:0] style="width:20px;height:20px"/>
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
    import collectIcon from "../assets/collect.png";
    import noCollectIcon from "../assets/noCollect.png";
    import axios from 'axios'

    export default {
        name: 'issue_detail',
        data () {
            return {
                intentionDialog:false,
                intentionHeaders:[
                    { text: 'Description', value: 'description' },
                    { text: 'Type', value: 'type' },
                    { text: 'Vote Num', value: 'vote' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                editedIntention:{
                    description:"",
                    type:"",
                    vote:0,
                    is_voted:false,
                },
                defaultIntention:{
                    description:"",
                    type:"",
                    vote:0,
                    is_voted:false,
                },
                keywordDialog:false,
                keywordHeaders:[
                    { text: 'Description', value: 'description' },
                    { text: 'Vote Num', value: 'vote' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ],
                editedKeyword:{
                    description:"",
                    vote:0,
                    is_voted:false,
                },
                defaultKeyword:{
                    description:"",
                    vote:0,
                    is_voted:false,
                },
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
                        is_voted:true,
                    }],
                    keyword:[{
                        description:"",
                        vote:0,
                        is_voted:true,
                    },{
                        description:"",
                        vote:2,
                        is_voted:true,
                    },{
                        description:"",
                        vote:1,
                        is_voted:true,
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
                axios.get("/api/issue/detail",{params: {id: id,csv_id:csv_id}})
                .then(res=>{
                    app.detailForm = res.data.issue
                })
            },
            voteIntention(item){
                const app = this
                const index = app.detailForm.focus.indexOf(item)
                let voted = app.detailForm.focus[index].is_voted
                app.detailForm.focus[index].is_voted = !voted
                if(voted){
                    app.detailForm.focus[index].vote--
                }else{
                    app.detailForm.focus[index].vote++
                }
            },
            voteKeyword(item){
                const app = this
                const index = app.detailForm.keyword.indexOf(item)
                let voted = app.detailForm.keyword[index].is_voted
                app.detailForm.keyword[index].is_voted = !voted
                if(voted){
                    app.detailForm.keyword[index].vote--
                }else{
                    app.detailForm.keyword[index].vote++
                }
            },
            closeIntention(){
                this.intentionDialog = false
                this.$nextTick(() => {
                    this.editedIntention = Object.assign({}, this.defaultIntention)
                })
            },
            saveIntention () {
                this.detailForm.focus.push(this.editedIntention)
                this.closeIntention()
            },
            closeKeyword(){
                this.keywordDialog = false
                this.$nextTick(() => {
                    this.editedKeyword = Object.assign({}, this.defaultKeyword)
                })
            },
            saveKeyword () {
                this.detailForm.keyword.push(this.editedKeyword)
                this.closeKeyword()
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