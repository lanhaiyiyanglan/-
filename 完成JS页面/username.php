<?php
if($_POST)
{
    $Ruser_name = $_POST['Ruser_name'];
   if($Ruser_name !== '89898989')
    {
       echo 'true';
    }else{
       echo 'false';
    }
}

 ?>