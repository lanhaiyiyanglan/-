<?php
if($_POST)
{
    $questions_ms = $_POST['questions_ms'];
	$qes_type = $_POST['qes_type'];
	$upfile = $_POST['upfile'];
	$neirong = $_POST['neirong'];
    $jarr=array(userinfo=>array('questions_ms'=>$questions_ms,'qes_type'=>$qes_type,'upfile'=>$upfile,'neirong'=>$neirong));
    echo json_encode($jarr);
}

?>