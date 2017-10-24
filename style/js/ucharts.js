// JavaScript Document
// 基于准备好的dom，初始化echarts图表
var syline = echarts.init(document.getElementById('syline')); 
var ylpic = echarts.init(document.getElementById('ylpic')); 
var kspic = echarts.init(document.getElementById('kspic')); 
optionsyline = {
   tooltip: {
       trigger: "axis",
       
   },
   legend: {
       x: 'center',
	   y: 'bottom',
       data: ["同期上证", "我的收益"]
   },
   calculable : true,
   xAxis: [
       {
           type: "category",
           name: "x",
           splitLine: {show: false},
		   boundaryGap : false,
           data: ["04-15", "04-16", "04-17", "04-18", "04-19", "04-20", "04-21"]
       }
   ],
   yAxis: [
       {
           type: "value",
           axisLabel : {
                formatter: '{value} %'
            }
       }
   ],
   calculable: true,
   series: [
       {
           name: "我的收益",
           type: "line",
           data: [-2.81, 1.55, 5.16, 4.33, 6.21, 5.38, 6.8],
       },
       {
           name: "同期上证",
           type: "line",
           data: [3.89, 2.49, 4.58, 2.58, 18, 8.28, 2.3],

       }
   ]
};

var labelTop = {
    normal : {
		color: '#d8110b',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelTop1= {
    normal : {
		color: '#009944',
        label : {
            show : true,
            position : 'center',
            formatter : '{b}',
            textStyle: {
                baseline : 'bottom'
            }
        },
        labelLine : {
            show : false
        }
    }
};
var labelFromatter = {
    normal : {
        label : {
            formatter : function (params){
                return 100 - params.value + '%'
            },
            textStyle: {
                baseline : 'top'
            }
        }
    },
}
var labelBottom = {
    normal : {
        color: '#e5e5e5',
        label : {
            show : true,
            position : 'center'
        },
        labelLine : {
            show : false
        }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};

optionylpic = {
    series : [
        {
            type : 'pie',
            radius : [20, 40],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:46, itemStyle : labelBottom},
                {name:'盈利交易', value:54,itemStyle : labelTop}
            ]
        }
    ]
};
                    

optionkspic = {
    series : [
        {
            type : 'pie',
            radius :[20, 40],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:6, itemStyle : labelBottom},
                {name:'亏损交易', value:94,itemStyle : labelTop1}
            ]
        }
    ]
};
// 为echarts对象加载数据 
syline.setOption(optionsyline); 
ylpic.setOption(optionylpic); 
kspic.setOption(optionkspic); 

