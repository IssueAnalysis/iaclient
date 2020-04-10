<template>
        <v-card align="center">
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
                    sort-by="ID"
                    class="elevation-1"
            >
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>
</template>

<script>
    import axios from 'axios'
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
                id:"testID",
                summary:"testSummary",
                description:"testDesc",
                intention:"testIntention",
                consideration:"testConsideration"
            }],
        }),
        props:{
            issue_id: String,
            user_id: String,
        },
        created() {
            this.initialize()
        },
        methods:{
            initialize(){
                const app = this
                app.ticket_id = this.$route.query.ticket_id
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
            }
        }
    }
</script>

<style scoped>
    #nostyle{

    }
</style>