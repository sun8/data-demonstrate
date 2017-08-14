export default {
    title: {
        text: "企业注册资本统计",
        x: "center"
    },
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: "left",
        data: ['1','2','1','2','1','2']
    },
    label: {
        normal: {
            formatter: "{b} ({d}%)",
            position: "insideTopRight"
        }
    },
    labelLine: {
        normal: {
            smooth: .6
        }
    },
    toolbox: {
        show: !0,
        feature: {
            mark: {
                show: !0
            },
            dataView: {
                show: !0,
                readOnly: !1
            },
            magicType: {
                show: !0,
                type: ["pie", "funnel"]
            },
            restore: {
                show: !0
            },
            saveAsImage: {
                show: !0
            }
        }
    },
    calculable: !0,
    series: [{
        name: "企业数量",
        type: "pie",
        roseType: "area",
        label: {
            normal: {
                show: !0
            },
            emphasis: {
                show: !0
            }
        },
        lableLine: {
            normal: {
                show: !0
            },
            emphasis: {
                show: !0
            }
        },
        data: ['1','2','1','2','1','2']
    }]
};
