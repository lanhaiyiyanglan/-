<?php
if($_POST)
{
    $essay_id = $_POST['essay_id'];
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
