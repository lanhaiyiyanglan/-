<?php
if($_POST)
{
    $Ruser_name = $_POST['Ruser_name'];
	$Ruser_pwd = $_POST['Ruser_pwd'];
	$Rpage_Ccode = $_POST['Rpage_Ccode'];
	$Ruser_pact = $_POST['Ruser_pact'];
	$user_location = $_POST['user_location'];
    $jarr=array(userinfo=>array('name'=>$Ruser_name,'pwd'=>$Ruser_pwd,'location'=>$user_location));
	echo json_encode($jarr);
}

?>