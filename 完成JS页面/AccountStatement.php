<?php
/*
*成交时间:2015-04-15 10:48:10
*证券名称(代码)：重庆燃气(sh600917)
*类型：买入
*成交价格：13.26
*成交数量：37600
*佣金：498.58
*印花税：0.00
*过户费:37.60
*发生金额:-499112.18
*可用资金:887.84               
*/
if($_POST){
	$dtStart =  $_POST["dtStart"];
	$dtEnd = $_POST["dtEnd"];
}
$item = array(array("2015-04-15 10:48:10","重庆燃气(sh600917)", "买入",13.26, 37600, 498.58, 0.00,37.60,-499112.18,887.84),array("2015-04-15 10:48:10","重庆燃气(sh600917)", "买入",13.26, 37600, 498.58, 0.00,37.60,-499112.18,887.84),array("2015-04-15 10:48:10","重庆燃气(sh600917)", "买入",13.26, 37600, 498.58, 0.00,37.60,-499112.18,887.84),array("2015-04-15 10:48:10","重庆燃气(sh600917)", "买入",13.26, 37600, 498.58, 0.00,37.60,-499112.18,887.84));
$jarr=array("errNum"=>0,"errMsg"=>"success","Historicalturnover"=>$item);
echo json_encode($jarr);

?>