// JavaScript Document
// 基于准备好的dom，初始化echarts图表
var monthyl= echarts.init(document.getElementById('monthyl'));
var monthks= echarts.init(document.getElementById('monthks'));
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
optionmonthyl = {
    series : [
        {
            type : 'pie',
            radius : [15, 30],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:25, itemStyle : labelBottom},
                {name:'盈利', value:75,itemStyle : labelTop}
            ]
        }
    ]
};
optionmonthks  = {
    series : [
        {
            type : 'pie',
            radius : [15, 30],
            x: '0%', // for funnel
            itemStyle : labelFromatter,
            data : [
                {name:'invisible', value:75, itemStyle : labelBottom},
                {name:'亏损', value:25,itemStyle : labelTop1}
            ]
        }
    ]
};
// 为echarts对象加载数据 
monthyl.setOption(optionmonthyl);
monthks.setOption(optionmonthks);




