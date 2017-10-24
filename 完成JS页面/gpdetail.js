 /**
 * 公用指数方法
 * @returns
 */  
function GPtarget(){
	//移出公用指数信息
	$(".stdetail_le dt").remove();
	$(".stdetail_le dd").remove();
	$("#stp_box1").remove();
	GPinfo("sz399006,s_sz399006",GPtop);
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
		dataType: "json",
		data: {"stockid":GPID},
		success: GPFunction,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
			console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
			console.log("textStatus:"+textStatus); // paser error;
			alert(errorThrown);
		},
		complete: function(x) {
			//alert(x.responseText);
		}
	});
}
 /**
 * 公用头部指数构造
 * 公用股票信息请求方法返回数数据 data
 * @returns
 */
function GPtop(data) {
	if(!data.errNum){
		if(data.retData.market.shenzhen.rate< 0){
		var html1 ="<dt><div class=\"le_dt\"><h4><a href=\"#\">"+data.retData.stockinfo.stockinfo0.name+"</a></h4><p>"+data.retData.stockinfo.stockinfo0.code+"</p></div><div class=\"ri_dt\"><h4>"+data.retData.stockinfo.stockinfo1.OpenningPrice.toFixed(2)+"<i class=\"xiadie\"></i></h4><p>"+data.retData.stockinfo.stockinfo1.closingPrice.toFixed(2)+"("+data.retData.stockinfo.stockinfo1.currentPrice+"%)</p></div></dt>";
		}else{
		var html1 ="<dt><div class=\"le_dt\"><h4><a href=\"#\">"+data.retData.stockinfo.stockinfo0.name+"</a></h4><p>"+data.retData.stockinfo.stockinfo0.code+"</p></div><div class=\"ri_dt\"><h4>"+data.retData.stockinfo.stockinfo1.OpenningPrice.toFixed(2)+"<i></i></h4><p>"+data.retData.stockinfo.stockinfo1.closingPrice.toFixed(2)+"("+data.retData.stockinfo.stockinfo1.currentPrice+"%)</p></div></dt>";
		}
		var html2 =" <dd><p>今开: "+data.retData.stockinfo.stockinfo0.OpenningPrice.toFixed(2)+"</p><p>昨收："+data.retData.stockinfo.stockinfo0.closingPrice.toFixed(2)+"</p></dd>";
		var html3 = "<dd><p>最高："+data.retData.stockinfo.stockinfo0.hPrice+"</p><p>最低："+data.retData.stockinfo.stockinfo0.lPrice+"</p></dd>";
		var turnover = data.retData.stockinfo.stockinfo0.turnover/100000000; 
		var totalNumber=data.retData.stockinfo.stockinfo0.totalNumber/100000000;
		var html4 = "<dd><p>成交量："+totalNumber.toFixed(2)+"亿手</p><p>成交额："+turnover.toFixed(2)+"亿元</p></dd>";
		var html5 =" <dd><span class=\"stockon\"><a href=\"#\">添加自选股</a></span><span><a href=\"#\">买入</a></span></dd>";
		var html = html1+html2+html3+html4+html5;
		
		$(".stdetail_le").html(html);
		
	}else{
		alert(data.errMsg);
	}
}
GPtarget();