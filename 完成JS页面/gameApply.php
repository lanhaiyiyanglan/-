<?php
if($_POST)
{
    $G_id = $_POST['G_id'];
	$U_id = $_POST['U_id'];
	$G_money = $_POST['G_money'];
	$G_Rfees = $_POST['G_Rfees'];
	$G_type = $_POST['G_type'];
	$G_name = $_POST['G_name'];
	$G_tel = $_POST['G_tel'];
	$G_Email = $_POST['G_Email'];
	$G_page_Ccode = $_POST['Gpage_Ccode'];
	if($G_type == 1){
		$G_Invite_Ccode = $_POST['G_Invite_Ccode'];
		if($G_id == 1){
			$jarr=array(gameApply=>array('status'=>true));
			echo json_encode($jarr);
		}else{
			$jarr=array(gameApply=>array('status'=>false));
			echo json_encode($jarr);
		}
	}else{
		if( $G_id == 1){
			$jarr=array(gameApply=>array('status'=>true));
			echo json_encode($jarr);
		}else{
			$jarr=array(gameApply=>array('status'=>false));
			echo json_encode($jarr);
		}
	}
}

?>