<?php
include_once "functions.php";

$arr =sql("select * from player ORDER BY deaths DESC");
$i=0;
echo "<div style='height:80%;position:absolute;margin:0px auto;'>"; //div taula
echo "<div style='color: white;font-family: Arial,Verdana,San;font-size: 22px;position: relative;margin-bottom: 5px;top: 5px;left:15%;'>Hall of Shame</div>";
echo "<table style='border-collapse:collapse;left:3%;top:3%;position:relative;'>";
echo "<th>"."ID"."</th>";
echo "<th>"."Name"."</th>";
echo "<th>"."Death"."</th>";
echo "<th>"."Level Max"."</th>";

while($i<count($arr)&&$i<10){
    echo "<tr>";
	echo "<td align='center'>".$arr[$i][0]."</td>";//casella id
	echo "<td align='center'>".$arr[$i][1]."</td>";//casella nom
    echo "<td align='center'>".$arr[$i][2]."</td>";//casella deaths
    echo "<td align='center'>".$arr[$i][3]."</td>";//casella levelmax
	$i++;
    echo "</tr>";	
}
echo "</table>";
echo "</div>";
?>