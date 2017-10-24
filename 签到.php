<?php
if($_POST)
{
    $user_id = $_POST['user_id '];
	$flag = $_POST['flag'];
    if($flag=='true')
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}
?>
