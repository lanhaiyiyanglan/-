<?php
if($_GET){
	$operate = $_GET['operate'];
	$fid = $_GET['fid'];
	if($operate=="add"){
		$jarr=array("errNum"=>0,"errMsg"=>"success","name"=>"虎山行");
		echo json_encode($jarr);
	}else if($operate=="del"){
		$jarr=array("errNum"=>0,"errMsg"=>"success","name"=>"虎山行1");
		echo json_encode($jarr);
	}
}
?>