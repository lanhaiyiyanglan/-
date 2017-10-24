<?php
if($_POST)
{
    $award_desc = $_POST['award_desc'];
	$category = $_POST['category'];
	$award_rank = $_POST['award_rank'];
	$award_name = $_POST['award_name'];
	$pic_file = $_POST['pic_file'];
	

	$jarr=array(G_Meed=>array('status'=>true));
	echo json_encode($jarr);

	//$jarr=array(gameApply=>array('status'=>false));
	//echo json_encode($jarr);

	
}

?>