<template>
    <el-form>
        <el-form-item style="margin-top:60px;">
            <el-row>
                <el-col style="width:40%; margin-left:100px">
                    <div id="focus_num" style="width:100%; height:500px;"></div>
                </el-col>
                <el-col style="width:50%">
                    <div id="edited_rate" style="width:100%; height:500px;"></div>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row style="margin-top:40px;">
                <el-col style="width:40%; margin-left:100px">
                    <div id="myfocus_num" style="width:100%; height:500px;"></div>
                </el-col>
                <el-col style="width:50%">
                    <div id="myedited_rate" style="width:100%; height:500px;"></div>
                </el-col>
            </el-row>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: '',
        data: () => ({
            focusInfo: [0,0,0,2,3,6,8,8,8,9,11,15,15,17],
            myFocusInfo: [0,0,0,2,3,3,3,3,3,5,5,6,6,8],
            issueInfo:[
                {value: 8, name: '已添加', itemStyle:{color: '#04B486'}},
                {value: 451, name: '未添加', itemStyle:{color: '#0A2A29'}},
            ],
            myIssueInfo:[
                {value: 5, name: '已添加', itemStyle:{color: '#04B486'}},
                {value: 105, name: '未添加', itemStyle:{color: '#0A2A29'}},
            ]
        }),
        methods:{
            drawFocusChart(){
                const echarts = require('echarts');
                let myChart = echarts.init(document.getElementById('focus_num'));
                myChart.setOption(
                    {
                        title:{
                            text:'近两周系统中有效关注点个数',
                            x:'center'
                        },
                        tooltip:{
                            trigger:'axis'
                        },
                        xAxis:{
                            type:'category',
                            data:['14天前','','','','','','','7天前','','','','','','']
                        },
                        yAxis:{
                            type:'value'
                        },
                        series:[{
                            data:this.focusInfo,
                            type:'line',
                        }]
                    }
                )
            },
            drawEditedRateChart(){
                const echarts = require('echarts');
                let myChart = echarts.init(document.getElementById('edited_rate'));
                myChart.setOption(
                    {
                        title:{
                            text:'系统中已添加与未添加关注点的Issue个数',
                            x:'center'
                        },
                        tooltip:{
                            trigger:'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        legend:{
                            orient:'vertical',
                            left:100,
                            data:['已添加','未添加']
                        },
                        series:[{
                            name:'Issue情况统计',
                            type:'pie',
                            radius: ['50%', '75%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.issueInfo
                        }]
                    }
                )
            },
            drawMyFocusChart(){
                const echarts = require('echarts');
                let myChart = echarts.init(document.getElementById('myfocus_num'));
                myChart.setOption(
                    {
                        title:{
                            text:'近两周我添加的关注点个数',
                            x:'center'
                        },
                        tooltip:{
                            trigger:'axis'
                        },
                        xAxis:{
                            type:'category',
                            data:['14天前','','','','','','','7天前','','','','','','']
                        },
                        yAxis:{
                            type:'value'
                        },
                        series:[{
                            data:this.myFocusInfo,
                            type:'line',
                        }]
                    }
                )
            },
            drawMyEditedRateChart(){
                const echarts = require('echarts');
                let myChart = echarts.init(document.getElementById('myedited_rate'));
                myChart.setOption(
                    {
                        title: {
                            text: '关注点对应Issue数量统计',
                            x:'center'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                        },
                        yAxis: {
                            type: 'category',
                            data: ['块接收器', '数据接收器', '输入流', '日志等级']
                        },
                        series: [
                            {
                                name: '对应Issue数量',
                                type: 'bar',
                                data: [1, 2, 4, 8],
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            var colorList = ['#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29','#0A2A29'];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                )
            },
        },
        mounted(){
            this.drawFocusChart()
            this.drawEditedRateChart()
            this.drawMyFocusChart()
            this.drawMyEditedRateChart()
        }
    }
</script>

<style scoped>

</style>