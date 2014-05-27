<?php
function conexio()
{
    //estableix conexio a la BD seleccionada
   	$con= @mysql_connect("25.153.105.253","root2","ddjd12cr") or die ("No es pot conectar a la Base de Dades");
    
	mysql_select_db("nosafesteps",$con) or die (mysql_error());
}

function sql($query)
{
    //entrar una query en sql aquesta funció fa la comanda sql. En cas de ser una select ten retorna el resultat en una array de arrays
    conexio();
    $result=mysql_query($query); //print_r($result);
    if($result!=FALSE)
    {
    $i=0;
    while($ret = mysql_fetch_array($result))
    {    
        $return[$i]=$ret;
        $i++;
    }
    
    return $return;
    }
    else{return "";}
}


?>
