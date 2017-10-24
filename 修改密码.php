<?php
if($_POST)
{
    $pre_password = $_POST['pre_password'];
	$password = $_POST['password'];
    if($pre_password == 'aaaaaa')
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}

 ?> 