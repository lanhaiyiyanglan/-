 /**
 * 公用指数方法
 * @returns
 */  
function GPtarget(){
	//移出公用指数信息
	$("#stp_box1").remove();
	GPinfo("sz399006",GPimg);
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
function GPimg(data) {
			if(!data.errNum){
				var stp_box1="<div class=\"stp_box_left\" id=\"stp_box1\"><img src="+data.retData.klinegraph.minurl+"></div>";
			    $("#stp_box1").html(stp_box1);
				var stp_box2="<div class=\"stp_box_left\" id=\"stp_box2\"><img src="+data.retData.klinegraph.dayurl+"></div>";
			    $("#stp_box2").html(stp_box2);
				var stp_box3="<div class=\"stp_box_left\" id=\"stp_box3\"><img src="+data.retData.klinegraph.weekurl+"></div>";
			    $("#stp_box3").html(stp_box3);
				var stp_box4="<div class=\"stp_box_left\" id=\"stp_box4\"><img src="+data.retData.klinegraph.monthurl+"></div>";
			    $("#stp_box4").html(stp_box4);
			}else{
				alert(data.errMsg);
			}
}
GPtarget();