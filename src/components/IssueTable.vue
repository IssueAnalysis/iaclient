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
                <template v-slot:item.description="{ item }">
                    <div v-html="item.description" v-highlight></div>
                </template>
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
                { text: '详细描述', value: 'description',align: 'start' },
                { text: '关注点', value: 'intention' },
                { text: '考虑', value: 'consideration' },
                { text: '', value: 'actions', sortable: false },
            ],
            collectIcons:[collectIcon,noCollectIcon],
            checkIcon: checkIcon,
            issues: [{
                id:"1",
                summary:"testSummary",
                description:"这是一段代码<pre><code>int main(){ print(\"hello world!\");}</code></pre>",
                intention:"testIntention",
                consideration:"testConsideration",
                collect:false
            },
                {
                    id:"2",
                    summary:"testSummary",
                    description:"这是一段代码<pre><code>int main(){ print(\"hello world!\");}</code></pre>",
                    intention:"testIntention",
                    consideration:"testConsideration",
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
                // app.ticket_id = this.$route.query.ticket_id
                // axios
                //     .get(`/api/user/info`)
                //     .then(response => {
                //         app.operator = response.data.user_name
                //         axios.post("/api/issue/get",{
                //             id:app.issue_id,
                //             user_id:app.user_id
                //         }).then(res=>{
                //             app.issues = res.data
                //         })
                //     })
                //     .catch(error => {
                //         this.$message.error('获取用户信息失败：Err = ' + error.response.data.message)
                //     })

                axios.get("/api/issue/find_all")
                    .then(res=>{
                        app.issues = res.data
                    })
                console.log("init  "+this.actionType)
            },
            check(item){
                this.$route.push('/issue_info',item.id)
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