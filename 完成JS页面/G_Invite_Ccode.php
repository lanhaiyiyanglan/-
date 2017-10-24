<?php
if($_POST)
{
    $G_Invite_Ccode = $_POST['G_Invite_Ccode'];
    if($G_Invite_Ccode == '323232')
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}

 ?>