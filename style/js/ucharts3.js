// JavaScript Document
var syzdsy2 = echarts.init(document.getElementById('syzdsy2')); 
var ls1= echarts.init(document.getElementById('ls1'));
var ls2= echarts.init(document.getElementById('ls2'));
var ls3= echarts.init(document.getElementById('ls3'));
var ydsy = echarts.init(document.getElementById('ydsy'));
var lstj =echarts.init(document.getElementById('lstj')); 
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
optionlstj = {
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    }, 
    series : [
        {
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'金融,保险业:7.07%'},
                {value:310, name:'电器,供水供气业:7.07%'},
                {value:234, name:'制造业：13.13%'},
                {value:135, name:'信息技术业:14.14%'},
                {value:1548, name:'建筑业：58.59%'}
            ]
        }
    ]
}; 
optionls1 = {
    series : [
        {
            type : 'pie',
            radius : [15, 30],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:38, itemStyle : labelBottom},
                {name:'盈利', value:62,itemStyle : labelTop}
            ]
        }
    ]
};
optionls2 = {
    series : [
        {
            type : 'pie',
            radius : [15, 30],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:62, itemStyle : labelBottom},
                {name:'亏损', value:38,itemStyle : labelTop1}
            ]
        }
    ]
};
optionls3 = {
    series : [
        {
            type : 'pie',
            radius : [20,40],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:14, itemStyle : labelBottom},
                {name:'盈利', value:96,itemStyle : labelTop}
            ]
        }
    ]
};   
optionydsy = {
    tooltip : {
        trigger: 'axis'
    },
   
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            
        }
    ]
}; 
// 为echarts对象加载数据 
syzdsy2.setOption(optionsyzdsy2);
lstj.setOption(optionlstj);  
ls1.setOption(optionls1);
ls2.setOption(optionls2);
ls3.setOption(optionls3);
ydsy.setOption(optionydsy);
