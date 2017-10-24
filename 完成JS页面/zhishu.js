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
		url: "http://localhost/Gpinfo.php",
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