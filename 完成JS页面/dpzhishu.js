 /**
 * 公用指数方法
 * @returns
 */  
function GPtarget(){
	//移出公用指数信息
	$(".dpzs-table tr").remove();
	GPinfo("s_sz399006,s_sz399005,s_sh000300",GPtop);
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
	//var data = JSON.parse(data);
	if(!data.errNum){
		var html1=" <tr><th width=\"60px\">交易所</th><th width=\"60px\">价格</th><th width=\"60px\">涨幅</th><th width=\"60px\">涨幅率</th><th width=\"80px\">成交额</th></tr>";
		 if(data.retData.market.shanghai.rate<0){
		  var turnover =data.retData.market.shanghai.turnover/10000; 
		  var html2 ="<tr><td>"+data.retData.market.shanghai.name+"</td><td>"+data.retData.market.shanghai.curdot.toFixed(2)+"</td><td>"+data.retData.market.shanghai.curprice.toFixed(2)+"</td><td class=\"lv\">"+data.retData.market.shanghai.rate+"%</td><td>"+turnover.toFixed(2)+"亿元</td></tr>";
		}else{
		  var turnover =data.retData.market.shanghai.turnover/10000; 
		  var html2 ="<tr><td>"+data.retData.market.shanghai.name+"</td><td>"+data.retData.market.shanghai.curdot.toFixed(2)+"</td><td>"+data.retData.market.shanghai.curprice.toFixed(2)+"</td><td class=\"zhang\">+"+data.retData.market.shanghai.rate+"%</td><td>"+turnover.toFixed(2)+"亿元</td></tr>";
		}
		if(data.retData.market.shenzhen.rate<0){
		 var turnover =data.retData.market.shenzhen.turnover/10000; 
		 var html3 ="<tr><td>"+data.retData.market.shenzhen.name+"</td><td>"+data.retData.market.shenzhen.curdot.toFixed(2)+"</td><td>"+data.retData.market.shenzhen.curprice.toFixed(2)+"</td><td class=\"lv\">"+data.retData.market.shenzhen.rate+"%</td><td>"+turnover.toFixed(2)+"亿元</td></tr>";
		}else{
		 var turnover =data.retData.market.shenzhen.turnover/10000; 
		 var html3 ="<tr><td>"+data.retData.market.shenzhen.name+"</td><td>"+data.retData.market.shenzhen.curdot.toFixed(2)+"</td><td>"+data.retData.market.shenzhen.curprice.toFixed(2)+"</td><td class=\"zhang\">+"+data.retData.market.shenzhen.rate+"%</td><td>"+turnover.toFixed(2)+"亿元</td></tr>";	
		}
		if(data.retData.stockinfo.stockinfo0.currentPrice < 0){
			var lPrice = data.retData.stockinfo.stockinfo0.lPrice/10000; 
		    var html4="<tr><td>"+data.retData.stockinfo.stockinfo0.name+"</td><td>"+data.retData.stockinfo.stockinfo0.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo0.closingPrice.toFixed(2)+"</td><td class=\"lv\">"+data.retData.stockinfo.stockinfo0.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}else{
			var lPrice = data.retData.stockinfo.stockinfo0.lPrice/10000; 
		    var html4="<tr><td>"+data.retData.stockinfo.stockinfo0.name+"</td><td>"+data.retData.stockinfo.stockinfo0.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo0.closingPrice.toFixed(2)+"</td><td class=\"zhang\">+"+data.retData.stockinfo.stockinfo0.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}
		if(data.retData.stockinfo.stockinfo1.currentPrice < 0){
			var lPrice = data.retData.stockinfo.stockinfo1.lPrice/10000; 
		    var html5="<tr><td>"+data.retData.stockinfo.stockinfo1.name+"</td><td>"+data.retData.stockinfo.stockinfo1.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo1.closingPrice.toFixed(2)+"</td><td class=\"lv\">"+data.retData.stockinfo.stockinfo1.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}else{
			var lPrice = data.retData.stockinfo.stockinfo1.lPrice/10000; 
		    var html5="<tr><td>"+data.retData.stockinfo.stockinfo1.name+"</td><td>"+data.retData.stockinfo.stockinfo1.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo1.closingPrice.toFixed(2)+"</td><td class=\"zhang\">+"+data.retData.stockinfo.stockinfo1.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}
		if(data.retData.stockinfo.stockinfo2.currentPrice < 0){
			var lPrice = data.retData.stockinfo.stockinfo2.lPrice/10000; 
		    var html6="<tr><td>"+data.retData.stockinfo.stockinfo2.name+"</td><td>"+data.retData.stockinfo.stockinfo2.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo2.closingPrice.toFixed(2)+"</td><td class=\"lv\">"+data.retData.stockinfo.stockinfo2.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}else{
			var lPrice = data.retData.stockinfo.stockinfo2.lPrice/10000; 
		    var html6="<tr><td>"+data.retData.stockinfo.stockinfo2.name+"</td><td>"+data.retData.stockinfo.stockinfo2.OpenningPrice+"</td><td>"+data.retData.stockinfo.stockinfo2.closingPrice.toFixed(2)+"</td><td class=\"zhang\">+"+data.retData.stockinfo.stockinfo2.currentPrice+"%</td><td>"+lPrice.toFixed(2)+"亿元</td></tr>";
		}
		var html = html1+html2+html3+html4+html5+html6;
		$(".dpzs-table").html(html);
	}else{
		alert(data.errMsg);
	}
}
GPtarget();