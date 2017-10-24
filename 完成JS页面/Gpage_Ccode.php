<?php
if($_POST)
{
    $Gpage_Ccode = $_POST['Gpage_Ccode'];
    if($Gpage_Ccode == '323232')
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}

 ?>