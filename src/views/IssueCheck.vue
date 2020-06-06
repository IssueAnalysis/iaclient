<template>
    <v-card color="basil">
        <v-tabs
                v-model="tab"
                background-color="transparent"
                color="basil"
                grow
        >
            <v-tab
                    v-for="item in titles"
                    :key="item"
                    @change="init(item)"
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item>
                <IssueTable :ref="tableConfigs[0].actionType" :actionType="tableConfigs[0].actionType"></IssueTable>
            </v-tab-item>

            <v-tab-item>
                <IssueTable :ref="tableConfigs[1].actionType" :actionType="tableConfigs[1].actionType"></IssueTable>
            </v-tab-item>

            <v-tab-item>
                <IssueTable :ref="tableConfigs[2].actionType" :actionType="tableConfigs[2].actionType"></IssueTable>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import IssueTable from "../components/IssueTable";
    // import hljs from 'highlight.js'
    export default {
        name: "IssueCheck",
        components:{IssueTable},
        data () {
            return {
                titles:['我收藏的Issue','我添加的Issue','所有Issue'],
                tableConfigs:[
                    {
                        actionType: "find_collect",
                    },
                    {
                        actionType: "find_add",
                    },
                    {
                        actionType: "find_all",
                    }
                ],
                tab: null,
            }
        },
        created() {
            // hljs.initHighlightingOnLoad()
        },
        methods:{
            init(item){
                let index = this.titles.indexOf(item)
                switch (index) {
                    case 0:
                        this.$refs.find_collect.initialize()
                        break
                    case 1:
                        this.$refs.find_add.initialize()
                        break
                    case 2:
                        this.$refs.find_all.initialize()
                        break
                }
            }
        }
    }
</script>

<style scoped>
</style>
