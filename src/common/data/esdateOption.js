export default {
    title : {
        text: '按企业注册时间查询总量',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name:'查询总量',
            type:'pie',
            selectedMode: 'single',
            radius : '55%',
            center: ['50%', '60%'],
            data:[{name:1,value:1},{name:2,value:2},{name:3,value:3}],
            itemStyle: {
                normal: {
                    color: '#61a0a8',
                    borderWidth: 0.5,
                    borderColor: '#ffffff'
                },
                emphasis: {
                    color: '#c23531',
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
