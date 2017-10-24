<?php
/*
*错误码:errNum
*错误信息:errMsg
*前七日收益率:Yields
*前七日我的收益率:myYields
*前七日上证的收益率:shanghaiYields
*用户账户信息:Uinfo
*排名:Ranking
*收益:Total_yield
*资产:Account_assets
*当日收益:DYields
*可用资金:Available_funds
*元当日盈亏:DBreakeven
*开户起始日期:StartDate
*货币单位:Currency_Unit
*/
$myYields = array(-2.81, 1.55,5.16, 4.33, 6.21, 5.38, 6.8);
$shanghaiYields = array(3.89,2.49,4.58,2.58,18,8.28,2.3);
$jarr=array("errNum"=>0,"errMsg"=>"success","Yields"=>array("myYields"=>$myYields,"shanghaiYields"=>$shanghaiYields),"Uinfo"=>array("Ranking"=>"46930","Total_yield"=>13.13,"Account_assets"=>586695.81,"DYields"=>3.72,"Available_funds"=>887.84,"DBreakeven"=>21056.00,"StartDate"=>"2015-04-15","Currency_Unit"=>"CNY"),"Deal"=>array("profit"=>80,"Loss"=>60));
echo json_encode($jarr);
?>