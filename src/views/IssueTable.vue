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
                    <div v-html="item.description"></div>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>
</template>

<script>
    // import axios from 'axios'
    import hljs from 'highlight.js'
    export default {
        name: "issueTable",
        data: () => ({
            search:"",
            operator:"",
            headers: [
                { text: 'ID',value: 'id'},
                { text: '概括', value: 'summary' },
                { text: '详细描述', value: 'description' },
                { text: '关注点', value: 'intention' },
                { text: '考虑', value: 'consideration' },
            ],
            issues: [{
                id:"1",
                summary:"testSummary",
                description:"这是一段代码<pre><code>int main(){ print(\"hello world!\");}</code></pre>",
                intention:"testIntention",
                consideration:"testConsideration",
            },
                {
                    id:"2",
                    summary:"testSummary",
                    description:"这是一段代码<pre><code>int main(){ print(\"hello world!\");}</code></pre>",
                    intention:"testIntention",
                    consideration:"testConsideration",
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
                // const app = this
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

                // axios.get("/api/issue/find_all")
                //     .then(res=>{
                //         app.issues = res.data
                //     })
                this.highlightCode()
                console.log("init  "+this.actionType)
            },
            highlightCode() {
                var pres = document.querySelectorAll("pre>code");
                for (var i = 0; i < pres.length; i++) {
                    hljs.highlightBlock(pres[i]);
                }
            }
        }
    }
</script>

<style scoped>
    #nostyle{

    }
</style>