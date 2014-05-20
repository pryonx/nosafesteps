<?php
include_once functions.php;

//$namePlayer=$_POST['namePlayer'];
$namePlayer="asd";

$result=sql("select * from player where name = '".$namePlayer."'");

echo $result;
?>
