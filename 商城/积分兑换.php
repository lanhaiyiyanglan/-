<?php
if($_POST)
{
    $total_count = $_POST['total_count'];
	$tea_name = $_POST['tea_name'];
	$tea_price = $_POST['tea_price'];
	$text_box1 = $_POST['text_box1'];
	$your_gong = $_POST['your_gong'];
    if($your_gong >=  $total_count)
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}
?>



