// JavaScript Document
var syzdsy = echarts.init(document.getElementById('syzdsy')); 
var syzdsy2 = echarts.init(document.getElementById('syzdsy2')); 
var amonth = echarts.init(document.getElementById('amonth')); 
optionsyzdsy = {
   tooltip: {
       trigger: "axis",
       
   },
   legend: {
       x: 'center',
	   y: 'bottom',
       data: ["用户累计收益率", "大盘累计收益率"]
   },
   calculable : true,
   xAxis: [
       {
           type: "category",
           name: "x",
           splitLine: {show: false},
		   boundaryGap : false,
           data: ["3月24日", "3月30日", "4月7日", "4月13日", "4月19日", "4月23日"]
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
           name: "用户累计收益率",
           type: "line",
           data: [-2.81, 1.55, 5.16, 4.33, 6.21, 5.38, 6.8],
       },
       {
           name: "大盘累计收益率",
           type: "line",
           data: [3.89, 2.49, 4.58, 2.58, 18, 8.28, 2.3],

       }
   ]
};
optionsyzdsy2 = {
   tooltip: {
       trigger: "axis",
       
   },
   legend: {
       x: 'center',
	   y: 'bottom',
       data: ["用户累计收益率", "大盘累计收益率"]
   },
   calculable : true,
   xAxis: [
       {
           type: "category",
           name: "x",
           splitLine: {show: false},
		   boundaryGap : false,
           data: ["3月24日", "3月30日", "4月7日", "4月13日", "4月19日", "4月23日"]
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
           name: "用户累计收益率",
           type: "line",
           data: [-2.81, 1.55, 5.16, 4.33, 6.21, 5.38, 6.8],
       },
       {
           name: "大盘累计收益率",
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

optionamonth = {
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
                    
// 为echarts对象加载数据 
syzdsy.setOption(optionsyzdsy); 
syzdsy2.setOption(optionsyzdsy2); 
amonth.setOption(optionamonth); 

