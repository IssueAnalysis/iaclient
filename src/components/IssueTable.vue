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
    import Qs from 'qs'
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
                { text: '简要描述', value: 'briefDescription',align: 'start' },
                { text: '', value: 'actions', sortable: false },
            ],
            collectIcons:[collectIcon,noCollectIcon],
            checkIcon: checkIcon,
            issues: [],
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
                this.$router.push({
                    path:'/issue_detail',
                    query:{
                        issue_id:item.id,
                        csv_id:item.csvId
                    }
                })
            },
            collect(item){
                const app = this
                const index = app.issues.indexOf(item)
                let msg = "收藏失败, 请稍后重试"
                let body = {
                    csv_id:item.csvId,
                    id: item.id
                }
                axios.post('/api/action/collect_issues',Qs.stringify(body)).then(res=>{
                    if(res.data){
                        app.issues[index].collect = !app.issues[index].collect
                        msg = "操作成功"
                        app.$message.success(msg)
                    }else {
                        app.$message.error(msg)
                    }
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
