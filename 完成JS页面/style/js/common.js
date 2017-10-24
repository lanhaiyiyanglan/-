// JavaScript Document
/*
*方法用于构造模态窗口并且显示
*Mtitle：窗口的名称
*Mbody：窗口内显示内容HTML代码
*isMfooter：是否显示 关闭和保存按钮 布尔值
*isfade: 点击模态窗口以外的地方是否关闭模态窗口 布尔值
*Mwidth:  默认/小号/大号/数值：MD/SM/LG/699px  
*Lurl:关闭时跳转的链接
*/
function MymodelHTML(Mtitle,Mbody,isMfooter,isfade,Mwidth,Lurl){
	Lurl?Lurl:Lurl="";
	var ModelHTML = "";
	var DT = $(document).height();
	var HTML1 = "<div id=\"fade\" class=\"black_overlay\" style=\"height:"+DT+"px\" ></div><div id=\"SystemModal\" class=\"modal fade in\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" id=\"Mclose\" ><span>×</span></button><h4 class=\"modal-title\" id=\"gridModalLabel\">";
	var HTML2 = "</h4></div><div class=\"modal-body\">";
	var HTML3 = "</div><div class=\"modal-footer\"></div></div></div></div>";
	var HTML4 = "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"FMclose\" >关闭</button><button type=\"button\" class=\"btn btn-primary\" id=\"MSave\" >保存</button></div></div></div></div>";
	if(isMfooter){
		ModelHTML = HTML1+Mtitle+HTML2+Mbody+HTML4;
	}else{
		ModelHTML = HTML1+Mtitle+HTML2+Mbody+HTML3;
	}
	
	/*追加模态筐*/
	$("body").append(ModelHTML);
	/*给追加元素添加点击事件*/
	$("#Mclose").on('click', function() {
		CloseModel();
	});
	if(isMfooter){
		$("#FMclose").on('click', function() {
			CloseModel();
		});
	}
	if(isfade){
		$(document).on("click",function(e){
			var target  = $(e.target);
			if(target.closest("#fade").length == 0){
				CloseModel();
			}
		});
	}
	$("#SystemModal").css({"display":"block"});
	
	switch(Mwidth)
	{
	case "MD":
	  break;
	case "SM":
	  $(".modal-dialog").addClass("modal-sm");
	  break;
	case "LG":
	  $(".modal-dialog").addClass("modal-lg");
	  break;
	default:
	  $(".modal-dialog").css("width",Mwidth);
	}
	$(".modal-dialog").css({
          "margin":"0px",
          "top": function () {
			  var a = $(window).height()
			  var b = $(".modal-dialog").height();
			  var c = ((a-b)/2)+"px" ;
              return c;
          },
          "left": function () {
              return ($(window).width() - $(".modal-dialog").width()) / 2 + "px";
          }
      });
	setInterval(function (){
		$("#SystemModal").remove();
		$("#fade").remove();
		if(Lurl!=""){
			location.replace(Lurl);
		}
	}, 3000);
		
}
//关闭模态窗口
function CloseModel(){
	$("#SystemModal").remove();
	$("#fade").remove();
	if(Lurl!=""){
		location.replace(Lurl);
	}
} 

/*比较当前时间是否在比赛报名时间之内
*data:为两个日期连接字符串   格式2015-03-05-2015-06-07
*/
function dataRTtimeF(data){
	var strdate = data.substr(0, 10);
	var enddate = data.substr(11, 19);
	var bedate = getToDay();
	strdate = strdate.replace(/-/g,"/");
	enddate = enddate.replace(/-/g,"/");
	bedate = bedate.replace(/-/g,"/");
	if(Date.parse(bedate)>Date.parse(strdate) && Date.parse(bedate)<Date.parse(enddate)){
	    return true;
    }else{
	    return false;
	}
}

/*比较时间大小
*strdata:开始时间 格式：2015-05-05
*enddata:结束时间 格式：2015-05-05
*/
function dataRTtimeF1(strdate,enddate){
	strdate = strdate.replace(/-/g,"/");
	enddate = enddate.replace(/-/g,"/");
	if(Date.parse(strdate)<Date.parse(enddate)){
	    return true;
    }else{
	    return false;
	}
}
//获取当前时间
function getToDay(){
	 var now = new Date();
	 var nowYear = now.getFullYear();
	 var nowMonth = now.getMonth();
	 var nowDate = now.getDate();
	 newdate = new Date(nowYear,nowMonth,nowDate);
	 nowMonth = doHandleMonth(nowMonth + 1);
	 nowDate = doHandleMonth(nowDate);
	 return nowYear+"-"+nowMonth+"-"+nowDate;
}
       
//----修改日期格式填充零
function doHandleMonth(month){
	 if(month.toString().length == 1){
	  month = "0" + month;
	 }
	 return month;
}
//开盘时间判断
function compare_hms(){
	var a = new Date();
    var i= a.getHours()*60*60+ a.getMinutes()*60+ a.getSeconds();
	if((i>34200&& i<41400)||(i>48600&& i<55800)){return true;}else{return false;}
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function isStockShortName(str){
    if(str.length == 0){
        return false;
    }
    for(var i = 0; i < str.length; i ++){
        var tmpstr = str.substr(i, 1);
        var ord = tmpstr.charCodeAt(0);
        if(ord >= 97 && ord <= 122 || ord >= 65 && ord <= 90){
        }else{
            return false;
        }
    }
    return true;
}