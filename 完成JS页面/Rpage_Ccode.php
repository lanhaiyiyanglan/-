<?php
if($_POST)
{
    $Rpage_Ccode = $_POST['Rpage_Ccode'];
    if($Rpage_Ccode == '323232')
    {
        echo 'true';
    }else{
        echo 'false';
    }
    exit();
}

 ?>