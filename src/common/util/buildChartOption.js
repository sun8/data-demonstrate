
// 最近的更新状态，整体概览

export function buildLatestChangeOption(data) {

	let {change, monitor, newMonitor, risk} = data;

	function resetVal(val) {
		return val < (monitor/100 )? Math.round(monitor/100) : val;
	}

	change = resetVal(change);
	monitor = resetVal(monitor);
	newMonitor = resetVal(newMonitor);
	risk = resetVal(risk);

	let monitorN = `监控数量  ${monitor}家`;
	let changeN = `本期变更  ${change}家`;
	let newMonitorN = `本期新增  ${newMonitor}家`;
	let riskN = `本期风险  ${risk}`;

	return {
		angleAxis: {
		    },

		    radiusAxis: {
		        type: 'category',
		        data: ['监控数量', '本期新增', '本期变更', '本期风险'].reverse(),
		        z: 10
		    },
		    polar: {
					center: ['55%', '45%'],
					radius : '60%',
		    },
				center: ['55%', '45%'],
				radius : '60%',
		    series: [{
		        type: 'bar',
		        data: [monitor, 0,0,0].reverse(),
		        coordinateSystem: 'polar',
		        name: monitorN,
		        stack: 'a'
		    }, {
		        type: 'bar',
		        data: [0, newMonitor, 0, 0].reverse(),
		        coordinateSystem: 'polar',
		        name: newMonitorN,
		        stack: 'a'
		    }, {
		        type: 'bar',
		        data: [0,0,change, 0].reverse(),
		        coordinateSystem: 'polar',
		        name: changeN,
		        stack: 'a'
		    },{
		        type: 'bar',
		        data: [0,0,0, risk].reverse(),
		        coordinateSystem: 'polar',
		        name: riskN,
		        stack: 'a'
		    }

			],


		    legend: {
		        show: true,
						orient: 'vertical',
						x: 'left',
		        data: [monitorN, newMonitorN, changeN, riskN]
		    }
	}
}

// 合并成echart的option
const renderChangeLineOption = function (xAxisData,changeData,changeAllData) {
		var option = {
		    title: {
		        text: ''
		    },
		    legend: {
		    	right: '8%',
		    	data: ["总体变更率", "本账号变更率"],
		    	y : 20,
		    	textStyle:{
		    		fontFamily:"宋体",
		    		fontSize:'14',
		    	}
		    },
		    grid: {
	        left: '2%',
	        right: '4%',
	        bottom: '16%',
	        containLabel: true
		    },
		    tooltip : {
	    		trigger : "axis",
	    		formatter: function (params) {
    				var tar = params[0];
    				if(!tar.value){
    					tar.value = '-';
    				}
    				var tar1 = params[1];



    				if(tar1){
    					if(!tar1.value){
	    					tar1.value = '-';
	    				}
    					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value +'%' +
    								'<br/>' + tar1.seriesName + ' : ' + tar1.value+'%';
    				}else{
    					return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value +'%' ;
    				}
	    		}
		    },
		    xAxis: [
	    		{
    				type: "category",
    				boundaryGap: false,
    				name: "",
    				splitLine: {show: false},
    				axisLabel:{
  					// rotate:20,
  					interval: 0,
    					textStyle:{
								fontSize:14,
								color:'#333',
								fontFamily:"宋体"
							}
    				},
    				data : xAxisData
	    		}
		    ],
		     yAxis: [
	    		 {
    				type: "value",
    				name: "变更率",
    				axisLabel: {
  						formatter: '{value}%',
  						textStyle:{
								fontSize:14,
								color:'#333',
								fontFamily:"宋体"
							}
    				},
    				axisLine : {
                show : false,
                onZero :false
            },
            // nameLocation  :'middle',
            left  :'left',
            nameGap :20,
            nameTextStyle:{
            	fontSize:16,
            	color:'#333',
            },
	    		 }
		     ],
				dataZoom :[
	        {
            type: 'slider',
           	show: true,
           	xAxisIndex: [0],
           	throttle:100,
           	start:50,
	        }
		    ],
		     // calculable: true,
		    series: [
	    		{
    				name: "总体变更率",
    				type: "line",
    				areaStyle: {
    					normal: {
    						opacity:0.3
    					}
    				},
    				lineStyle:{
    					normal: {
    						color:"#bfeee8"
    					}
    				},
    				data : changeAllData
	    		},
	    		{
    				name: "本账号变更率",
    				type: "line",
    				areaStyle: {
    					normal: {
    						opacity:0.3
    					}
    				},
    				lineStyle:{
    					normal: {
    						color:"#b2d3f6"
    					}
    				},
    				data : changeData
	    		}
		    ],
		    color:['#5ed4c5','#7fb6f0']
		};
		return option;
	};
	// 获取雷达图
	var renderChangeRadar = function () {

		// http://fl.bidata.com.cn:8088/front/stats/radarMap
		summaryService.pointRadar().success(function(result){
			if(result.success){
				var piontAll = result.data;
				var legendData = [];
				var radarData = [];
				var maxConcern = 0;
				var compareArr = [];
				var lengendLen = 0;

				$.each(piontAll,function(key,value){

					var radarDataItem =[];
					legendData.unshift({
						'name':key,
				    'icon':'rect'
				  });


			   	radarDataItem[0] = value.RISK || 0;
			   	radarDataItem[1] = value.ALERT || 0;
			   	radarDataItem[2] = value.CONCERN || 0;

					//获取关注 预警 风险数据
					radarData.push({
            value: radarDataItem,
            name: key,
            symbolSize: 2,
            tooltip: {
               trigger: 'item'
            }
          });
				});

				var timeSort = radarData.reverse().slice(0,6);
				var eleRect = timeSort.reverse();

				//数组排序获取最大
				var sortNumber = function(a,b){
					return a
				}
				var getMax = function(arr) {
			    var max = arr[0];
					for(var i=1;i<arr.length;i++){
					  if(max<arr[i])max=arr[i];
					}
					return max;
			  }
				$.each(eleRect,function(i,value){
					var maxTemp = getMax(value.value);
					compareArr.push(maxTemp);
				});
				compareArr.sort(function(a,b){return a-b;});
				var maxRadar = compareArr[compareArr.length -1];

				var chart = echarts.init(document.getElementById('radar-point-panel'));
				var option = _prepareChartOption(legendData,eleRect,maxRadar,maxRadar,maxRadar);
				chart.setOption(option);
			}
		});
	};

const renderChangeRectOption = function (xAxisData,concernData,alertData,riskData,maxXAxis) {
	var option = {
		tooltip : {
			backgroundCOlor:"rgba(255,255,255,0.7)",
			trigger: 'axis'
		},
		title: {
		 	text: "",
		 	x: "center",
		 	textStyle:{
				fontWeight:"normal"
		 	}
		},
		legend: {
			data:[
				{name:'风险',icon:'rect'},
				{name:'预警',icon:'rect'},
				{name:'关注',icon:'rect'},
			],
			right:'10%',
			y : 20,
			textStyle:{
				fontFamily:"宋体",
				fontSize:'14',
			}
		},
		grid: {
	    left: '6%',
	    right: '2%',
	    bottom: '16%',
	    containLabel: true
		},
		calculable : true,
		xAxis : [
			{
				type : 'category',
				data : xAxisData,
				axisLabel:{
					// rotate:20,
					interval: 0,
					textStyle:{
						fontSize:14,
						color:'#333',
						fontFamily:"宋体"
					}
				},
				name : ''
			}
		],
		dataZoom :[
    {
      type: 'slider',
     	show: true,
     	xAxisIndex: [0],
     	throttle:100,
     	start:50,
    }
    ],
		yAxis : [
			{
				type : 'value',
				name: "企业数量",
				axisLine : {
        show : false,
        onZero :false
      },
      left  :'left',
      nameGap :20,
      nameTextStyle:{
      	fontSize:16
      },
				axisLabel: {
					formatter: function(data){
						if(maxXAxis==800){
							if(data==0){
									return data;
							}else{
									return data+'万';
							}
						}else{
							return data;
						}
					},
					textStyle:{
						fontSize:14,
						color:'#333',
						fontFamily:"宋体"
					}
				}
			}
		],
		series : [
			{
				name:'风险',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : riskData
			},
			{
				name:'预警',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : alertData
			},
			{
				name:'关注',
				type:'bar',
				stack: '警告',
				barWidth:20,
				data : concernData
			},
		],
		color:['#ff8962','#ffba76','#fde1ab']
	};
	return option;
};

// 构建面积图参数 和 柱状图参数
export const bulidChangeTrendOption = (statResult)=>{
	let timeSort = statResult.reverse().slice(0,12);
	let eleRect = timeSort.reverse();

	let xAxisData = [];
	let riskData = [];
	let alertData = [];
	let concernData = [];
	let changeData = [];
	let changeAllData = [];
	let maxXAxis = 0;

	//构建图表数据结构
	for(var i =0; i< eleRect.length; i++) {

		let data = eleRect[i];
		xAxisData.push((data.date).substring(5) + "");
		riskData.push(data.risk);
		alertData.push(data.alert);
		concernData.push(data.concern);

		if(data.monitor>0){
			changeData.push(((data.change/data.monitor)*100).toFixed(2));
		}else{
			changeData.push("0");
		}

		if(data.allMonitor>0){
			changeAllData.push(((data.allChange/data.allMonitor)*100).toFixed(2));
		}else{
			changeAllData.push("0");
		}
	}

	return {
		changeLineOption: renderChangeLineOption(xAxisData,changeData,changeAllData),
		changeRectOption: renderChangeRectOption(xAxisData,concernData,alertData,riskData,maxXAxis)
	}

}

// 构建雷达图参数
export const buildChangeRadar = function (data) {
			var piontAll = data;
			var legendData = [];
			var radarData = [];
			var maxConcern = 0;
			var compareArr = [];
			var lengendLen = 0;

			for ( let key in piontAll){
				let value = piontAll[key];
				let radarDataItem =[];
				legendData.unshift({
						'name': key,
				    	'icon':'rect'
				  });


			   	radarDataItem[0] = value.RISK || 0;
			   	radarDataItem[1] = value.ALERT || 0;
			   	radarDataItem[2] = value.CONCERN || 0;

				//获取关注 预警 风险数据
				radarData.push({
			        value: radarDataItem,
			        name: key,
			        symbolSize: 2,
			        tooltip: {
			           trigger: 'item'
			        }
			      });

			}

			var timeSort = radarData.reverse().slice(0,6);
			var eleRect = timeSort.reverse();

			//数组排序获取最大
			var sortNumber = function(a,b){
				return a
			};

			var getMax = function(arr) {
			    var max = arr[0];

				for(var i=1;i<arr.length;i++){
				  if(max<arr[i])max=arr[i];
				}

				return max;
		  	};

			eleRect.forEach( (value,i)=>{
				var maxTemp = getMax(value.value);
				compareArr.push(maxTemp);
			} );

			compareArr.sort(function(a,b){return a-b;});
			var maxRadar = compareArr[compareArr.length -1];

			return renderChartOption(legendData,eleRect,maxRadar,maxRadar,maxRadar);


};
// 合并雷达图参数
const renderChartOption = function(legend,seriesData,maxC,maxA,maxR) {
	let option = { //可以去官网上根据每个案例不同的option去写各种图形
	  title: {   //标题
	     text: ''
	  },
	  tooltip: {   //提示框，鼠标悬浮交互时的信息提示
	     show:true,
	     trigger: 'axis'
	  },
	  grid:{
	  	top:'10%'
	  },
	  center: ['0%', '0%'],
	  legend: {    //图例，每个图表最多仅有一个图例
	    x: 'left',
	    data: legend,
	    textStyle:{
	    	fontFamily:"宋体",
	    	fontSize:'12',
	    },
	    orient:'vertical',
	    padding:16,
	    borderWidth :1,
	    borderColor:'#ddd',
	    selectedMode:'single'
	  },
	  radar: [{    //极坐标
	    indicator: [
				{name: '风险',max:maxR},
	      {name: '预警',max:maxA},
	      {name: '关注',max:maxC}
	    ],
	    name:{
	    	textStyle:{
	    		fontSize:14,
	    		color:'#666'
	    	}
	    },
	    startAngle: 90,   // 改变雷达图的旋转度数
	  }],
	  series: [{         // 驱动图表生成的数据内容数组，数组中每一项为一个系列的选项及数据
	    name: '指标',
	    type: 'radar',
	    // radarIndex: 6,
	    itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
	      normal: {
	        areaStyle: {
	            type: 'default'
	        }
	      }
	    },
	    symbol :'rect',
	    data: seriesData
	  }],
	  color:[
	  	'#7fb6f0',
	  	// '#8085e9',
	  	// '#f7a35c',
	  	// '#4d6b8f',
	  	// '#77e6d8',
	  	// '#f15c80'
	  ]
	};
	return option;
}

// 密度

export const buildMonitorDensityOption = (data)=>{
	return createDensityOption(data, 10000);

}
export const buildChangeDensityOption = (data)=>{
	return createDensityOption(data, 1000);
}

export const buildRiskDensityOption = (data)=>{
	return createDensityOption(data, 1000);
}

const createDensityOption = (data, ratio) => {


	let datas = [];


	let areaMap = {
		"110000": "北京",
		"120000": "天津",
		"130000": "河北",
		"140000": "山西",
		"150000": "内蒙古",
		"210000": "辽宁",
		"220000": "吉林",
		"230000": "黑龙江",
		"310000": "上海",
		"320000": "江苏",
		"330000": "浙江",
		"340000": "安徽",
		"350000": "福建",
		"360000": "江西",
		"370000": "山东",
		"410000": "河南",
		"420000": "湖北",
		"430000": "湖南",
		"440000": "广东",
		"450000": "广西",
		"460000": "海南",
		"500000": "重庆",
		"510000": "四川",
		"520000": "贵州",
		"530000": "云南",
		"540000": "西藏",
		"610000": "陕西",
		"620000": "甘肃",
		"630000": "青海",
		"640000": "宁夏",
		"650000": "新疆",
		"710000": "台湾",
		"810000": "香港",
		"820000": "澳门"
	};

	//转换数据为地图所需要的数据
	var _wrapper = function(data) {
		var result = [];
		for(var item in data) {
			result.push({
				"name" : areaMap[""+item] || item,
				"value" : data["" + item]
			})
		}
		return result;
	};


	datas = _wrapper(data);

	return renderDensityOption('', datas, ratio);

}

const renderDensityOption = (seectionName,datas,max) => {
	var option = {
	    title: {
	        text: '',
	        subtext: '',
	        left: 'center'
	    },
	    tooltip : {
    		trigger: 'item',
    		formatter: function(params,ticket,callback) {
    				if(params.value) {
    						return params.name + ": " + params.value;
    				}
    				return params.name + ": 无数据";
    		}
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	    },
	    grid:{
	    	left:'4%'
	    },
	    visualMap: {
	        min: 0,
	        max: max,
	        left: '20',
	        top: 'bottom',
	        text: ['高','低'],           // 文本，默认为数值文本
	        calculable: true
	    },
	    toolbox: {
	        show: false,
	        orient: 'vertical',
	        left: 'right',
	        top: 'center',
	        feature: {
	            dataView: {},
	            restore: {},
	            saveAsImage: {}
	        }
	    },
		series : [
			{
				name: seectionName,
				type: 'map',
				mapType: 'china',
				roam: false,
				showLegendSymbol:false,
				label: {
	               normal: {
	                   show: false
	               },
	               emphasis: {
	                    show: true,
	               }
	            },
				data : datas
			}
		],
	};
	return option;
}

// end 密度

// 行业 option 渲染
export const buildIndustryOption = (statResult)=>{
	//行业类型
	let tempList = [];
	for(let type in statResult){
		tempList.push(statResult[type]);
	}
	tempList.reverse();

	let yAxisData = [];
	let warningData = [];
	let changeData = [];
	for(let obj in statResult) {
		let data = statResult[obj];
		yAxisData.unshift(data.name);
		warningData.unshift(parseInt(data.riskCount) );
		changeData.unshift(parseInt(data.count ) );
	}

	// console.log(xAxisData);


	return renderIndustryChart('stats',yAxisData,warningData,changeData);
}

// end 行业 option 渲染
const renderIndustryChart = (divId, yAxisData,warningData,changeData) => {
	return {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: yAxisData,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' '
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -4,
            y: 40,
            floating: true,
            borderWidth: 1,
            // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true,
            borderColor:'#888',
            itemStyle:{
            	fontWeight:'normal'
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '变更',
            data: changeData,
            color:"#77e6d8",
            maxPointWidth:20
        }, {
            name: '风险',
            data: warningData,
            color:"#feb872",
            maxPointWidth:20
        },
        ]
    }

}

//企业和高管参数
export const buildEnterpriseOption = (month,enterprise,seniorExecutive) =>{

	let option ={
			title : {
			    text: '查询企业和高管总量',
			    subtext: '查询量'
			},
			tooltip : {
			    trigger: 'axis'
			},
			legend: {
			    data:['企业','高管']
			},
			toolbox: {
			    show : true,
			    feature : {
			        dataView : {show: true, readOnly: false},
			        magicType : {show: true, type: ['line', 'bar']},
			        restore : {show: true},
			        saveAsImage : {show: true}
			    }
			},
			calculable : true,
			xAxis : [
			    {
			        type : 'category',
			        data : month
			    }
			],
			yAxis : [
			    {
			        type : 'value'
			    }
			],
			series : [
			    {
			        name:'企业',
			        type:'bar',
			        data:enterprise,
			        markPoint : {
			            data : [
			                {type : 'max', name: '最大值'},
			                {type : 'min', name: '最小值'}
			            ]
			        },
			        markLine : {
			            data : [
			                {type : 'average', name: '平均值'}
			            ]
			        }
			    },
			    {
			        name:'高管',
			        type:'bar',
			        data:seniorExecutive,
			        markPoint : {
			            data : [
			              {type : 'max', name: '最大值'},
			              {type : 'min', name: '最小值'}
			            ]
			        },
			        markLine : {
			            data : [
			                {type : 'average', name : '平均值'}
			            ]
			        }
			    }
			]
		}
		return option
}

//企业注册资本统计
export const buildEnterpriseCapitalRegistrationOption  = (data) =>{
	let option = {
		title : {
			text: '',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data:[...data]
		},
		grid: {
			 left: '5%',
			 right: '4%',
			 bottom: '3%',
			 containLabel: true
	 	},
		series : [
			{
				name:'查询总量',
				type:'pie',
				selectedMode: 'single',
				radius : '55%',
				center: ['58%', '50%'],
				data:[...data],

				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
				// itemStyle: {
				//     normal: {
				//         color: '#61a0a8',
				//         borderWidth: 0.5,
				//         borderColor: '#ffffff'
				//     },
				//     emphasis: {
				//         color: '#c23531',
				//         shadowBlur: 10,
				//         shadowOffsetX: 0,
				//         shadowColor: 'rgba(0, 0, 0, 0.5)'
				//     }
				// }
			}
		]
	}


	// let option ={
	//     title: {
	//         text: "",
	//         x: "center"
	//     },
	//     tooltip: {
	//         trigger: "item",
	//         formatter: "{a} <br/>{b} : {c} ({d}%)"
	//     },
	// 	legend: {
	//         orient: 'vertical',
	//         x: 'left',
	//         data:[...data]
	//     },
	//     label: {
	//         normal: {
	//             formatter: "{b} ({d}%)",
	//             position: "insideTopRight"
	//         }
	//     },
	//     labelLine: {
	//         normal: {
	//             smooth: .6
	//         }
	//     },
	//     toolbox: {
	//         show: !0,
	//         feature: {
	//             mark: {
	//                 show: !0
	//             },
	//             dataView: {
	//                 show: !0,
	//                 readOnly: !1
	//             },
	//             magicType: {
	//                 show: !0,
	//                 type: ["pie", "funnel"]
	//             },
	//             restore: {
	//                 show: !0
	//             },
	//             saveAsImage: {
	//                 show: !0
	//             }
	//         }
	//     },
	//     calculable: !0,
	//     series: [{
	//         name: "企业数量",
	//         type: "pie",
	// 		center: ['59%', '50%'],
	//         roseType: "area",
	//         label: {
	//             normal: {
	//                 show: !0
	//             },
	//             emphasis: {
	//                 show: !0
	//             }
	//         },
	//         lableLine: {
	//             normal: {
	//                 show: !0
	//             },
	//             emphasis: {
	//                 show: !0
	//             }
	//         },
	//         data:  [...data]
	//     }]
	// }

	return option
}


//企业数量
export const buildEnterpriseQquantityOption = (data) =>{
	let { xData , yData } = data ;
	let option = {
		    title: {
		        text: '',
		        subtext: ''
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '8%',
		        bottom: '5%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data: [...yData]
		    },
		    series: [{
		        name: '企业数量',
		        type: 'bar',
		        data: [...xData]
		    }]
		}

		return option
}


//企业注册时间查询总量
export const buildEnterpriseRegistrationTimeOption = (data) =>{
// console.log(data);
	// let option = {
	// 	title : {
	//         text: '',
	//         x:'center'
	//     },
	//     tooltip : {
	//         trigger: 'item',
	//         formatter: "{a} <br/>{b} : {c} ({d}%)"
	//     },
	// 	legend: {
    //     orient: 'vertical',
    //     x: 'left',
    //     data:[...data]
    // 	},
	//     series : [
	//         {
	//             name:'查询总量',
	//             type:'pie',
	//             selectedMode: 'single',
	//             radius : '55%',
	//             center: ['50%', '50%'],
	//             data:[...data],
	//
	// 			itemStyle: {
	//                 emphasis: {
	//                     shadowBlur: 10,
	//                     shadowOffsetX: 0,
	//                     shadowColor: 'rgba(0, 0, 0, 0.5)'
	//                 }
	//             }
	//             // itemStyle: {
	//             //     normal: {
	//             //         color: '#61a0a8',
	//             //         borderWidth: 0.5,
	//             //         borderColor: '#ffffff'
	//             //     },
	//             //     emphasis: {
	//             //         color: '#c23531',
	//             //         shadowBlur: 10,
	//             //         shadowOffsetX: 0,
	//             //         shadowColor: 'rgba(0, 0, 0, 0.5)'
	//             //     }
	//             // }
	//         }
	//     ]
	// }
	let {count,year} = data;
	let option = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    // legend: {
    //     data:['最高气温','最低气温']
    // },
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data: [...year]
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    },
		grid: {
			 left: '3%',
			 right: '12%',
			 bottom: '3%',
			 containLabel: true
	 	},
    series: [
        {
            name:'最高数量',
            type:'line',
            data:[...count],
            // markPoint: {
            //     data: [
            //         {type: 'max', name: '最大值'},
            //         {type: 'min', name: '最小值'}
            //     ]
            // },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }

    ]
};
	return option
}


//在营企业总数
export const buildTotaInUKEnterprisesOption = (data) =>{
	return data
}

//在营个体总数
export const buildTotalIndividualsInBattalionOption = (data) =>{
	return data
}
