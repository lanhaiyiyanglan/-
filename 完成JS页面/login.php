<?php
if($_POST)
{
    $Luser_name = $_POST['Luser_name'];
	$Luser_pwd = $_POST['Luser_pwd'];
	$user_location = $_POST['user_location'];
	$user_rememberme = $_POST['user_rememberme'];
	$user_autologin = $_POST['user_autologin'];
    $jarr=array(userinfo=>array('name'=>$Luser_name,'pwd'=>$Luser_pwd,'location'=>$user_location,'rememberme'=>$user_rememberme,'autologin'=>$user_autologin));
    echo json_encode($jarr);
}

?>