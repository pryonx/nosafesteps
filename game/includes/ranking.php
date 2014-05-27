<?php
include_once "functions.php";

$arr =sql("select * from player ORDER BY deaths ASC");
$i=0;
echo "<div>"; //div taula
echo "<div style='color: white;font-family: Arial,Verdana,San;font-size: 55px;position: relative;margin-bottom: 5px;top: 20px;left:35%;'>Ranking</div>";
echo "<table style='border-collapse:collapse;left:36%;top:30px;position:relative;'>
        <th>ID</th>
        <th>Name</th>
        <th>Death</th>
        <th>Level Max</th>";
while($i<count($arr)){
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