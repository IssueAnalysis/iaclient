<template>
    <v-app align="center">
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
                    sort-by="ID"
                    class="elevation-1"
            >
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-app>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "issueTable",
        data: () => ({
            search:"",
            operator:"",

            headers: [
                { text: 'GitHash',value: 'id'},
                { text: 'PSM', value: 'url' },
                { text: 'Ticket ID', value: 'intension' },
                { text: '负责人', value: 'consideration' },
                { text: '作者', value: 'user_id' },
                { text: '介绍', value: 'desc' },
                { text: '是否确认', value: 'confirm'},
            ],
            issues: [{
                id:"test",
                psm:"testPSM",
                ticket_id:0,
                owner:"testOwner",
                author:"testAuthor",
                desc:"testDesc",
                confirm:0
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
                axios
                    .get(`/api/user/info`)
                    .then(response => {
                        app.operator = response.data.user_name
                        axios.post("/api/issue/get",{
                            id:app.issue_id,
                            user_id:app.user_id
                        }).then(res=>{
                            app.issues = res.data
                        })
                    })
                    .catch(error => {
                        this.$message.error('获取用户信息失败：Err = ' + error.response.data.message)
                    })
            }
        }
    }
</script>

<style scoped>
    #nostyle{

    }
</style>