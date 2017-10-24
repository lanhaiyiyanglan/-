<?php
if($_POST)
{
    
	$Luser_name = $_POST['Luser_name'];
	if($Luser_name == '123456')
    {
       echo 'true';
    }else{
       echo 'false';
    }
    exit();
}

 ?>