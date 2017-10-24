<?php 
$header = array('apikey:b0489f508dff31af3c2bbf03022d2621'); 
$url = 'http://apis.baidu.com/apistore/stockservice/stock?stockid=sz002230'; 
$ch = curl_init(); 
// 添加apikey到header 
curl_setopt( $ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt( $ch, CURLOPT_HTTPHEADER , $header ); 
// 执行HTTP请求 
curl_setopt( $ch , CURLOPT_URL , $url); 
$res = curl_exec($ch); 
curl_close ($ch);
$data = json_decode($res);
echo $data;
?>