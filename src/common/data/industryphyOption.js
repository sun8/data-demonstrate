export default {
    title: {
        text: '按行业分类企业数量TOP10',
        subtext: '企业总数'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['1','2','1','2','1','2']
    },
    series: [{
        name: '企业数量',
        type: 'bar',
        data: ['我','0','0','0','0','0']
    }]
};
