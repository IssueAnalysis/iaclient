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
            >
                {{ item }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                    v-for="config in tableConfigs"
                    :key="config.actionType"
            >
                <IssueTable :key="config.actionType" :actionType="config.actionType"></IssueTable>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    import IssueTable from "./IssueTable";
    export default {
        name: "IssueCheck",
        components:{IssueTable},
        data () {
            return {
                titles:['收藏Issue','添加Issue','所有Issue'],
                tableConfigs:[
                    {
                        actionType: "test1",
                    },
                    {
                        actionType: "test2",
                    },
                    {
                        actionType: "test3",
                    }
                ],
                tab: null,
            }
        },
    }
</script>

<style scoped>
</style>