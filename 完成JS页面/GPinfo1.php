<?php
header("charset=utf-8");
//header("Access-Control-Allow-Origin: *");
if($_POST)
{
	
    $stockid = $_POST['stockid'];
    $url = 'http://apistore.baidu.com/microservice/stock?stockid='.$stockid;
	/*$header = array(' apikey:b0489f508dff31af3c2bbf03022d2621'); 
	//初始化
	$ch = curl_init(); 
	// 添加apikey到header 
	curl_setopt( $ch, CURLOPT_HTTPHEADER , $header ); 
	// 执行HTTP请求 
	curl_setopt( $ch , CURLOPT_URL , $url); 
	//执行并获取HTML文档内容
	$res = curl_exec($ch); 
	//释放curl句柄
	curl_close($ch);*/
	$res = file_get_contents($url);
	echo $res;
	//echo json_decode($res);
}
?>