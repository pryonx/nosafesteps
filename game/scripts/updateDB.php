<?php
include_once "functions.php";

$query=$_GET['query'];
$arrquery=explode(",",$query);
$name=$arrquery[0];
$level=$arrquery[1];
$deaths=$arrquery[2];
/*
$name="sapato";
$level="2";
$deaths="6";
*/

$ret=sql("select * from  player  where name='".$name."'");
if($ret==""){
    sql("INSERT INTO player (`id`, `name`, `deaths`, `maxlvl`) VALUES ('','".$name."','".$deaths."','".level."')");
    echo "ok";
}else{
    echo "fail";
}
?>