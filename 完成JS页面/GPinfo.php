<?php 
//error_reporting( E_ALL&~E_NOTICE );
header('charset=UTF-8');
header('Content-type:text/json');
/****************************************************
//文件用于请求一支或多支新浪股票行情
//URL:URL?stockid=一个或多个股票代码：sz000066
//请求方法：GET
//param: stockid

{
  errNum: 0,     //返回错误码
  errMsg: "成功", //返回错误信息
  retData: {
      stockinfo: {
      name: "科大讯飞", //股票名称       //指数名称
      OpenningPrice: 27.34, //今日开盘价 //当前点数
      closingPrice: 27.34,  //昨日收盘价 //当前价格
      currentPrice: 27.34,  //当前价格   //涨跌率
      hPrice: 27.34,        //今日最高价 //成交量（手）
      lPrice: 27.34,       //今日最低价  //成交额（万元）
      competitivePrice: 27.30, //买一报价
      auctionPrice: 27.34,   //卖一报价
      totalNumber: 47800,    //成交的股票数
      turnover: 1306852.00,  //成交额，以元为单位
      buyOne: 6100,      //买一 
      buyOnePrice: 27.30, //买一价格
      buyTwo: 7500,  //买二
      buyTwoPrice: 27.29, //买二价格
      buyThree: 2000,   //买三
      buyThreePrice: 27.27,  //买三价格
      buyFour: 100,    //买四
      buyFourPrice: 27.25, //买四价格
      buyFive: 5700,     //买五
      buyFivePrice: 27.22,  //买五价格
      sellOne: 10150,       //卖一
      sellOnePrice: 27.34,  //卖一价格
      sellTwo: 15200,      //卖二
      sellTwoPrice: 27.35,  //卖二价格
      sellThree: 5914,     //卖三
      sellThreePrice: 27.36, //卖三价格
      sellFour: 400,        //卖四
      sellFourPrice: 27.37,  //卖四价格
      sellFive: 3000,       //卖五
      sellFivePrice: 27.38,   //卖五价格
      date: "2014-09-22", //当前显示股票信息的日期
      time: "09:26:11",   //具体时间
	  code: "sz002230", //股票代码，SZ指在深圳交易的股票
   },
   market: {    //大盘指数
      shanghai: {
          name: "上证指数",
          curdot: 2323.554, // 当前价格
          curprice: -5.897,  //当前价格涨幅
          rate: -0.25,    // 涨幅率
          dealnumber: 11586,  //交易量，单位为手（一百股）
          turnover: 98322   //成交额，万元为单位
      },
     shenzhen: {
          name: "深证成指",
          curdot: 8036.871,
          curprice: -10.382,
          rate: -0.13,
          dealnumber: 1083562,
          turnover: 126854
      }
   },
   klinegraph: {  //K线图
       minurl: "http://image.sinajs.cn/newchart/min/n/sz002230.gif", //分时K线图
       dayurl: "http://image.sinajs.cn/newchart/daily/n/sz002230.gif", //日K线图
       weekurl: "http://image.sinajs.cn/newchart/weekly/n/sz002230.gif", //周K线图
       monthurl: "http://image.sinajs.cn/newchart/monthly/n/sz002230.gif" //月K线图
   }
  }
}
*/

if($_GET)
{
	//获取股票代码
	$stockid = $_GET['stockid'];
	//构建股票代码序列，默认有大盘上证和深证指数返回
	$stockidtemp = $stockid.",s_sh000001,s_sz399001";
	//构建请求链接
	$url = "http://hq.sinajs.cn/list=".$stockidtemp;
	//股票代码数组化
	$listid = explode(',',$stockidtemp);
	//获取股票代码支数
	$cidid = sizeof($listid);
	//获取链接文件内容并且赋值给变量
	$res = file_get_contents($url);
	//获取内容数组化
	$elements = explode(';',$res);
	//定义股票信息参数
	$stockinfoid = array("name","OpenningPrice","closingPrice","currentPrice","hPrice","lPrice","competitivePrice","auctionPrice","totalNumber","turnover","buyOne","buyOnePrice","buyTwo","buyTwoPrice","buyThree","buyThreePrice","buyFour","buyFourPrice","buyFive","buyFivePrice","sellOne","sellOnePrice","sellTwo","sellTwoPrice","sellThree","sellThreePrice","sellFour","sellFourPrice","sellFive","sellFivePrice","date","time","code");
	//定义指数信息参数
	$zhishuid = array("name","curdot","curprice","rate","dealnumber","turnover");
	//定义K线参数
	$klinegraphid = array("minurl","dayurl","weekurl","monthurl");
	//定义K线参数数量
	$kid = sizeof($klinegraphid);
	//定义K线类型
	$klinegraphid1 = array("min","daily","weekly","monthly");
	//定义股票信息信息参数
	$stockinfo = array();
	$shanghai = array();
	$shenzhen = array();
	$klinegraph = array();
	$errNum = 0;
	$errMsg = "success";
	try {
		for($i=0;$i<$cidid;$i++){
			if( ($cidid-1) == $i || ($cidid-2) == $i ){
				$dataid =  sizeof($zhishuid);
				if( $cidid-2 == $i ){
					$shanghaiTemp = explode(',',$elements[$i]);
					for($j=0;$j<$dataid;$j++){
						$temp = Ctemp($j,"s_sh000001",$shanghaiTemp[$j]);
						$shanghai[$zhishuid[$j]] = $temp;
					}
				}else{
					$shenzhenTemp = explode(',',$elements[$i]);
					for($j=0;$j<$dataid;$j++){
						$temp = Ctemp($j,"s_sz399001",$shenzhenTemp[$j]);
						$shenzhen[$zhishuid[$j]] = $temp;
					}
				}
			}else{
				$dataid =  sizeof($stockinfoid);
				$stockinfoTemp = explode(',',$elements[$i]);
				if(!strrpos($listid[$i],'_')){
					if( ($cidid-3) == 0){
						
						for($j = 0;$j<$dataid;$j++){
							$temp = Ctemp($j,$listid[$i],$stockinfoTemp[$j]);
							$stockinfo[$stockinfoid[$j]] = $temp;
						}
						for($j = 0;$j<$kid;$j++){
							$temp = ImgTemp($listid[$i],$klinegraphid1[$j]);
							$klinegraph[$klinegraphid[$j]] = $temp;
						}
					}else{
						$arraytmep = array();
						$arrayImgtmep = array();
						for($j=0;$j<$dataid;$j++){
							$temp = Ctemp($j,$listid[$i],$stockinfoTemp[$j]);
							$arraytmep[$stockinfoid[$j]] = $temp;
						}
						for($j=0;$j<$kid;$j++){
							$temp = ImgTemp($listid[$i],$klinegraphid1[$j]);
							$arrayImgtmep[$klinegraphid[$j]] = $temp;
						}
						$stockinfo["stockinfo".$i] = $arraytmep;
						$klinegraph["klinegraph".$i]  = $arrayImgtmep;
					}
				}else{
					if( ($cidid-3) == 0){
						for($j = 0;$j<$dataid;$j++){
							if($j<6 || $j==32){
								if($j==32){
									$temp = Ctemp($j,$listid[$i],"");
									$stockinfo[$stockinfoid[$j]] = $temp;
								}else{
									$temp = Ctemp($j,$listid[$i],$stockinfoTemp[$j]);
									$stockinfo[$stockinfoid[$j]] = $temp;
								}
							}else{
								$stockinfo[$stockinfoid[$j]] = 0;
							}
						}
						for($j = 0;$j<$kid;$j++){
							$temp = ImgTemp($listid[$i],$klinegraphid1[$j]);
							$klinegraph[$klinegraphid[$j]] = $temp;
						}
					}else{
						$arraytmep = array();
						$arrayImgtmep = array();
						for($j=0;$j<$dataid;$j++){
							if($j<6 || $j==32){
								if($j==32){
									$temp = Ctemp($j,$listid[$i],"");
									
									$arraytmep[$stockinfoid[$j]] = $temp;
								}else{
									$temp = Ctemp($j,$listid[$i],$stockinfoTemp[$j]);
									$arraytmep[$stockinfoid[$j]] = $temp;
								}
							}else{
								$arraytmep[$stockinfoid[$j]] = 0;
							}
						}
						for($j=0;$j<$kid;$j++){
							$temp = ImgTemp($listid[$i],$klinegraphid1[$j]);
							$arrayImgtmep[$klinegraphid[$j]] = $temp;
						}
						$stockinfo["stockinfo".$i] = $arraytmep;
						$klinegraph["klinegraph".$i]  = $arrayImgtmep;
					}
				}
			}
		
		}
	} catch (Exception $e) {   
		$errMsg = $e->getMessage(); 
		$errNum = 1;	
	} 
	$jarr=array("errNum"=>$errNum,"errMsg"=>$errMsg,"retData"=>array("stockinfo"=>$stockinfo,"market"=>array("shanghai"=>$shanghai,"shenzhen"=>$shenzhen),"klinegraph"=>$klinegraph));
	
	echo json_encode($jarr,JSON_FORCE_OBJECT);
}

/***********************************************
////function Ctemp($j,$id,$str):用于处理股票中文名称及转码和股票代码;
////param:$j,$id,$str 分别为 取值ID，股票代码，股票中文名称字符串
////return:股票中文名称或者股票代码
***********************************************/
function Ctemp($j,$id,$str){
	$temp = "";
	if($j == 0){
		$temp = str_replace("var hq_str_".$id."=\"","",$str);
		$temp = mb_convert_encoding(trim($temp), "UTF-8", "GBK");
	}else if($j == 32 ){
		$temp = $id;
		$temp = mb_convert_encoding(trim($temp), "UTF-8", "GBK");
	}else{
		$temp = str_replace("\"","",$str);
		$temp = mb_convert_encoding(trim($temp), "UTF-8", "GBK");
		if( 0 < $j && $j< 30 ){ $temp = (double)$temp; }
	}
	
		
	
	return $temp;
}
/***********************************************
////function ImgTemp($id,$str1):用于处理股票分，日，周，月股票图表图片;
////param:$id,$str 分别为 股票代码，股票图表类型
////return:股票图表图片链接
***********************************************/
function ImgTemp($id,$str1){
	return "http://image.sinajs.cn/newchart/".$str1."/n/".$id.".gif";
}
?>