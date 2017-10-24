// JavaScript Document
$(document).ready(function () {
	/**
	 * 如果在买卖页面，判断当前事件是是否在买卖时间内
	 * @returns
	 *
	if($('#s').val()==3){
		if(compare_hms()){}else{var Mbody = "<p style=\"text-align:center;color:red; \">当前不在交易时间！</p>";MymodelHTML("操作提示",Mbody,false,false,"SM","/member/");}
	}*/
	/**
	 * 绑定用户中心历史对账事件
	 * @returns
	 */
	GPtarget();	
	setInterval(GPtarget, 10000);
	/**
	 * 如果是我的成绩页面以下代码执行
	 * @returns
	 */  
	if($('#s').val()==1){
		$('#dtStart').datetimepicker({format: 'yyyy-mm-dd',language:  'zh-CN',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,startView: 2,minView: 2,forceParse: 0,startDate: getToDay()});
		$('#dtEnd').datetimepicker({format: 'yyyy-mm-dd',language:  'zh-CN',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,startView: 2,minView: 2,forceParse: 0,startDate: getToDay()});
		$('#dtStart1').datetimepicker({format: 'yyyy-mm-dd',language:  'zh-CN',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,startView: 2,minView: 2,forceParse: 0,startDate: getToDay()});
		$('#dtEnd1').datetimepicker({format: 'yyyy-mm-dd',language:  'zh-CN',weekStart: 1,todayBtn:  1,autoclose: 1,todayHighlight: 1,startView: 2,minView: 2,forceParse: 0,startDate: getToDay()});
		Uinfo();
	}
	/**
	 * 绑定用户中心公用TAB切换事件
	 * @returns
	 */
	$('#myTab a').click(function (e) { 
	  e.preventDefault();//阻止a链接的跳转行为 
	  $(this).tab('show');//显示当前选中的链接及关联的content 
	}) 
	/**
	 * 绑定用户中心历史对账事件
	 * @returns
	 */
	$("#AccountStatement").click(function() {
		 if( !($('#dtStart1').val().length==0) && !($('#dtEnd1').val().length==0) && dataRTtimeF1($('#dtStart1').val(),$('#dtEnd1').val())){
			 $.ajax({
				type: "POST",
				url: "/AccountStatement.php",
				dataType: "json",
				data: {"dtStart":$('#dtStart1').val(),"dtEnd":$('#dtEnd1').val()},
				success:AccountStatement,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
					console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
					console.log("textStatus:"+textStatus); // paser error;
				}
			});
		}else{
			alert("请选择要查询的时间段,开始时间要小于结束时间!");
		}
	});
	/**
	 * 绑定用户中心历史交易事件
	 * @returns
	 */
	$("#Historicalturnover").click(function() {
		if( !($('#dtStart').val().length==0) && !($('#dtEnd').val().length==0) && dataRTtimeF1($('#dtStart').val(),$('#dtEnd').val())){
			 $.ajax({
				type: "POST",
				url: "/Historicalturnover.php",
				dataType: "json",
				data: {"dtStart":$('#dtStart').val(),"dtEnd":$('#dtEnd').val()},
				success:Historicalturnover,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
					console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
					console.log("textStatus:"+textStatus); // paser error;
				}
			});
		}else{
			alert("请选择要查询的时间段,开始时间要小于结束时间!");
		}
	});
	/**
	 * 用户中心我的比赛查询按钮事件绑定
	 * @returns
	 */ 
	$("#p02_smt").click(function() {
		if($("#p02_q").val()=="" || $("#p02_q").val()=="请输入比赛名称"){
			alert("请输入比赛名称!");
			$("#p02_q").val("请输入比赛名称");
			$("#p02_q").css("border","1px dashed red");
		}else{
			$.ajax({
				type: "POST",
				url: "/BS.php",
				dataType: "json",
				data: {"p01_sel":$("#p01_sel").val(),"p02_q":$("#p02_q").val()},
				success:p02_smt,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
					console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
					console.log("textStatus:"+textStatus); // paser error;
				}
			});
		}
	});
	/**
	 * 用户中心我的比赛比赛状态改变事件绑定
	 * @returns
	 */
	$("#p01_sel").change(function(){
		$.ajax({
				type: "POST",
				url: "/BS.php",
				dataType: "json",
				data: {"p01_sel":$("#p01_sel").val()},
				success:p02_smt,
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
					console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
					console.log("textStatus:"+textStatus); // paser error;
				}
			}); 
	});
	/**
	 * 用户中心买卖股票查询处理片断代码
	 * @returns
	 */ 
	 // 绑定搜索事件
	$('#p01_form_symbol').keyup(function() {
	  Search.doSearch($.trim($('#p01_form_symbol').val()));
	});
	// 绑定搜索输入框失去焦点的时候隐藏搜索框
	$('#p01_form_symbol').blur(function(){
		setTimeout(function(){
			$('#search-result1').hide();
		},500);
	});
	// 设置股票搜索方法组
	var Search = {
	goStockPage: function(stockid,stock_naem){
		$('#p01_form_symbol').val(stock_naem);
		$('#p01_form_symbol').attr('stock_id',stockid);
		$('#p01_form_symbol').css('color','black');
		$('#search-result1').hide();
		stockid = stockid.replace("a-","");
		//stockid = s.replace("b-","");
		//stockid = s.replace("z-","");
		GPinfo(stockid,GPBusiness);
		if(stockid!=""){TransactionNotes();}
	},
	bindClick: function(){
		$('#search-result1 ul li[type="stock"]').on('click', function(){
			Search.goStockPage($(this).attr('stockid'),$(this).text());
		});
	},
	doSearch: function(value){
		if(!value) return false;
		this.searchStock(value,8);
	
		$('#search-result1').show().mouseleave(function(){
			$('#search-result1').hide();
		});
	
		this.bindClick();
	},
	getStockNumbercode: function(stockid){
		var reg = /(\d+)/i;
		reg.exec(stockid);
		return RegExp.$1;
	},
	searchStock: function(keyword, max){
		var force = 1;
	
		if(keyword.length <= 0){
			return;
		}
	
		if(!max){
			max = 5;
		}
	
		var html = "";
		var cnt = 0;
		if(isNumber(keyword)){
			for(var i in StockContainer){
				if(cnt >= max){
					break;
				}
					// 过滤指数和B股
					var is = i.split('-');
				var stockId = i;
				var stockName = StockContainer[i][0];
				if(stockId.indexOf(keyword) != -1 && is[0][2] != 'z' && is[0][2] != 'b'){
					html += "<li stockid=\""+stockId+"\" type=\"stock\">" + this.getStockNumbercode(stockId) + " " + stockName+ "</li>";
					cnt ++;
				}
			}
		}else if(isStockShortName(keyword)){
			for(var i in StockContainer){
				if(cnt >= max){
					break;
				}
				// 过滤指数和B股
				var is = i.split('-');
				var stockId = i;
	
				var stockName = StockContainer[i][0];
				var stockAcronym = StockContainer[i][1];
				if(stockAcronym.indexOf(keyword.toUpperCase()) != -1 && is[0][2] != 'z' && is[0][2] != 'b'){
					html += "<li stockid=\""+stockId+"\" type=\"stock\">" + this.getStockNumbercode(stockId) + " " + stockName+ "</li>";
					cnt ++;
				}
			}
		}else{
			for(var i in StockContainer){
				if(cnt >= max){
					break;
				}
				// 过滤指数和B股
				var is = i.split('-');
				var stockId = i;
				var stockName = StockContainer[i][0];
				if(stockName.toUpperCase().indexOf(keyword.toUpperCase()) != -1 && is[0][2] != 'z' && is[0][2] != 'b'){
					html += "<li stockid=\""+stockId+"\" type=\"stock\">" + this.getStockNumbercode(stockId) + " " + stockName+ "</li>";
					cnt ++;
				}
			}
		}
	
		if(html == ''){
			if(force == 1){
				$('.p01_form_tip').html("没有相关结果!"); 
			}
		}else{
				$('.p01_form_tip').html("");
			}
		
		$('#search-result1 ul').html(html);
	}
	}
	// 绑定搜索事件
	if(parseInt($('#p01_form_symbol').attr('data-operate')) == 2){
		$(document).on('change', '#p01_form_symbol', function () {
			var stockid = $.trim($('#p01_form_symbol').val())
			$('#p01_form_symbol').attr('stock_id',stockid);
			$('#p01_form_symbol').css('color','black');
			$('#p01_form_maxbuy').val($(this).children('option:selected').attr('data-amount'));
			GPinfo(stockid,GPBusiness);
			TransactionNotes();
		});
	}
	/**
	 * 绑定用户中心买卖提示事件
	 * @returns
	 */
	$('#tishi').popover('show');
	$('#tishi').popover('toggle');
	/**
	 * 绑定用户中心买卖股票买卖价格调整事件片断
	 * @returns
	 */
	$("#plus_price").click(function(){
		if($('#p01_form_buyprice').val() == ""){
			$('.p01_form_tip').html("您还没有选择股票!");
		}else{
			var num = (parseFloat($('#p01_form_buyprice').val())+0.01).toFixed(2);
			$('#p01_form_buyprice').val(num);
			TransactionNotes();
		}
	});
	$("#jian_price").click(function(){
		if($('#p01_form_buyprice').val() == ""){
			$('.p01_form_tip').html("您还没有选择股票!");
		}else{
			if($('#p01_form_buyprice').val()>0.01){
				var num = (parseFloat($('#p01_form_buyprice').val())-0.01).toFixed(2);
				$('#p01_form_buyprice').val(num);
				TransactionNotes();
			}
		}
	});
	/**
	 * 绑定用户中心买卖股票form变化事件
	 * @returns
	 */ 
	$(document).on('change', '#p01_form_buyHoldday,#p01_form_buyStopprice,#p01_form_buyGoalprice,#p01_form_buyprice,#p01_form_count,#p01_form_money', function () {TransactionNotes();})
	 /**
	 * 用户中心买卖股票数量单选点击处理方法
	 * @returns
	 */ 
	$(".p01_form_radios label").each(function () { 
	 	$(this).children('input').change(function(){
			switch(parseInt($(this).val())){
				case 1: 
					$("#p01_form_count").val(parseInt($("#p01_form_maxbuy").val()/100)*100);
					TransactionNotes();
					break;
				case 2:
					$("#p01_form_count").val(parseInt($("#p01_form_maxbuy").val()/2/100)*100);
					TransactionNotes();
					break;
				case 3:
					$("#p01_form_count").val(parseInt($("#p01_form_maxbuy").val()/3/100)*100);
					TransactionNotes();
					break;
				case 4:
					$("#p01_form_count").val(parseInt($("#p01_form_maxbuy").val()/4/100)*100);
					TransactionNotes();
					break;
				case 5:
					$("#p01_form_count").val(parseInt($("#p01_form_maxbuy").val()/5/100)*100);
					TransactionNotes();
					break;
			}
		}); 
	 });
	 /**
	 * 用户中心买卖股票订单处理方法
	 * @returns
	 */
	$("#orderActonBtn").click(function(){
		//构造参数
		var Param;
		Param += "&GPname="+$('#p01_form_cname').val();
		Param += "&GPid="+$('#p01_form_symbol').attr('stock_id').replace("a-","");
		Param += "&buyprice="+$('#p01_form_buyprice').val();
		Param += "&count="+$('#p01_form_count').val();
		Param += "&money="+$('#p01_form_money').val();
		if($('#p01_form_symbol').attr('data-operate') == 1){
			Param += "&operat=buy";
			Param += "&buyGoalprice="+$('#p01_form_buyGoalprice').val();
			Param += "&buyStopprice="+$('#p01_form_buyStopprice').val();
			Param += "&buyHoldday="+$('#p01_form_buyHoldday').val();
		}else{
			Param += "&operat=sell";
		}
		Param += "GPTransactionNotes="+$('#GPTransactionNotes').val();
		$.ajax({
				type: "POST",
				url: "/buy.php",
				dataType: "json",
				data: Param,
				success:function(data){
					if(!data.errNum){
						if($('#p01_form_symbol').attr('data-operate') == 1){
							var Mbody = "<p style=\"text-align:center;color:red; \">买入成功！</p>"
							MymodelHTML("操作提示",Mbody,false,false,"SM","/");
						}else{
							var Mbody = "<p style=\"text-align:center;color:red; \">卖出成功！</p>"
							MymodelHTML("操作提示",Mbody,false,false,"SM","/");
						}
					}else{
						alert(data.errMsg);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
					console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
					console.log("textStatus:"+textStatus); // paser error;
				}
		});
		
	});
});
 /**
 * 公用用户用用户中心我参与比赛查询构造方法
 * @returns
 */ 
function p02_smt(data){
	$("#itemlist").html("");
	if(!data.errNum){
		$.each(data.BSitem , function(i, item){
			var color;
			if(item[9]=="已结束"){color = "style=\"color: #999;\""};
			var temp =  "<div class=\"gam_item clearfix\"><h4><a class=\"btn_view fr\" target=\"_blank\" href=\""+item[1]+"\">查看</a>"+item[0]+"</h4><div class=\"clearfix gam_lc\"><div class=\"fl gamll_one clearfix\"><div class=\"data\"><ul><li class=\"data_one \">"+item[2]+"%</li><li class=\"data_two\">收益率</li></ul><ul><li class=\"data_one \">"+item[3]+"</li><li class=\"data_two\">排名</li></ul></div><div class=\"eval\"> <span class=\"c57\"></span> </div></div><div class=\"fr gamll_two\"><ul class=\"u_one\"><li><span>主办方</span>&nbsp;:&nbsp;<span>"+item[4]+"</span></li><li><span>投资品种</span>&nbsp;:&nbsp;<span>"+item[5]+"</span></li><li><span>报名时间</span>&nbsp;:&nbsp;<span>"+item[6]+"</span></li><li><span>比赛时间</span>&nbsp;:&nbsp;<span>"+item[7]+"</span></li></ul><ul><li><span>比赛范围</span>&nbsp;:&nbsp;<span>"+item[8]+"</span></li><li><span>比赛状态</span>&nbsp;:&nbsp;<span "+color+">"+item[9]+"</span></li><li><span>比赛人数</span>&nbsp;:&nbsp;<span>"+item[10]+"人</span></li></ul></div></div></div>";
			$("#itemlist").append(temp);	
		});
	}else{
		alert(data.errMsg);
		$("#itemlist").append("<div style=\"text-align:center;line-height:200px;\"><span><img src=\"http://www.sinaimg.cn/cj/jiaoyi/images/search_null.png\">抱歉，未找到相关结果。</span></div>");
	}
}
 /**
 * 公用用户用用户中心历史兑账单构造方法
 * @returns
 */ 
function AccountStatement(data){
	if(!data.errNum){
		$("#AccountStatementT tbody").html("<tr><th>成交时间</th><th>名称(代码)</th><th>类型</th><th>成交价格</th><th>成交数量</th><th>佣金</th><th>印花税</th><th>过户费</th><th>发生金额</th><th>可用资金</th></tr>");
		$.each(data.Historicalturnover , function(i, item){
			var trtemp =  "<tr><td>"+item[0]+"</td><td>"+item[1]+"</td><td>"+item[2]+"</td><td>"+item[3]+"</td><td>"+item[4]+"</td><td>"+item[5]+"</td><td>"+item[6]+"</td><td>"+item[7]+"</td><td>"+item[8]+"</td><td>"+item[9]+"</td></tr>";
			$("#AccountStatementT tbody").append(trtemp);	
		});
	}else{
		alert(data.errMsg);
		$("#AccountStatementT tbody").append("<tr><th>成交时间</th><th>名称(代码)</th><th>类型</th><th>成交价格</th><th>成交数量</th><th>佣金</th><th>印花税</th><th>过户费</th><th>发生金额</th><th>可用资金</th> </tr><tr><th>当前没有任何记录</th></tr>");
	}
}
 /**
 * 公用用户用用户中心历史交易记录构造方法
 * @returns
 */ 
function Historicalturnover(data){
	if(!data.errNum){
		$("#HistoricalturnoverT tbody").html("<tr><th>名称(代码)</th><th>买入/卖出</th><th>成交价格</th><th>成交数量</th><th>成交金额</th><th>成交时间</th></tr>");
		$.each(data.Historicalturnover , function(i, item){
			var trtemp =  "<tr><td>"+item[0]+"</td><td>"+item[1]+"</td><td>"+item[2]+"</td><td>"+item[3]+"</td><td>"+item[4]+"</td><td>"+item[5]+"</td></tr>";
			$("#HistoricalturnoverT tbody").append(trtemp);	
		});
	}else{
		alert(data.errMsg);
		$("#HistoricalturnoverT tbody").append("<tr><th>名称(代码)</th><th>买入/卖出</th><th>成交价格</th><th>成交数量</th><th>成交金额</th><th>成交时间</th></tr><tr><th>当前没有任何记录</th></tr>");
	}
}
 /**
 * 公用用户用用户中心图表及基本信息构造方法
 * @returns
 */ 
function Uinfo(){
	// 收益曲线
	var Uline = echarts.init(document.getElementById('Uline')); 
	// 盈利饼图
	var ylpic = echarts.init(document.getElementById('ylpic')); 
	// 亏损饼图
	var kspic = echarts.init(document.getElementById('kspic'));
	//设置饼状图样式
	var labelTop = {normal : {color: '#d8110b',label : {show : true,position : 'center',formatter : '{b}',textStyle: {baseline : 'bottom'}},labelLine : {show : false}}};
	var labelTop1= {normal : {color: '#009944',label : {show : true,position : 'center',formatter : '{b}',textStyle: {baseline : 'bottom'}},labelLine : {show : false}}};
	var labelFromatter = {normal : {label : {formatter : function (params){return 100 - params.value + '%'},textStyle: {baseline : 'top'}}},}
	var labelBottom = {normal : {color: '#e5e5e5', label : {show : true, position : 'center' },labelLine : {show : false}},emphasis: {color: 'rgba(0,0,0,0)'}};
	var date,myYields = [] ,shanghaiYields = [];
	//设置日期，当前日期的前七天
	var now = new Date();
	now.setDate(now.getDate() - 7);
	var dateArray = []; 
	var dateTemp; 
	var flag = 1; 
	for(i=0;i<7;i++){
		dateTemp = (now.getMonth()+1)+"-"+now.getDate();
    	dateArray.push(dateTemp);
    	now.setDate(now.getDate() + flag);
	}
	$.ajax({
			type: "POST",
			url: "/UINFO.php",
			dataType: "json",
			success: function(data) {
				//var data = JSON.parse(data);
				if(!data.errNum){
					var html = "<ul class=\"st_tit\"><li><span style=\"color:#865501\">排名</span>:<span class=\"fs16 icon_matchArrDown\">"+data.Uinfo.Ranking+"</span></li><li><span style=\"color:#865501\">收益</span>:<span class=\"fs16 cred\">"+data.Uinfo.Total_yield+"%</span></li></ul><ul class=\"stit_detail clearfix\"><li><label>资产:</label><span class=\"c57\">"+data.Uinfo.Account_assets+"</span></li><li> <label>当日收益:</label><span class=\"c5\">"+data.Uinfo.DYields+"%</span></li><li><label>可用资金:</label><span class=\"c57\">"+data.Uinfo.Available_funds+"元</span></li><li><label>当日盈亏:</label><span class=\"c57 \">"+data.Uinfo.DBreakeven+"</span></li><li><label>起始日期:</label><span class=\"c57\">"+data.Uinfo.StartDate+"</span></li><li><label>单位:</label><span class=\"c57\">"+data.Uinfo.Currency_Unit+"</span></li></ul>";
					$("#personFoundShow01").html(html);
					optionsyline = {tooltip: {trigger: "axis"},legend: {x: 'center',y: 'bottom',data: ["同期上证", "我的收益"]},calculable : true,xAxis: [{type: "category",name: "x",splitLine: {show: false},boundaryGap : false,data: dateArray}],yAxis: [{type: "value",axisLabel : {formatter: '{value}%'}}],calculable: true,series: [{name: "我的收益",type: "line",data: data.Yields.myYields },{name: "同期上证",type: "line",data: data.Yields.shanghaiYields }]};
					optionylpic = {series : [{type : 'pie',radius : [20, 40],x: '0%',itemStyle : labelFromatter,data : [{name:'invisible', value:(100-data.Deal.profit), itemStyle : labelBottom},{name:'盈利交易', value:data.Deal.profit,itemStyle : labelTop}]}]};
					optionkspic = {series : [{type : 'pie',radius : [20, 40],x: '0%',itemStyle : labelFromatter,data : [{name:'invisible', value:(100-data.Deal.Loss), itemStyle : labelBottom},{name:'亏损交易', value:data.Deal.Loss,itemStyle : labelTop1}]}]};
					// 为echarts对象加载数据 
					Uline.setOption(optionsyline); 
					ylpic.setOption(optionylpic); 
					kspic.setOption(optionkspic);
					$("#ylpic1").html("<span class=\"cd8\">"+data.Deal.profit+"%</span><p><span type=\"profit\">"+data.Deal.sucess+"</span><span>笔盈利交易</span></p>");
					$("#kspic1").html("<span class=\"cd8\">"+data.Deal.Loss+"%</span><p><span type=\"profit\">"+data.Deal.fail+"</span><span>笔亏损交易</span></p>");
				}else{
					var html = "<ul class=\"st_tit\"><li><span style=\"color:#865501\">排名</span>:<span class=\"fs16 icon_matchArrDown\">--</span></li><li><span style=\"color:#865501\">收益</span>:<span class=\"fs16 cred\">--</span></li></ul><ul class=\"stit_detail clearfix\"><li><label>资产:</label><span class=\"c57\">--</span></li><li> <label>当日收益:</label><span class=\"c5\">--</span></li><li><label>可用资金:</label><span class=\"c57\">--元</span></li><li><label>当日盈亏:</label><span class=\"c57 \">--</span></li><li><label>起始日期:</label><span class=\"c57\">--</span></li><li><label>单位:</label><span class=\"c57\">--</span></li></ul>";
					$("#personFoundShow01").html(html);
					$("#Uline").html("当前没有任何数据");
					$("#Uline").css({"line-height":"200px","text-align":"center"});
					
				}
			},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			
			console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
			console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
			console.log("textStatus:"+textStatus); // paser error;
		}
	});
}


 /**
 * 公用指数方法
 * @returns
 */  
function GPtarget(){
	//移出公用指数信息
	if ( $(".sindex_time").length > 0 ) { 
		$(".sindex_time").remove();
		$(".sindex_status").remove();
		$(".sindex_stock").remove();
	}
	GPinfo("s_sz399006",GPtop);
}
 /**
 * 公用股票信息请求方法
 * GPID 股票代码
 * GPFunction  返回data处理方法
 * @returns
 */
function GPinfo(GPID,GPFunction){
	$.ajax({
		type: "GET",
		url: "/GPinfo.php",
		dataType: "html",
		data: {"stockid":GPID},
		success: GPFunction,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
			console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
			console.log("textStatus:"+textStatus); // paser error;
		},
		complete: function(x) {
			//alert(x.responseText);
		}
	});
}
 /**
 * 买卖选股股票数据构造
 * @returns
 */
function GPcommon(data) {

}
 /**
 * 买卖选股股票数据构造
 * 公用股票信息请求方法返回数数据 data
 * @returns
 */
function GPBusiness(data) {
	var data = JSON.parse(data);
	if(!data.errNum){
		if(!data.retData.stockinfo.OpenningPrice == 0){
			$("#p01_form_cname").val(data.retData.stockinfo.name);
			$("#p01_form_cprice").val(data.retData.stockinfo.currentPrice);
			$("#p01_form_buyprice").val(data.retData.stockinfo.currentPrice);
			
			//购买初始划用
			if($("#p01_form_symbol").attr("data-operate") == 1){
				//设置可卖股票数量
				var cont = $("#p01_form_Availablefunds").val()/data.retData.stockinfo.currentPrice;
				$("#p01_form_maxbuy").val(parseInt(cont/100)*100);
				$("#p01_form_count").val(parseInt(cont/100)*100);
				//设置股票买入金额
				$("#p01_form_money").val((parseInt(cont/100)*100*data.retData.stockinfo.currentPrice).toFixed(2));
				//设置股票买入目标价金额
				$("#p01_form_buyGoalprice").val((data.retData.stockinfo.currentPrice+2).toFixed(2));
				//设置股票买入止损价金额
				$("#p01_form_buyStopprice").val((data.retData.stockinfo.currentPrice+1).toFixed(2));
				//设置股票买入持有天数
				$("#p01_form_buyHoldday").val(2);
			}else{
				//设置可卖股票数量
				$("#p01_form_count").val($("#p01_form_maxbuy").val());
			}
			//设置股票数量单选择可用
			$(".p01_form_radios label").each(function () {$(this).children("input").removeAttr("disabled");})
			$(".p01_form_radios label:first").children("input").attr("checked",'checked');
			$('#buy tbody').html("");
			$('#sell tbody').html("");
			$('.stockpad01_cr').html("");
			var stockpad01_crhtml,buyhtml,sellhtml;
			buyhtml = "<tr><td>买①(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.buyOnePrice+"</td><td>"+data.retData.stockinfo.buyOne+"</td></tr><tr><td>买②(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.buyTwoPrice+"</td><td>"+data.retData.stockinfo.buyTwo+"</td></tr><tr><td>买③(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.buyThreePrice+"</td><td>"+data.retData.stockinfo.buyThree+"</td></tr><tr><td>买④(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.buyFourPrice+"</td><td>"+data.retData.stockinfo.buyFour+"</td></tr><tr><td>买⑤(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.buyFivePrice+"</td><td>"+data.retData.stockinfo.buyFive+"</td></tr>";
			sellhtml = "<tr><td>卖⑤(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.sellFivePrice+"</td><td>"+data.retData.stockinfo.sellFive+"</td></tr><tr><td>卖④(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.sellFourPrice+"</td><td>"+data.retData.stockinfo.sellFour+"</td></tr><tr><td>卖③(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.sellThreePrice+"</td><td>"+data.retData.stockinfo.sellThree+"</td></tr><tr><td>卖②(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.sellTwoPrice+"</td><td>"+data.retData.stockinfo.sellTwo+"</td></tr><tr><td>卖①(元/股)</td><td class=\"cidown\">"+data.retData.stockinfo.sellOnePrice+"</td><td>"+data.retData.stockinfo.sellOne+"</td></tr>";
			if(data.retData.stockinfo.currentPrice < data.retData.stockinfo.OpenningPrice){
				stockpad01_crhtml = "<p><cite>现&emsp;价：</cite><span class=\"cidown\">"+data.retData.stockinfo.currentPrice+"</span></p><p><cite>今&emsp;开：</cite>";
			}else{
				stockpad01_crhtml = "<p><cite>现&emsp;价：</cite><span class=\"ciup\">"+data.retData.stockinfo.currentPrice+"</span></p><p><cite>今&emsp;开：</cite>";
			}
			if(data.retData.stockinfo.OpenningPrice < data.retData.stockinfo.closingPrice){
				stockpad01_crhtml += "<span class=\"cidown\">"+data.retData.stockinfo.OpenningPrice+"</span></p><p><cite>昨&emsp;收：</cite><span>"+data.retData.stockinfo.closingPrice+"</span></p><p><cite>最&emsp;高：</cite>";
			}else{
				stockpad01_crhtml += "<span class=\"ciup\">"+data.retData.stockinfo.OpenningPrice+"</span></p><p><cite>昨&emsp;收：</cite><span>"+data.retData.stockinfo.closingPrice+"</span></p><p><cite>最&emsp;高：</cite>";
			}
			if(data.retData.stockinfo.hPrice < data.retData.stockinfo.closingPrice){
				stockpad01_crhtml += "<span class=\"cidown\">"+data.retData.stockinfo.hPrice+"</span></p>";
			}else{
				stockpad01_crhtml += "<span class=\"ciup\">"+data.retData.stockinfo.hPrice+"</span></p>";
			}
			if(data.retData.stockinfo.lPrice < data.retData.stockinfo.closingPrice){
				stockpad01_crhtml += "<p><cite>最&emsp;低：</cite><span class=\"cidown\">"+data.retData.stockinfo.lPrice+"</span></p>";
			}else{
				stockpad01_crhtml += "<p><cite>最&emsp;低：</cite><span class=\"ciup\">"+data.retData.stockinfo.lPrice+"</span></p>";
			}
			var c=data.retData.stockinfo.turnover/10000000;
			stockpad01_crhtml += "<p><cite>买一报价：</cite><span>"+data.retData.stockinfo.hPrice+"</span></p><p><cite>卖一报价：</cite><span>"+data.retData.stockinfo.hPrice+"</span></p><p><cite>成交额：</cite><span>"+c.toFixed(2)+"亿元</span></p><p><cite>成交量：</cite><span>"+data.retData.stockinfo.totalNumber+"</span></p>";
			GPinfo("s_"+data.retData.stockinfo.code,GPzhishu);
			$('#buy tbody').html(buyhtml);
			$('#sell tbody').html(sellhtml);
			$('.stockpad01_cr').html(stockpad01_crhtml);
			TransactionNotes();
		}else{
			$('.p01_form_tip').html("该股票已经停牌!");
		}
	}else{
		alert(data.errMsg);
	}

}
 /**
 * 买卖选股指数构造处理方法
 * 公用股票信息请求方法返回数数据 data
 * @returns
 */
function GPzhishu(data){
	var data = JSON.parse(data);
	$('.stockpad01_h').html("");
	var stockpad01_hhtml,css;
	var reg = /(\d+)/i;
	reg.exec(data.retData.stockinfo.code);
	if(parseInt(data.retData.stockinfo.OpenningPrice)>=100){css="style=\"background-position:65px;\""}else if(parseInt(data.retData.stockinfo.OpenningPrice)< 10){css="style=\"background-position:47px;\""}else{css=""}
	if(data.retData.stockinfo.currentPrice < 0){
		stockpad01_hhtml ="<div class=\"inzhishu fl\"><span class=\"stockpad01_h_cname\">"+data.retData.stockinfo.name+"</span><span class=\"stockpad01_h_symbol\">("+RegExp.$1+")</span></div><div class=\"fr stockpad01_h_riseRange cidown\"><span>"+data.retData.stockinfo.closingPrice+"</span><span>"+data.retData.stockinfo.currentPrice+"%</span></div><div class=\"fr stockpad01_h_cpriceWrap\"><span class=\"stockpad01_h_cprice cidown icon_matchArrDownR\" "+css+">"+data.retData.stockinfo.OpenningPrice.toFixed(2)+"</span></div>";
	}else{
		stockpad01_hhtml ="<div class=\"inzhishu fl\"><span class=\"stockpad01_h_cname\">"+data.retData.stockinfo.name+"</span><span class=\"stockpad01_h_symbol\">("+RegExp.$1+")</span></div><div class=\"fr stockpad01_h_riseRange ciup\"><span>+"+data.retData.stockinfo.closingPrice+"</span><span>+"+data.retData.stockinfo.currentPrice+"%</span></div><div class=\"fr stockpad01_h_cpriceWrap\"><span class=\"stockpad01_h_cprice ciup icon_matchArrUpR\" "+css+">"+data.retData.stockinfo.OpenningPrice.toFixed(2)+"</span></div>"
	}
	$('.stockpad01_h').html(stockpad01_hhtml);
	
	return 1;
}
 /**
 * 公用头部指数构造
 * 公用股票信息请求方法返回数数据 data
 * @returns
 */
function GPtop(data) {
			var data = JSON.parse(data);
			if(!data.errNum){
				var now = new Date();
				var nowMonth = doHandleMonth(now.getMonth()+1);
				var nowDate = doHandleMonth(now.getDate());
				var nowHours = doHandleMonth(now.getHours());       
				var nowMinutes = doHandleMonth(now.getMinutes());
				var date = nowMonth+"-"+nowDate+" "+nowHours+":"+nowMinutes;				
				var html1 ="<div class=\"sindex_time fr\"> : "+date+"</div><div class=\"sindex_status fr ";
				var html2="";
				if(compare_hms()){
					html2="sindex_status_on\">交易中";
				}else{
					html2="sindex_status_off\">关闭中";
				}
				var html3 = "</div><div class=\"sindex_stock clearsub\"> <span><a href=\"#\" target=\"_blank\">上证</a> ";
				var html4 = "";
				if(data.retData.market.shanghai.rate < 0){
					var turnover = data.retData.market.shanghai.turnover/10000; 
					html4 = "<a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.market.shanghai.curdot.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.market.shanghai.rate+"%</a> | <a href=\"#\" target=\"_blank\">"+turnover.toFixed(2)+"亿元</a></span> <span><a href=\"#\" target=\"_blank\">深成</a>"; 
				}else{
					var turnover = data.retData.market.shanghai.turnover/10000; 
					html4 = "<a href=\"#\" target=\"_blank\" class=\"ciup\">"+data.retData.market.shanghai.curdot.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"ciup\">+"+data.retData.market.shanghai.rate+"%</a> | <a href=\"#\" target=\"_blank\">"+turnover.toFixed(2)+"亿元</a></span> <span><a href=\"#\" target=\"_blank\">深成</a>";
				}
				var html5 = "";
				if(data.retData.market.shenzhen.rate < 0){
					var turnover = data.retData.market.shenzhen.turnover/10000; 
					html5 = "<a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.market.shenzhen.curdot.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.market.shenzhen.rate+"%</a> | <a href=\"#\" target=\"_blank\">"+turnover.toFixed(2)+"亿元</a></span> <span><a href=\"#\" target=\"_blank\">创业板</a> "; 
				}else{
					var turnover = data.retData.market.shenzhen.turnover/10000; 
					html5 = "<a href=\"#\" target=\"_blank\" class=\"ciup\">"+data.retData.market.shenzhen.curdot.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"ciup\">+"+data.retData.market.shenzhen.rate+"%</a> | <a href=\"#\" target=\"_blank\">"+turnover.toFixed(2)+"亿元</a></span>  <span><a href=\"#\" target=\"_blank\">创业板</a> ";
				}
				var html6 = "";
				if(data.retData.stockinfo.currentPrice < 0){
					var lPrice = data.retData.stockinfo.lPrice/10000; 
					html6 = "<a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.stockinfo.OpenningPrice.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"cidown\">"+data.retData.stockinfo.currentPrice+"%</a> | <a href=\"#\" target=\"_blank\">"+lPrice.toFixed(2)+"亿元</a></span></div></div>"; 
				}else{
					var lPrice = data.retData.stockinfo.lPrice/10000; 
					html6 = "<a href=\"#\" target=\"_blank\" class=\"ciup\">"+data.retData.stockinfo.OpenningPrice.toFixed(2)+"</a> | <a href=\"#\" target=\"_blank\" class=\"ciup\">+"+data.retData.stockinfo.currentPrice+"%</a> | <a href=\"#\" target=\"_blank\">"+lPrice.toFixed(2)+"亿元</a></span>  </div>";
				}
				var html = html1+html2+html3+html4+html5+html6;
				$(".zhishu").html(html);
			}else{
				alert(data.errMsg);
			}
}
 /**
 *  操作笔记内容片接
 * @returns
 */
function TransactionNotes(){
	//设置总金额
	$("#p01_form_money").val(($("#p01_form_count").val()*$("#p01_form_buyprice").val()).toFixed(2));
	if(parseInt($(".stockpad01_cr p:eq(2)").children("span").text())*1.1 < parseInt( $("#p01_form_buyprice").val()) || parseInt($(".stockpad01_cr p:eq(2)").children("span").text())*0.9 > parseInt( $("#p01_form_buyprice").val())){
		var Mbody = "<p style=\"text-align:center;color:red; \">买卖价不能大于涨停价或者低于跌停价</p>"
		MymodelHTML("操作提示",Mbody,false,false,"SM");
		return;
	}
	var html = "";
	html += "**炒股平台交易平台";
	html +=  " #"+$("#p01_form_symbol").attr("data-eventname")+"#";
	var sec_sflag = $("#p01_form_symbol").attr("data-operate");//买卖类型 buy OR sell
	//sec_sflag==2 sell卖；sec_sflag==1 buy买
	if(1==sec_sflag){  
		html+='买入';
		var A = parseInt($("#p01_form_Availablefunds").val());
		var B = parseInt($("#p01_form_buyprice").val()*$("#p01_form_count").val());
		var Mbody = "<p style=\"text-align:center;color:red; \">当前可用资金不足！<br />请调整购入价格或者数量!</p>"
		if( A < B){ MymodelHTML("操作提示",Mbody,false,false,"SM");return; }
	}else{
		html+='卖出';
	}
	html += $("#p01_form_symbol").val();
	html += " #"+$("#p01_form_symbol").attr('stock_id').replace("a-","")+"#";
	html += " 单价格为："+$("#p01_form_buyprice").val()+"元,";
	html += " 数量为："+$("#p01_form_count").val()+"股,";
	html += " 总价值："+$("#p01_form_money").val()+"元。";
	
	if(1==sec_sflag){
		if($("#p01_form_symbol").val()!=""){ 
			html +="目标价："+$("#p01_form_buyGoalprice").val()+"。"; 
		}
		if($("#p01_form_symbol").val()!=""){
			html +="止损价："+$("#p01_form_buyStopprice").val()+"。"; 
		}
		if($("#p01_form_symbol").val()!=""){
			html +="卖出日期："+$("#p01_form_buyHoldday").val()+"天之内。"; 
		} 
	}
	if(1==sec_sflag){  
		html +="投资理由：…………";
	}else{
		html +="卖出理由：…………";
	}
	
	$("#GPTransactionNotes").val(html); 
	
}

function follow(id,operate){
	var fid =  id;
	var url = window.location.href;
	if(operate == "add"){
		$.get("/follow.php",{"follow":operate,"fid":fid},function(data,status){
			alert("数据：" + data + "\n状态：" + status);
			if(!data.errNum){
				var Mbody = "<p style=\"text-align:center;color:red; \">已成功关注\""+data.name+"\"！</p>";
				MymodelHTML("操作提示",Mbody,false,false,"SM",url);
			}else{
				alert(data.errMsg);
			}
	},"json");
	}else if(operate == "del") {
		$.get("/follow.php",{"operate":operate,"fid":fid},function(data,status){
			alert("数据：" + data + "\n状态：" + status);
			if(!data.errNum){
				var Mbody = "<p style=\"text-align:center;color:red; \">已取消关注\""+data.name+"\"！</p>";
				MymodelHTML("操作提示",Mbody,false,false,"SM",url);
			}else{
				alert(data.errMsg);
			}
	},"json");
	}
}
document.writeln("<script src=\"\../style/js/jquery.validate.js\"></script>");
document.writeln("<script src=\"\../style/js/jquery.validate.message_cn.js\"></script>");
document.writeln("<script src=\"\../style/js/json2.js\"></script>");
document.writeln("<script src=\"\../style/js/common.js\"></script>");
document.writeln("<script src=\"\../style/js/ajaxall.js\"></script>");
